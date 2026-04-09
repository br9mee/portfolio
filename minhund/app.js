'use strict';

/* ===========================
   Storage helpers
   =========================== */
const DB = {
  get(key) {
    try { return JSON.parse(localStorage.getItem('minhund_' + key)) || null; } catch { return null; }
  },
  set(key, val) {
    localStorage.setItem('minhund_' + key, JSON.stringify(val));
  }
};

function getUsers()   { return DB.get('users')   || []; }
function getPets()    { return DB.get('pets')     || []; }
function getSession() { return DB.get('session')  || null; }
function setSession(user) { DB.set('session', user); }
function clearSession()   { DB.set('session', null); }
function saveUsers(u) { DB.set('users', u); }
function savePets(p)  { DB.set('pets',  p); }

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/* ===========================
   State
   =========================== */
let state = {
  user: null,
  currentPetId: null,
  currentTab: 'overview',
  editingPetId: null,
};

/* ===========================
   Boot
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
  const session = getSession();
  if (session) {
    state.user = session;
    updateNavUser();
    showView('dashboard');
  } else {
    showView('landing');
  }

  // Set today's date as default for all date inputs
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(el => {
    if (!el.value) el.value = today;
  });
});

/* ===========================
   Router
   =========================== */
function showView(name, sub) {
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  const nav = document.getElementById('main-nav');

  switch (name) {
    case 'landing':
      document.getElementById('view-landing').classList.remove('hidden');
      document.getElementById('nav-actions').classList.remove('hidden');
      document.getElementById('nav-user').classList.add('hidden');
      break;

    case 'auth':
      document.getElementById('view-auth').classList.remove('hidden');
      document.getElementById('nav-actions').classList.remove('hidden');
      document.getElementById('nav-user').classList.add('hidden');
      if (sub) switchAuthTab(sub);
      break;

    case 'dashboard':
      if (!guardAuth()) return;
      document.getElementById('view-dashboard').classList.remove('hidden');
      document.getElementById('nav-actions').classList.add('hidden');
      document.getElementById('nav-user').classList.remove('hidden');
      renderDashboard();
      break;

    case 'pet':
      if (!guardAuth()) return;
      document.getElementById('view-pet').classList.remove('hidden');
      document.getElementById('nav-actions').classList.add('hidden');
      document.getElementById('nav-user').classList.remove('hidden');
      renderPetDetail(state.currentPetId);
      break;

    case 'pet-form':
      if (!guardAuth()) return;
      document.getElementById('view-pet-form').classList.remove('hidden');
      document.getElementById('nav-actions').classList.add('hidden');
      document.getElementById('nav-user').classList.remove('hidden');
      setupPetForm(state.editingPetId);
      break;
  }

  window.scrollTo(0, 0);
}

function guardAuth() {
  if (!state.user) { showView('auth', 'login'); return false; }
  return true;
}

/* ===========================
   Auth
   =========================== */
function switchAuthTab(tab) {
  document.getElementById('form-login').classList.toggle('hidden', tab !== 'login');
  document.getElementById('form-register').classList.toggle('hidden', tab !== 'register');
  document.getElementById('tab-login').classList.toggle('active', tab === 'login');
  document.getElementById('tab-register').classList.toggle('active', tab === 'register');
  document.getElementById('login-error').classList.add('hidden');
  document.getElementById('reg-error').classList.add('hidden');
}

function handleRegister(e) {
  e.preventDefault();
  const name     = document.getElementById('reg-name').value.trim();
  const email    = document.getElementById('reg-email').value.trim().toLowerCase();
  const password = document.getElementById('reg-password').value;
  const errEl    = document.getElementById('reg-error');

  const users = getUsers();
  if (users.find(u => u.email === email)) {
    showError(errEl, 'An account with this email already exists.');
    return;
  }

  const user = { id: uid(), name, email, password, createdAt: Date.now() };
  users.push(user);
  saveUsers(users);

  const safe = { id: user.id, name: user.name, email: user.email };
  state.user = safe;
  setSession(safe);
  updateNavUser();
  toast('Account created! Welcome, ' + name + '.', 'success');
  showView('dashboard');
}

