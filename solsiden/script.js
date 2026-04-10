/* ── Config ──────────────────────────────────────────── */
const OSLO_CENTER    = [59.913, 10.752];
const OSLO_BBOX      = '59.80,10.60,59.98,10.90'; // south,west,north,east
const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter'
];
const CACHE_KEY      = 'solsiden_pubs_v2';
const SEATING_KEY    = 'solsiden_seating_v1';
const HIDDEN_KEY     = 'solsiden_hidden_v1';
const SUN_HOURS      = { start: 5, end: 22 }; // hours to check

const VENUE_EMOJI = {
  pub:        '🍺',
  bar:        '🍸',
  restaurant: '🍽️',
  cafe:       '☕'
};

const OVERPASS_QUERY = `[out:json][timeout:30];
(
  node["amenity"="pub"](${OSLO_BBOX});
  node["amenity"="bar"](${OSLO_BBOX});
  node["amenity"="restaurant"](${OSLO_BBOX});
  node["amenity"="cafe"](${OSLO_BBOX});
  way["amenity"="pub"](${OSLO_BBOX});
  way["amenity"="bar"](${OSLO_BBOX});
  way["amenity"="restaurant"](${OSLO_BBOX});
  way["amenity"="cafe"](${OSLO_BBOX});
);
out center body;`;

/* ── State ───────────────────────────────────────────── */
let map;
let pubs          = [];
let seatingData   = {};
let hiddenVenues  = new Set();
let selectedPubId = null;
let sunCache      = new Map(); // key: `${pubId}_${date}` → sunHours[]

/* ── Bootstrap ───────────────────────────────────────── */
async function init() {
  initMap();
  [seatingData, hiddenVenues] = await Promise.all([loadSeatingData(), loadHiddenVenues()]);
  setDefaultDate();

  document.getElementById('date-picker').addEventListener('change', onDateChange);
  document.getElementById('export-btn').addEventListener('click', exportData);
  document.getElementById('export-hidden-btn').addEventListener('click', exportHidden);
  document.getElementById('import-file').addEventListener('change', importData);
  document.getElementById('retry-btn').addEventListener('click', () => {
    sessionStorage.removeItem(CACHE_KEY);
    hideError();
    fetchAndRender();
  });

  await fetchAndRender();
}

/* ── Map init ────────────────────────────────────────── */
function initMap() {
  map = L.map('map', { zoomControl: true }).setView(OSLO_CENTER, 14);

  L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }
  ).addTo(map);
}

/* ── Date helpers ────────────────────────────────────── */
function setDefaultDate() {
  const today = new Date();
  document.getElementById('date-picker').value = toDateString(today);
}

function toDateString(date) {
  return date.toISOString().slice(0, 10);
}

function getSelectedDate() {
  // Build date in local time to avoid UTC midnight offset issues
  const [y, m, d] = document.getElementById('date-picker').value.split('-').map(Number);
  return new Date(y, m - 1, d, 12, 0, 0); // noon local time as the reference day
}

/* ── Seating data persistence ────────────────────────── */
async function loadSeatingData() {
  // 1. Try localStorage first (user edits take priority)
  const stored = localStorage.getItem(SEATING_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch(e) { /* fall through */ }
  }
  // 2. Fall back to seating-data.json in the repo
  try {
    const res = await fetch('./seating-data.json');
    if (!res.ok) return {};
    const data = await res.json();
    return data.pubs || {};
  } catch(e) {
    return {};
  }
}

async function loadHiddenVenues() {
  const stored = localStorage.getItem(HIDDEN_KEY);
  if (stored) {
    try { return new Set(JSON.parse(stored)); } catch(e) { /* fall through */ }
  }
  try {
    const res = await fetch('./hidden-venues.json');
    if (!res.ok) return new Set();
    const data = await res.json();
    return new Set((data.hidden || []).map(String));
  } catch(e) {
    return new Set();
  }
}

function saveHiddenVenues() {
  localStorage.setItem(HIDDEN_KEY, JSON.stringify([...hiddenVenues]));
}