function handleLogin(e) {
  e.preventDefault();
  const email    = document.getElementById('login-email').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value;
  const errEl    = document.getElementById('login-error');

  const users = getUsers();
  const user  = users.find(u => u.email === email && u.password === password);

  if (!user) {
    showError(errEl, 'Incorrect email or password.');
    return;
  }

  const safe = { id: user.id, name: user.name, email: user.email };
  state.user = safe;
  setSession(safe);
  updateNavUser();
  toast('Welcome back, ' + user.name + '!', 'success');
  showView('dashboard');
}

function logout() {
  state.user = null;
  state.currentPetId = null;
  clearSession();
  showView('landing');
}

function updateNavUser() {
  if (!state.user) return;
  document.getElementById('nav-greeting').textContent = 'Hi, ' + state.user.name.split(' ')[0];
}

/* ===========================
   Dashboard
   =========================== */
function renderDashboard() {
  const pets = getPets().filter(p => p.userId === state.user.id);
  const grid  = document.getElementById('pets-grid');
  const empty = document.getElementById('empty-pets');

  document.getElementById('dashboard-sub').textContent =
    pets.length === 0 ? 'Get started by adding a pet.'
    : pets.length === 1 ? '1 pet registered'
    : pets.length + ' pets registered';

  // Upcoming reminders (all pets)
  const reminders = [];
  pets.forEach(pet => {
    (pet.vaccinations || []).forEach(v => {
      if (v.nextDue) {
        const days = daysUntil(v.nextDue);
        if (days !== null && days <= 30) {
          reminders.push({ pet: pet.name, label: v.name + ' booster', days });
        }
      }
    });
  });

  const remSec  = document.getElementById('reminders-section');
  const remList = document.getElementById('reminders-list');
  if (reminders.length > 0) {
    remSec.classList.remove('hidden');
    reminders.sort((a, b) => a.days - b.days);
    remList.innerHTML = reminders.map(r => `
      <div class="reminder-item ${r.days <= 7 ? 'urgent' : ''}">
        <span class="reminder-item__icon">${r.days <= 7 ? '🚨' : '⚡'}</span>
        <span class="reminder-item__text"><strong>${r.pet}</strong> — ${r.label}</span>
        <span class="reminder-item__days">${r.days === 0 ? 'Today' : r.days < 0 ? 'Overdue' : 'in ' + r.days + 'd'}</span>
      </div>`).join('');
  } else {
    remSec.classList.add('hidden');
  }

  if (pets.length === 0) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');
  grid.innerHTML = pets.map(pet => {
    const age    = calcAge(pet.dob);
    const weight = lastWeight(pet);
    const alerts = upcomingVaccCount(pet);
    const emoji  = speciesEmoji(pet.species);
    return `
    <div class="pet-card" onclick="openPet('${pet.id}')">
      <div class="pet-card__top">
        <div class="pet-avatar">${emoji}</div>
        <div>
          <div class="pet-card__name">${esc(pet.name)}</div>
          <div class="pet-card__meta">${[pet.breed, age].filter(Boolean).join(' · ')}</div>
        </div>
      </div>
      <div class="pet-card__stats">
        ${weight ? `<span class="pet-chip">⚖️ ${weight}</span>` : ''}
        <span class="pet-chip">💉 ${(pet.vaccinations||[]).length} shots</span>
        <span class="pet-chip">💊 ${(pet.medications||[]).length} meds</span>
        ${alerts > 0 ? `<span class="pet-chip alert">⚡ ${alerts} due soon</span>` : ''}
      </div>
    </div>`;
  }).join('');
}

function openPet(id) {
  state.currentPetId = id;
  state.currentTab   = 'overview';
  showView('pet');
}

/* ===========================
   Pet detail
   =========================== */