function saveSeatingData() {
  localStorage.setItem(SEATING_KEY, JSON.stringify(seatingData));
  sunCache.clear(); // invalidate sun cache when seating changes
}

/* ── Fetch pubs ──────────────────────────────────────── */
async function fetchAndRender() {
  showLoading(true);

  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      pubs = JSON.parse(cached);
    } else {
      const encodedQuery = '?data=' + encodeURIComponent(OVERPASS_QUERY);
      let res;
      for (const endpoint of OVERPASS_ENDPOINTS) {
        try {
          res = await fetch(endpoint + encodedQuery);
          if (res.ok) break;
        } catch(e) { /* try next */ }
      }
      if (!res || !res.ok) throw new Error('All Overpass endpoints failed');
      const json = await res.json();

      // Normalise nodes + ways (ways have a `center` property)
      pubs = json.elements
        .map(el => {
          if (el.type === 'node') return el;
          if (el.type === 'way' && el.center) {
            return { ...el, lat: el.center.lat, lon: el.center.lon };
          }
          return null;
        })
        .filter(el => el && el.lat != null && el.lon != null);

      sessionStorage.setItem(CACHE_KEY, JSON.stringify(pubs));
    }

    renderMarkers();
  } catch(e) {
    showError('Could not load pub data from Overpass API. Check your connection and try again.');
    console.error(e);
  } finally {
    showLoading(false);
  }
}

/* ── Markers ─────────────────────────────────────────── */
function venueEmoji(pub) {
  return VENUE_EMOJI[pub.tags?.amenity] || '🍺';
}

function renderMarkers() {
  const date = getSelectedDate();

  pubs.forEach(pub => {
    if (hiddenVenues.has(String(pub.id))) return;
    const seating   = seatingData[pub.id];
    const hasSunNow = seating?.direction != null ? pubHasSunNow(pub, seating.direction, date) : false;
    const marker    = makeMarker(pub, hasSunNow);
    pub._marker     = marker;
    marker.addTo(map).on('click', () => showPubDetails(pub));
  });
}