function renderPetDetail(id) {
  const pets = getPets();
  const pet  = pets.find(p => p.id === id);
  if (!pet) { showView('dashboard'); return; }

  // Header
  const age = calcAge(pet.dob);
  document.getElementById('pet-header').innerHTML = `
    <div class="pet-header__avatar">${speciesEmoji(pet.species)}</div>
    <div class="pet-header__info">
      <h1>${esc(pet.name)}</h1>
      <div class="pet-header__meta">${[pet.species, pet.breed, pet.gender, age].filter(Boolean).join(' · ')}</div>
    </div>
    <div class="pet-header__actions">
      <button class="btn btn--ghost btn--sm" onclick="editPet('${pet.id}')">Edit</button>
      <button class="btn btn--danger btn--sm" onclick="confirmDeletePet('${pet.id}')">Delete</button>
    </div>`;

  // Ensure current tab renders
  renderTab(state.currentTab, pet);

  // Set tab active state
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === state.currentTab);
  });
}

function switchTab(tab) {
  state.currentTab = tab;
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  document.querySelectorAll('.tab-panel').forEach(p => {
    p.classList.toggle('active', p.id === 'panel-' + tab);
    p.classList.toggle('hidden', p.id !== 'panel-' + tab);
  });

  const pets = getPets();
  const pet  = pets.find(p => p.id === state.currentPetId);
  if (pet) renderTab(tab, pet);
}

function renderTab(tab, pet) {
  // Ensure panels show/hide
  document.querySelectorAll('.tab-panel').forEach(p => {
    const isActive = p.id === 'panel-' + tab;
    p.classList.toggle('active', isActive);
    p.classList.toggle('hidden', !isActive);
  });

  if (tab === 'overview')      renderOverview(pet);
  if (tab === 'weight')        renderWeightTab(pet);
  if (tab === 'vaccinations')  renderVaccTab(pet);
  if (tab === 'medications')   renderMedTab(pet);
}

/* --- Overview --- */
function renderOverview(pet) {
  const age    = calcAge(pet.dob);
  const weight = lastWeight(pet);

  document.getElementById('overview-info').innerHTML = `
    <h3>Pet Info</h3>
    <div class="info-grid">
      <div class="info-item"><div class="info-item__label">Name</div><div class="info-item__value">${esc(pet.name)}</div></div>
      <div class="info-item"><div class="info-item__label">Species</div><div class="info-item__value">${esc(pet.species||'—')}</div></div>
      <div class="info-item"><div class="info-item__label">Breed</div><div class="info-item__value">${esc(pet.breed||'—')}</div></div>
      <div class="info-item"><div class="info-item__label">Gender</div><div class="info-item__value">${esc(pet.gender||'—')}</div></div>
      <div class="info-item"><div class="info-item__label">Age</div><div class="info-item__value">${age||'—'}</div></div>
      <div class="info-item"><div class="info-item__label">Weight</div><div class="info-item__value">${weight||'—'}</div></div>
      <div class="info-item"><div class="info-item__label">Colour</div><div class="info-item__value">${esc(pet.color||'—')}</div></div>
      <div class="info-item"><div class="info-item__label">Microchip</div><div class="info-item__value">${esc(pet.microchip||'—')}</div></div>
      ${pet.notes ? `<div class="info-item" style="grid-column:1/-1"><div class="info-item__label">Notes</div><div class="info-item__value">${esc(pet.notes)}</div></div>` : ''}
    </div>`;

  const upcoming = [];
  (pet.vaccinations || []).forEach(v => {
    if (v.nextDue) {
      const d = daysUntil(v.nextDue);
      if (d !== null && d <= 60) upcoming.push({ label: v.name + ' booster', days: d });
    }
  });
  upcoming.sort((a, b) => a.days - b.days);

  document.getElementById('overview-upcoming').innerHTML = `
    <h3>Upcoming</h3>
    ${upcoming.length === 0
      ? '<p style="color:var(--muted);font-size:.85rem;">No reminders in the next 60 days.</p>'
      : `<div class="upcoming-list">${upcoming.map(u => `
          <div class="upcoming-item">
            <span>💉</span>
            <span>${esc(u.label)}</span>
            <span class="badge-days ${u.days <= 7 ? 'urgent' : ''}">${u.days <= 0 ? 'Overdue' : 'in ' + u.days + 'd'}</span>
          </div>`).join('')}
        </div>`}`;
}