function makeMarker(pub, hasSun) {
  const isActive = pub.id === selectedPubId;
  const cls = ['marker', hasSun ? 'marker--sun' : '', isActive ? 'marker--active' : ''].filter(Boolean).join(' ');

  return L.marker([pub.lat, pub.lon], {
    icon: L.divIcon({
      className: '',
      html: `<div class="${cls}" title="${escHtml(pubName(pub))}">${venueEmoji(pub)}</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    }),
    zIndexOffset: isActive ? 1000 : 0
  });
}

function refreshMarkerIcon(pub) {
  if (!pub._marker) return;
  const date    = getSelectedDate();
  const seating = seatingData[pub.id];
  const hasSun  = seating?.direction != null ? pubHasSunNow(pub, seating.direction, date) : false;
  const isActive = pub.id === selectedPubId;
  const cls = ['marker', hasSun ? 'marker--sun' : '', isActive ? 'marker--active' : ''].filter(Boolean).join(' ');

  pub._marker.setIcon(L.divIcon({
    className: '',
    html: `<div class="${cls}" title="${escHtml(pubName(pub))}">${venueEmoji(pub)}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    zIndexOffset: isActive ? 1000 : 0
  }));
}

function hideVenue(pub) {
  hiddenVenues.add(String(pub.id));
  saveHiddenVenues();
  if (pub._marker) {
    map.removeLayer(pub._marker);
    pub._marker = null;
  }
  // Close sidebar
  selectedPubId = null;
  document.getElementById('pub-detail').classList.add('hidden');
  document.getElementById('sidebar-empty').classList.remove('hidden');
}

function openMarkerPopup(pub) {
  if (!pub._marker) return;
  const popup = L.popup({
    closeButton: false,
    className: 'hide-popup',
    offset: [0, -18],
    autoPan: false
  })
    .setLatLng([pub.lat, pub.lon])
    .setContent(`<div class="hide-popup__name">${escHtml(pubName(pub))}</div><button class="hide-popup__btn" data-id="${pub.id}">Hide</button>`)
    .openOn(map);

  pub._popup = popup;
}

// Delegated click handler for popup hide buttons
document.addEventListener('click', e => {
  const btn = e.target.closest('.hide-popup__btn');
  if (!btn) return;
  const pub = pubs.find(p => String(p.id) === btn.dataset.id);
  if (pub) hideVenue(pub);
  map.closePopup();
});

/* ── Sidebar ─────────────────────────────────────────── */
function showPubDetails(pub) {
  // Deselect previous
  if (selectedPubId != null) {
    const prev = pubs.find(p => p.id === selectedPubId);
    if (prev) refreshMarkerIcon(prev);
  }

  map.closePopup();
  selectedPubId = pub.id;
  refreshMarkerIcon(pub);
  openMarkerPopup(pub);

  const seating   = seatingData[pub.id];
  const direction = seating?.direction ?? null;
  const date      = getSelectedDate();

  // Sun panel content
  let sunContent;
  if (direction != null) {
    const sunHours = getSunHours(pub, direction, date);
    sunContent     = renderSunPanel(sunHours);
  } else {
    sunContent = `<p class="hint">Set the terrace direction below to see sun hours.</p>`;
  }

  const el = document.getElementById('pub-detail');
  el.innerHTML = `
    <div class="pub-detail__header">
      <div>
        <div class="pub-detail__name">${escHtml(pubName(pub))}</div>
        <div class="pub-detail__meta">
          <span class="pub-detail__type">${pub.tags?.amenity || 'pub'}</span>
          ${pubAddress(pub) ? `<span class="pub-detail__addr">📍 ${escHtml(pubAddress(pub))}</span>` : ''}
          ${pubHours(pub)   ? `<span class="pub-detail__hours">🕐 ${escHtml(pubHours(pub))}</span>`   : ''}
        </div>
      </div>
      <button class="btn btn--sm btn--danger" id="hide-venue-btn" title="Hide this venue from the map">Hide</button>
    </div>

    <div class="panel">
      <div class="panel__title">☀️ Sun on terrace</div>
      <div id="sun-content">${sunContent}</div>
    </div>

    <div class="panel">
      <div class="panel__title">Terrace faces</div>
      <div class="compass-row">
        <div class="compass" id="compass">
          <span class="compass__cardinal compass__cardinal--n">N</span>
          <span class="compass__cardinal compass__cardinal--e">E</span>
          <span class="compass__cardinal compass__cardinal--s">S</span>
          <span class="compass__cardinal compass__cardinal--w">W</span>
          <div class="compass__needle" id="compass-needle" style="transform: rotate(${direction ?? 0}deg)"></div>
          <div class="compass__dot"></div>
        </div>
        <div class="direction-controls">
          <label for="dir-input">Direction (0–359°)</label>
          <div class="direction-controls__row">
            <input type="number" id="dir-input" class="num-input"
              min="0" max="359" step="1"
              value="${direction ?? ''}"
              placeholder="e.g. 180"
            />
            <button class="btn btn--sm" id="save-dir-btn">Save</button>
          </div>
          <div class="direction-label" id="dir-label">${direction != null ? bearingLabel(direction) : ''}</div>
        </div>
      </div>
    </div>
  `;

  // Wire up events
  const dirInput  = document.getElementById('dir-input');
  const dirLabel  = document.getElementById('dir-label');
  const needle    = document.getElementById('compass-needle');
  const compass   = document.getElementById('compass');

  function bearingFromPointer(e) {
    const rect = compass.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX ?? e.touches?.[0].clientX) - cx;
    const dy   = (e.clientY ?? e.touches?.[0].clientY) - cy;
    return Math.round((Math.atan2(dx, -dy) * 180 / Math.PI + 360) % 360);
  }

  function applyBearing(val) {
    needle.style.transform = `rotate(${val}deg)`;
    dirInput.value         = val;
    dirLabel.textContent   = bearingLabel(val);
  }

  let dragging = false;

  compass.addEventListener('mousedown', e => {
    dragging = true;
    applyBearing(bearingFromPointer(e));
    e.preventDefault();
  });

  window.addEventListener('mousemove', e => {
    if (dragging) applyBearing(bearingFromPointer(e));
  });

  window.addEventListener('mouseup', () => { dragging = false; });

  compass.addEventListener('touchstart', e => {
    applyBearing(bearingFromPointer(e));
    e.preventDefault();
  }, { passive: false });

  compass.addEventListener('touchmove', e => {
    applyBearing(bearingFromPointer(e));
    e.preventDefault();
  }, { passive: false });

  dirInput.addEventListener('input', () => {
    const val = parseInt(dirInput.value);
    if (!isNaN(val) && val >= 0 && val <= 359) applyBearing(val);
  });

  document.getElementById('save-dir-btn').addEventListener('click', () => {
    const val = parseInt(dirInput.value);
    if (isNaN(val) || val < 0 || val > 359) return;
    if (!seatingData[pub.id]) seatingData[pub.id] = {};
    seatingData[pub.id].direction = val;
    seatingData[pub.id].name      = pubName(pub);
    saveSeatingData();
    refreshMarkerIcon(pub);
    // Refresh sun panel
    const newSunHours = getSunHours(pub, val, date);
    document.getElementById('sun-content').innerHTML = renderSunPanel(newSunHours);
  });

  document.getElementById('hide-venue-btn').addEventListener('click', () => hideVenue(pub));

  // Show sidebar
  document.getElementById('sidebar-empty').classList.add('hidden');
  el.classList.remove('hidden');
}