/* --- Weight tab --- */
function renderWeightTab(pet) {
  const weights = (pet.weights || []).slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  const tbody   = document.getElementById('weight-tbody');
  const empty   = document.getElementById('weight-empty');
  const wrap    = document.getElementById('weight-chart-wrap');

  if (weights.length === 0) {
    wrap.classList.add('hidden');
    empty.classList.remove('hidden');
    tbody.innerHTML = '';
    return;
  }

  wrap.classList.remove('hidden');
  empty.classList.add('hidden');

  // Table (newest first)
  tbody.innerHTML = [...weights].reverse().map(w => `
    <tr>
      <td>${formatDate(w.date)}</td>
      <td><strong>${w.value} ${w.unit}</strong></td>
      <td style="color:var(--muted)">${esc(w.notes||'')}</td>
      <td><button class="btn btn--danger" onclick="deleteRecord('${pet.id}','weight','${w.id}')">✕</button></td>
    </tr>`).join('');

  // Chart
  drawWeightChart(weights);
}

function drawWeightChart(weights) {
  const svg    = document.getElementById('weight-chart');
  const W      = svg.clientWidth || 600;
  const H      = 160;
  const padL   = 44, padR = 16, padT = 16, padB = 32;
  const cW     = W - padL - padR;
  const cH     = H - padT - padB;

  const vals   = weights.map(w => parseFloat(w.value));
  const minV   = Math.min(...vals) * 0.95;
  const maxV   = Math.max(...vals) * 1.05;
  const range  = maxV - minV || 1;

  const toX = i => padL + (i / (weights.length - 1 || 1)) * cW;
  const toY = v => padT + cH - ((v - minV) / range) * cH;

  const pts  = weights.map((w, i) => `${toX(i)},${toY(parseFloat(w.value))}`).join(' ');
  const area = `${padL},${padT + cH} ` + pts + ` ${toX(weights.length - 1)},${padT + cH}`;

  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.innerHTML = `
    <defs>
      <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#3B82F6" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <polygon class="chart-area" points="${area}"/>
    <polyline class="chart-line" points="${pts}"/>
    ${weights.map((w, i) => `
      <circle class="chart-dot" cx="${toX(i)}" cy="${toY(parseFloat(w.value))}" r="4"/>
      <text class="chart-label" x="${toX(i)}" y="${H - 8}" text-anchor="middle">${shortDate(w.date)}</text>
    `).join('')}
    <text class="chart-label" x="${padL - 6}" y="${padT + 4}" text-anchor="end">${maxV.toFixed(1)}</text>
    <text class="chart-label" x="${padL - 6}" y="${padT + cH}" text-anchor="end">${minV.toFixed(1)}</text>`;
}

/* --- Vaccination tab --- */
function renderVaccTab(pet) {
  const vaccs = pet.vaccinations || [];
  const tbody = document.getElementById('vacc-tbody');
  const empty = document.getElementById('vacc-empty');
  const table = document.getElementById('vacc-table');

  if (vaccs.length === 0) {
    table.classList.add('hidden');
    empty.classList.remove('hidden');
    return;
  }

  table.classList.remove('hidden');
  empty.classList.add('hidden');

  tbody.innerHTML = [...vaccs].reverse().map(v => {
    const days   = v.nextDue ? daysUntil(v.nextDue) : null;
    const status = days === null ? '' : days < 0 ? 'overdue' : days <= 14 ? 'due' : 'ok';
    const pill   = days === null ? '' :
      `<span class="status-pill status-pill--${status}">${days < 0 ? 'Overdue' : days === 0 ? 'Today' : 'in ' + days + 'd'}</span>`;
    return `
    <tr>
      <td><strong>${esc(v.name)}</strong></td>
      <td>${formatDate(v.dateGiven)}</td>
      <td>${v.nextDue ? formatDate(v.nextDue) + ' ' + pill : '—'}</td>
      <td style="color:var(--muted)">${esc(v.notes||'')}</td>
      <td><button class="btn btn--danger" onclick="deleteRecord('${pet.id}','vaccination','${v.id}')">✕</button></td>
    </tr>`;
  }).join('');
}