/* ── Sun calculation ─────────────────────────────────── */

/**
 * Convert SunCalc azimuth (radians from south, going west) to compass bearing (degrees, 0=N).
 */
function toCompassBearing(azimuthRad) {
  return (azimuthRad * 180 / Math.PI + 180 + 360) % 360;
}

/**
 * Smallest angular difference between two bearings (0–180).
 */
function angularDiff(a, b) {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

/**
 * Returns array of { hour, hasSun } for each daylight hour.
 */
function getSunHours(pub, direction, date) {
  const cacheKey = `${pub.id}_${toDateString(date)}_${direction}`;
  if (sunCache.has(cacheKey)) return sunCache.get(cacheKey);

  const results = [];

  for (let h = SUN_HOURS.start; h <= SUN_HOURS.end; h++) {
    const t = new Date(date);
    t.setHours(h, 0, 0, 0);

    // Sample 3 times per hour (0, 20, 40 min) for better accuracy
    let sunMinutes = 0;
    for (const min of [0, 20, 40]) {
      const sample = new Date(t);
      sample.setMinutes(min);
      const pos = SunCalc.getPosition(sample, pub.lat, pub.lon);
      if (pos.altitude <= 0) continue;
      const bearing = toCompassBearing(pos.azimuth);
      if (angularDiff(bearing, direction) < 90) sunMinutes += 20;
    }

    if (sunMinutes > 0) results.push({ hour: h, hasSun: true });
    else {
      // Only include in timeline if sun is above horizon at all
      const pos = SunCalc.getPosition(t, pub.lat, pub.lon);
      if (pos.altitude > 0) results.push({ hour: h, hasSun: false });
    }
  }

  sunCache.set(cacheKey, results);
  return results;
}

/**
 * Quick check: does this pub have sun right now (current hour)?
 */
function pubHasSunNow(pub, direction, date) {
  const hours = getSunHours(pub, direction, date);
  const currentHour = new Date().getHours();
  return hours.some(h => h.hour === currentHour && h.hasSun);
}

/* ── Sun panel HTML ──────────────────────────────────── */
function renderSunPanel(sunHours) {
  if (sunHours.length === 0) {
    return `<p class="hint">No daylight data for this date.</p>`;
  }

  const sunnyHours = sunHours.filter(h => h.hasSun);
  const minH = sunHours[0].hour;
  const maxH = sunHours[sunHours.length - 1].hour;

  let summaryHtml;
  if (sunnyHours.length === 0) {
    summaryHtml = `<p class="sun-none">No direct sun on this terrace today.</p>`;
  } else {
    const first = sunnyHours[0].hour;
    const last  = sunnyHours[sunnyHours.length - 1].hour;
    const label = first === last
      ? formatHour(first)
      : `${formatHour(first)} – ${formatHour(last + 1)}`;
    summaryHtml = `<p class="sun-summary">☀️ ${label}</p>`;
  }

  const bars = sunHours.map(({ hour, hasSun }) =>
    `<div class="timeline-bar timeline-bar--${hasSun ? 'sun' : 'shade'}" title="${formatHour(hour)}"></div>`
  ).join('');

  return `
    ${summaryHtml}
    <div class="timeline">
      <div class="timeline__bars">${bars}</div>
      <div class="timeline__labels">
        <span>${formatHour(minH)}</span>
        <span>${formatHour(maxH + 1)}</span>
      </div>
    </div>
  `;
}

/* ── Export / Import ─────────────────────────────────── */
function exportData() {
  const payload = JSON.stringify({ version: 1, pubs: seatingData }, null, 2);
  const blob    = new Blob([payload], { type: 'application/json' });
  const url     = URL.createObjectURL(blob);
  const a       = Object.assign(document.createElement('a'), { href: url, download: 'seating-data.json' });
  a.click();
  URL.revokeObjectURL(url);
}

function exportHidden() {
  const payload = JSON.stringify({ version: 1, hidden: [...hiddenVenues] }, null, 2);
  const blob    = new Blob([payload], { type: 'application/json' });
  const url     = URL.createObjectURL(blob);
  const a       = Object.assign(document.createElement('a'), { href: url, download: 'hidden-venues.json' });
  a.click();
  URL.revokeObjectURL(url);
}

function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const parsed = JSON.parse(ev.target.result);
      const incoming = parsed.pubs || parsed; // support both formats
      seatingData = { ...seatingData, ...incoming };
      saveSeatingData();
      // Re-render all markers
      pubs.forEach(p => refreshMarkerIcon(p));
      // Re-render open sidebar if any
      if (selectedPubId != null) {
        const pub = pubs.find(p => p.id === selectedPubId);
        if (pub) showPubDetails(pub);
      }
    } catch(err) {
      alert('Invalid JSON file.');
    }
  };
  reader.readAsText(file);
  e.target.value = ''; // reset so same file can be re-imported
}

/* ── Event handlers ──────────────────────────────────── */
function onDateChange() {
  sunCache.clear();
  // Refresh all marker icons (sun-now status may change for different dates)
  pubs.forEach(p => refreshMarkerIcon(p));
  // Refresh open sidebar
  if (selectedPubId != null) {
    const pub = pubs.find(p => p.id === selectedPubId);
    if (pub) showPubDetails(pub);
  }
}

/* ── UI helpers ──────────────────────────────────────── */
function showLoading(on) {
  document.getElementById('map-loading').classList.toggle('hidden', !on);
}

function showError(msg) {
  document.getElementById('map-error-msg').textContent = msg;
  document.getElementById('map-error').classList.remove('hidden');
}

function hideError() {
  document.getElementById('map-error').classList.add('hidden');
}

/* ── Formatting helpers ──────────────────────────────── */
const CARDINALS = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];

function bearingLabel(deg) {
  const card = CARDINALS[Math.round(deg / 22.5) % 16];
  return `${card} (${deg}°)`;
}

function formatHour(h) {
  return `${String(h % 24).padStart(2, '0')}:00`;
}

function pubName(pub) {
  return pub.tags?.name || 'Unnamed pub';
}

function pubAddress(pub) {
  const num    = pub.tags?.['addr:housenumber'] || '';
  const street = pub.tags?.['addr:street'] || '';
  const city   = pub.tags?.['addr:city'] || '';
  const line1  = [street, num].filter(Boolean).join(' ');
  return [line1, city].filter(Boolean).join(', ');
}

function pubHours(pub) {
  return pub.tags?.opening_hours || null;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── Go ──────────────────────────────────────────────── */
init();