/* --- Medication tab --- */
function renderMedTab(pet) {
  const meds  = pet.medications || [];
  const tbody = document.getElementById('med-tbody');
  const empty = document.getElementById('med-empty');
  const table = document.getElementById('med-table');

  if (meds.length === 0) {
    table.classList.add('hidden');
    empty.classList.remove('hidden');
    return;
  }

  table.classList.remove('hidden');
  empty.classList.add('hidden');

  tbody.innerHTML = [...meds].reverse().map(m => {
    const today   = new Date().toISOString().split('T')[0];
    const active  = (!m.endDate || m.endDate >= today);
    return `
    <tr>
      <td><strong>${esc(m.name)}</strong><br/><span class="status-pill status-pill--${active?'active':'ok'}">${active?'Active':'Completed'}</span></td>
      <td>${esc(m.dosage)}</td>
      <td>${esc(m.frequency)}</td>
      <td>${m.startDate ? formatDate(m.startDate) : '—'}</td>
      <td>${m.endDate   ? formatDate(m.endDate)   : '—'}</td>
      <td style="color:var(--muted)">${esc(m.notes||'')}</td>
      <td><button class="btn btn--danger" onclick="deleteRecord('${pet.id}','medication','${m.id}')">✕</button></td>
    </tr>`;
  }).join('');
}

/* ===========================
   Pet CRUD
   =========================== */
function setupPetForm(editId) {
  const form  = document.getElementById('pet-form');
  const title = document.getElementById('pet-form-title');
  const submitBtn = document.getElementById('pet-form-submit');
  form.reset();

  if (editId) {
    const pet = getPets().find(p => p.id === editId);
    if (!pet) return;
    title.textContent = 'Edit ' + pet.name;
    submitBtn.textContent = 'Save Changes';
    document.getElementById('pet-name').value      = pet.name      || '';
    document.getElementById('pet-species').value   = pet.species   || '';
    document.getElementById('pet-breed').value     = pet.breed     || '';
    document.getElementById('pet-gender').value    = pet.gender    || '';
    document.getElementById('pet-dob').value       = pet.dob       || '';
    document.getElementById('pet-color').value     = pet.color     || '';
    document.getElementById('pet-microchip').value = pet.microchip || '';
    document.getElementById('pet-notes').value     = pet.notes     || '';
    document.getElementById('pet-form-back').onclick = () => {
      state.editingPetId = null;
      showView('pet');
    };
  } else {
    title.textContent = 'Add a Pet';
    submitBtn.textContent = 'Save Pet';
    document.getElementById('pet-form-back').onclick = () => showView('dashboard');
  }
}

function handlePetForm(e) {
  e.preventDefault();
  const data = {
    name:      document.getElementById('pet-name').value.trim(),
    species:   document.getElementById('pet-species').value,
    breed:     document.getElementById('pet-breed').value.trim(),
    gender:    document.getElementById('pet-gender').value,
    dob:       document.getElementById('pet-dob').value,
    color:     document.getElementById('pet-color').value.trim(),
    microchip: document.getElementById('pet-microchip').value.trim(),
    notes:     document.getElementById('pet-notes').value.trim(),
  };

  let pets = getPets();

  if (state.editingPetId) {
    pets = pets.map(p => p.id === state.editingPetId ? { ...p, ...data } : p);
    savePets(pets);
    toast(data.name + ' updated.', 'success');
    state.currentPetId = state.editingPetId;
    state.editingPetId = null;
    showView('pet');
  } else {
    const pet = {
      id: uid(),
      userId: state.user.id,
      ...data,
      weights:      [],
      vaccinations: [],
      medications:  [],
      createdAt: Date.now(),
    };
    pets.push(pet);
    savePets(pets);
    toast(data.name + ' added!', 'success');
    showView('dashboard');
  }
}

function editPet(id) {
  state.editingPetId = id;
  showView('pet-form');
}

function confirmDeletePet(id) {
  const pet = getPets().find(p => p.id === id);
  if (!pet) return;
  if (!confirm(`Delete ${pet.name}? This will remove all their records and cannot be undone.`)) return;
  const pets = getPets().filter(p => p.id !== id);
  savePets(pets);
  toast(pet.name + ' removed.', 'success');
  showView('dashboard');
}

/* ===========================
   Records CRUD
   =========================== */
function handleAddRecord(e, type) {
  e.preventDefault();
  const pets = getPets();
  const pet  = pets.find(p => p.id === state.currentPetId);
  if (!pet) return;

  if (type === 'weight') {
    const entry = {
      id:    uid(),
      date:  document.getElementById('w-date').value,
      value: parseFloat(document.getElementById('w-value').value),
      unit:  document.getElementById('w-unit').value,
      notes: document.getElementById('w-notes').value.trim(),
    };
    pet.weights = pet.weights || [];
    pet.weights.push(entry);
  }

  if (type === 'vaccination') {
    const entry = {
      id:        uid(),
      name:      document.getElementById('v-name').value.trim(),
      dateGiven: document.getElementById('v-given').value,
      nextDue:   document.getElementById('v-due').value || null,
      notes:     document.getElementById('v-notes').value.trim(),
    };
    pet.vaccinations = pet.vaccinations || [];
    pet.vaccinations.push(entry);
  }

  if (type === 'medication') {
    const entry = {
      id:        uid(),
      name:      document.getElementById('m-name').value.trim(),
      dosage:    document.getElementById('m-dosage').value.trim(),
      frequency: document.getElementById('m-frequency').value.trim(),
      startDate: document.getElementById('m-start').value || null,
      endDate:   document.getElementById('m-end').value   || null,
      notes:     document.getElementById('m-notes').value.trim(),
    };
    pet.medications = pet.medications || [];
    pet.medications.push(entry);
  }

  savePets(pets);
  hideModal();
  toast('Saved!', 'success');
  renderTab(state.currentTab, pet);
}

function deleteRecord(petId, type, recordId) {
  if (!confirm('Delete this entry?')) return;
  const pets = getPets();
  const pet  = pets.find(p => p.id === petId);
  if (!pet) return;

  if (type === 'weight')       pet.weights      = (pet.weights      || []).filter(r => r.id !== recordId);
  if (type === 'vaccination')  pet.vaccinations = (pet.vaccinations || []).filter(r => r.id !== recordId);
  if (type === 'medication')   pet.medications  = (pet.medications  || []).filter(r => r.id !== recordId);

  savePets(pets);
  toast('Deleted.', 'success');
  renderTab(state.currentTab, pet);
}

/* ===========================
   Modals
   =========================== */
function showModal(type) {
  document.getElementById('modal-backdrop').classList.remove('hidden');
  document.getElementById('modal-' + type).classList.remove('hidden');
}

function hideModal() {
  document.getElementById('modal-backdrop').classList.add('hidden');
  document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') hideModal(); });

/* ===========================
   Toast
   =========================== */
let toastTimer;
function toast(msg, type = '') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className   = 'toast show ' + type;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.classList.remove('show'); }, 3000);
}

/* ===========================
   Helpers
   =========================== */
function esc(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatDate(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
}

function shortDate(iso) {
  if (!iso) return '';
  const [, m, d] = iso.split('-');
  return `${d}/${m}`;
}

function daysUntil(iso) {
  if (!iso) return null;
  const now  = new Date(); now.setHours(0,0,0,0);
  const due  = new Date(iso);
  return Math.round((due - now) / 86400000);
}

function calcAge(dob) {
  if (!dob) return null;
  const birth = new Date(dob);
  const now   = new Date();
  const years = now.getFullYear() - birth.getFullYear();
  const months = now.getMonth() - birth.getMonth() + years * 12;
  if (months < 1)  return 'Just born';
  if (months < 24) return months + ' months old';
  return Math.floor(months / 12) + ' yrs old';
}

function lastWeight(pet) {
  const weights = (pet.weights || []);
  if (weights.length === 0) return null;
  const last = weights[weights.length - 1];
  return `${last.value} ${last.unit}`;
}

function upcomingVaccCount(pet) {
  return (pet.vaccinations || []).filter(v => {
    if (!v.nextDue) return false;
    const d = daysUntil(v.nextDue);
    return d !== null && d <= 30;
  }).length;
}

function speciesEmoji(species) {
  const map = { Dog:'🐶', Cat:'🐱', Rabbit:'🐰', Bird:'🐦', Other:'🐾' };
  return map[species] || '🐾';
}

function showError(el, msg) {
  el.textContent = msg;
  el.classList.remove('hidden');
}
