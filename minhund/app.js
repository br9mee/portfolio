'use strict';

/* ===========================
   Translations
   =========================== */
const LANG = {
  en: {
    // Nav
    navLogin: 'Log in', navGetStarted: 'Get Started', navLogout: 'Log out',
    // Landing
    heroBadge: 'Free · No credit card needed',
    heroTitle: "Your pet's health,", heroTitleEm: 'all in one place.',
    heroSub: "MinHund helps you track your pet's weight, vaccinations, medications, and more — so you never miss a vet visit or a dose.",
    heroCta1: 'Create a free account', heroCta2: 'I already have an account',
    demoShots: 'shots', demoMeds: 'meds', demoAlert: '⚡ Rabies booster due in 12 days',
    featuresTitle: 'Everything your pet needs, tracked.',
    feat1Title: 'Weight Log',       feat1Desc: "Record and visualise your pet's weight over time. Spot trends early.",
    feat2Title: 'Vaccination Schedule', feat2Desc: 'Log every shot and get reminders before the next one is due.',
    feat3Title: 'Medication Tracker',   feat3Desc: 'Keep track of dosage, frequency, and duration for all medications.',
    feat4Title: 'Vet Records',      feat4Desc: "Store your vet's contact info and track appointments for every pet.",
    feat5Title: 'Multiple Pets',    feat5Desc: 'One account for all your animals. Dogs, cats, rabbits — all welcome.',
    // Auth
    loginTab: 'Log in', registerTab: 'Register',
    loginTitle: 'Welcome back', regTitle: 'Create your account',
    labelEmail: 'Email', labelPassword: 'Password', labelName: 'Your name',
    phEmail: 'you@example.com', phName: 'Jane Smith', phPassword: 'Min. 6 characters',
    loginBtn: 'Log in', regBtn: 'Create account',
    loginSwitch: 'No account?', loginSwitchLink: 'Register free',
    regSwitch: 'Already registered?', regSwitchLink: 'Log in',
    errEmailTaken: 'An account with this email already exists.',
    errBadLogin: 'Incorrect email or password.',
    // Dashboard
    yourPets: 'Your Pets', addPet: 'Add Pet',
    upcomingReminders: 'Upcoming Reminders', allPets: 'All Pets',
    noPetsTitle: 'No pets yet', noPetsDesc: 'Add your first pet to start tracking their health.',
    addFirstPet: 'Add your first pet',
    pet1registered: '1 pet registered', petsRegistered: '{n} pets registered',
    // Pet form
    addPetTitle: 'Add a Pet',
    petNameLabel: 'Pet Name *', phPetName: 'Bella',
    speciesLabel: 'Species *', speciesSelect: 'Select…',
    speciesDog: 'Dog', speciesCat: 'Cat', speciesRabbit: 'Rabbit', speciesBird: 'Bird', speciesOther: 'Other',
    breedLabel: 'Breed', phBreed: 'e.g. Golden Retriever',
    genderLabel: 'Gender', genderUnknown: 'Unknown', genderMale: 'Male', genderFemale: 'Female',
    dobLabel: 'Date of Birth',
    colorLabel: 'Colour / Markings', phColor: 'e.g. Golden, white paws',
    microchipLabel: 'Microchip Number', phMicrochip: '15-digit number',
    notesLabel: 'Notes', phNotes: 'Allergies, vet info, anything useful…',
    photoLabel: 'Photo', choosePhoto: 'Choose Photo', removePhoto: 'Remove',
    savePet: 'Save Pet', saveChanges: 'Save Changes', cancelBtn: 'Cancel',
    // Tabs
    tabOverview: 'Overview', tabWeight: 'Weight',
    tabVaccinations: 'Vaccinations', tabMedications: 'Medications', tabVet: 'Vet',
    // Pet detail - overview
    backToDash: 'Back to dashboard',
    editBtn: 'Edit', deleteBtn: 'Delete',
    petInfoSection: 'Pet Info', upcomingSection: 'Upcoming',
    noReminders: 'No reminders in the next 60 days.',
    labelNameInfo: 'Name', labelSpecies: 'Species', labelBreed: 'Breed',
    labelGender: 'Gender', labelAge: 'Age', labelWeight: 'Weight',
    labelColour: 'Colour', labelMicrochip: 'Microchip',
    justBorn: 'Just born', monthsOld: '{n} months old', yearsOld: '{n} yrs old',
    // Weight
    weightHistory: 'Weight History', addEntry: '+ Add Entry',
    dateCol: 'Date', weightCol: 'Weight', notesCol: 'Notes',
    noWeightYet: 'No weight entries yet.', addFirstEntry: 'Add first entry',
    // Vaccinations
    addVacc: '+ Add Vaccination',
    vaccineCol: 'Vaccine', dateGivenCol: 'Date Given', nextDueCol: 'Next Due',
    noVaccYet: 'No vaccinations recorded yet.', addFirstVacc: 'Add first vaccination',
    // Medications
    addMed: '+ Add Medication',
    medicationCol: 'Medication', dosageCol: 'Dosage', frequencyCol: 'Frequency',
    startCol: 'Start', endCol: 'End',
    noMedYet: 'No medications recorded yet.', addFirstMed: 'Add first medication',
    activeStatus: 'Active', completedStatus: 'Completed',
    // Vet
    clinicName: 'Clinic Name', phClinic: 'Oslo Animal Clinic',
    vetDoctorName: 'Vet Name', phVetName: 'Dr. Hansen',
    phoneLabel: 'Phone', emailLabel: 'Email',
    addressLabel: 'Address', phAddress: 'Storgata 1, Oslo',
    lastVisitLabel: 'Last Visit', nextApptLabel: 'Next Appointment',
    phVetNotes: 'Allergies, special notes for the vet…',
    saveVetInfo: 'Save Vet Info',
    vetAppt: 'Vet appointment',
    // Modals
    addWeightTitle: 'Add Weight Entry', dateLabel: 'Date *', weightLabel: 'Weight *',
    phOptionalNotes: 'Optional notes', saveEntry: 'Save Entry',
    addVaccTitle: 'Add Vaccination', vaccNameLabel: 'Vaccine Name *',
    phVaccName: 'e.g. Rabies, Distemper', dateGivenLabel: 'Date Given *',
    nextDueLabel: 'Next Due', phBatchNotes: 'Batch number, clinic, etc.',
    saveVacc: 'Save Vaccination',
    addMedTitle: 'Add Medication', medNameLabel: 'Medication Name *',
    phMedName: 'e.g. Bravecto, Apoquel', dosageLabel: 'Dosage *', phDosage: 'e.g. 500mg',
    frequencyLabel: 'Frequency *', phFrequency: 'e.g. Once daily, Every 3 months',
    startDateLabel: 'Start Date', endDateLabel: 'End Date',
    phPrescNotes: 'Prescribing vet, reason, etc.', saveMed: 'Save Medication',
    // Status / dates
    statusOverdue: 'Overdue', statusToday: 'Today', statusIn: 'in {n}d',
    reminderBooster: 'booster',
    // Toasts
    toastWelcome: 'Account created! Welcome, {name}.',
    toastWelcomeBack: 'Welcome back, {name}!',
    toastUpdated: '{name} updated.', toastAdded: '{name} added!', toastRemoved: '{name} removed.',
    toastSaved: 'Saved!', toastDeleted: 'Deleted.', toastVetSaved: 'Vet info saved.',
    // Confirm
    confirmDeletePet: 'Delete {name}? This will remove all their records and cannot be undone.',
    confirmDeleteRecord: 'Delete this entry?',
  },

  no: {
    // Nav
    navLogin: 'Logg inn', navGetStarted: 'Kom i gang', navLogout: 'Logg ut',
    // Landing
    heroBadge: 'Gratis · Inget kredittkort nødvendig',
    heroTitle: 'Kjæledyrenes helse,', heroTitleEm: 'samlet på ett sted.',
    heroSub: 'MinHund hjelper deg med å spore kjæledyrenes vekt, vaksinasjoner, medisiner og mer — slik at du aldri går glipp av en veterinærtime eller dose.',
    heroCta1: 'Opprett gratis konto', heroCta2: 'Jeg har allerede en konto',
    demoShots: 'vaksinasjoner', demoMeds: 'medisiner', demoAlert: '⚡ Rabiesvaksine forfaller om 12 dager',
    featuresTitle: 'Alt kjæledyret ditt trenger, registrert.',
    feat1Title: 'Vektlogg',             feat1Desc: 'Registrer og visualiser kjæledyrets vekt over tid. Oppdage trender tidlig.',
    feat2Title: 'Vaksinasjonsplan',     feat2Desc: 'Logg hver vaksine og få påminnelser før neste dose.',
    feat3Title: 'Medisinsporing',       feat3Desc: 'Hold oversikt over dosering, frekvens og varighet for alle medisiner.',
    feat4Title: 'Veterinærjournal',     feat4Desc: 'Lagre veterinærens kontaktinfo og spor avtaler for hvert kjæledyr.',
    feat5Title: 'Flere kjæledyr',       feat5Desc: 'Én konto for alle dyrene dine. Hunder, katter, kaniner — alle velkomne.',
    // Auth
    loginTab: 'Logg inn', registerTab: 'Registrer',
    loginTitle: 'Velkommen tilbake', regTitle: 'Opprett din konto',
    labelEmail: 'E-post', labelPassword: 'Passord', labelName: 'Ditt navn',
    phEmail: 'deg@eksempel.no', phName: 'Kari Nordmann', phPassword: 'Min. 6 tegn',
    loginBtn: 'Logg inn', regBtn: 'Opprett konto',
    loginSwitch: 'Ingen konto?', loginSwitchLink: 'Registrer gratis',
    regSwitch: 'Allerede registrert?', regSwitchLink: 'Logg inn',
    errEmailTaken: 'En konto med denne e-posten finnes allerede.',
    errBadLogin: 'Feil e-post eller passord.',
    // Dashboard
    yourPets: 'Dine kjæledyr', addPet: 'Legg til dyr',
    upcomingReminders: 'Kommende påminnelser', allPets: 'Alle dyr',
    noPetsTitle: 'Ingen dyr ennå', noPetsDesc: 'Legg til ditt første dyr for å begynne å spore helsen.',
    addFirstPet: 'Legg til ditt første dyr',
    pet1registered: '1 dyr registrert', petsRegistered: '{n} dyr registrert',
    // Pet form
    addPetTitle: 'Legg til et dyr',
    petNameLabel: 'Navn på dyr *', phPetName: 'Bella',
    speciesLabel: 'Dyreart *', speciesSelect: 'Velg…',
    speciesDog: 'Hund', speciesCat: 'Katt', speciesRabbit: 'Kanin', speciesBird: 'Fugl', speciesOther: 'Annet',
    breedLabel: 'Rase', phBreed: 'f.eks. Golden Retriever',
    genderLabel: 'Kjønn', genderUnknown: 'Ukjent', genderMale: 'Hann', genderFemale: 'Hunn',
    dobLabel: 'Fødselsdato',
    colorLabel: 'Farge / Kjennetegn', phColor: 'f.eks. Gylden, hvite poter',
    microchipLabel: 'Mikrochipnummer', phMicrochip: '15-sifret nummer',
    notesLabel: 'Notater', phNotes: 'Allergier, veterinærinfo, noe nyttig…',
    photoLabel: 'Bilde', choosePhoto: 'Velg bilde', removePhoto: 'Fjern',
    savePet: 'Lagre dyr', saveChanges: 'Lagre endringer', cancelBtn: 'Avbryt',
    // Tabs
    tabOverview: 'Oversikt', tabWeight: 'Vekt',
    tabVaccinations: 'Vaksinasjoner', tabMedications: 'Medisiner', tabVet: 'Veterinær',
    // Pet detail - overview
    backToDash: 'Tilbake til oversikten',
    editBtn: 'Rediger', deleteBtn: 'Slett',
    petInfoSection: 'Dyreinfo', upcomingSection: 'Kommende',
    noReminders: 'Ingen påminnelser de neste 60 dagene.',
    labelNameInfo: 'Navn', labelSpecies: 'Art', labelBreed: 'Rase',
    labelGender: 'Kjønn', labelAge: 'Alder', labelWeight: 'Vekt',
    labelColour: 'Farge', labelMicrochip: 'Mikrochip',
    justBorn: 'Nyfødt', monthsOld: '{n} måneder gammel', yearsOld: '{n} år gammel',
    // Weight
    weightHistory: 'Vekthistorikk', addEntry: '+ Legg til',
    dateCol: 'Dato', weightCol: 'Vekt', notesCol: 'Notater',
    noWeightYet: 'Ingen vektregistreringer ennå.', addFirstEntry: 'Legg til første registrering',
    // Vaccinations
    addVacc: '+ Legg til vaksine',
    vaccineCol: 'Vaksine', dateGivenCol: 'Dato gitt', nextDueCol: 'Neste dose',
    noVaccYet: 'Ingen vaksinasjoner registrert ennå.', addFirstVacc: 'Legg til første vaksine',
    // Medications
    addMed: '+ Legg til medisin',
    medicationCol: 'Medisin', dosageCol: 'Dosering', frequencyCol: 'Frekvens',
    startCol: 'Start', endCol: 'Slutt',
    noMedYet: 'Ingen medisiner registrert ennå.', addFirstMed: 'Legg til første medisin',
    activeStatus: 'Aktiv', completedStatus: 'Fullført',
    // Vet
    clinicName: 'Klinikknavn', phClinic: 'Oslo Dyreklinikk',
    vetDoctorName: 'Veterinærens navn', phVetName: 'Dr. Hansen',
    phoneLabel: 'Telefon', emailLabel: 'E-post',
    addressLabel: 'Adresse', phAddress: 'Storgata 1, Oslo',
    lastVisitLabel: 'Siste besøk', nextApptLabel: 'Neste avtale',
    phVetNotes: 'Allergier, spesielle notater til veterinæren…',
    saveVetInfo: 'Lagre veterinærinfo',
    vetAppt: 'Veterinæravtale',
    // Modals
    addWeightTitle: 'Legg til vektregistrering', dateLabel: 'Dato *', weightLabel: 'Vekt *',
    phOptionalNotes: 'Valgfrie notater', saveEntry: 'Lagre',
    addVaccTitle: 'Legg til vaksine', vaccNameLabel: 'Vaksinenavn *',
    phVaccName: 'f.eks. Rabies, Valpesyke', dateGivenLabel: 'Dato gitt *',
    nextDueLabel: 'Neste dose', phBatchNotes: 'Batchnummer, klinikk, osv.',
    saveVacc: 'Lagre vaksine',
    addMedTitle: 'Legg til medisin', medNameLabel: 'Medisinnavn *',
    phMedName: 'f.eks. Bravecto, Apoquel', dosageLabel: 'Dosering *', phDosage: 'f.eks. 500mg',
    frequencyLabel: 'Frekvens *', phFrequency: 'f.eks. En gang daglig, Hver 3. måned',
    startDateLabel: 'Startdato', endDateLabel: 'Sluttdato',
    phPrescNotes: 'Foreskrivende vet, årsak, osv.', saveMed: 'Lagre medisin',
    // Status / dates
    statusOverdue: 'Forfalt', statusToday: 'I dag', statusIn: 'om {n}d',
    reminderBooster: 'påminnelse',
    // Toasts
    toastWelcome: 'Konto opprettet! Velkommen, {name}.',
    toastWelcomeBack: 'Velkommen tilbake, {name}!',
    toastUpdated: '{name} oppdatert.', toastAdded: '{name} lagt til!', toastRemoved: '{name} fjernet.',
    toastSaved: 'Lagret!', toastDeleted: 'Slettet.', toastVetSaved: 'Veterinærinfo lagret.',
    // Confirm
    confirmDeletePet: 'Slette {name}? Dette fjerner alle registreringer og kan ikke angres.',
    confirmDeleteRecord: 'Slette denne registreringen?',
  }
};

let currentLang = 'en';

function t(key, vars) {
  let str = (LANG[currentLang] && LANG[currentLang][key]) || LANG.en[key] || key;
  if (vars) Object.entries(vars).forEach(([k, v]) => { str = str.replace('{' + k + '}', v); });
  return str;
}

function setLang(lang) {
  currentLang = lang;
  DB.set('lang', lang);
  document.getElementById('html-root').lang = lang;
  document.getElementById('lang-en').classList.toggle('active', lang === 'en');
  document.getElementById('lang-no').classList.toggle('active', lang === 'no');
  applyTranslations();
  reRenderCurrentView();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPh);
  });
}

function reRenderCurrentView() {
  const views = ['landing','auth','dashboard','pet','pet-form'];
  const active = views.find(v => !document.getElementById('view-' + v).classList.contains('hidden'));
  if (active === 'dashboard') renderDashboard();
  if (active === 'pet' && state.currentPetId) renderPetDetail(state.currentPetId);
}

/* ===========================
   Storage helpers
   =========================== */
const DB = {
  get(key)    { try { return JSON.parse(localStorage.getItem('minhund_' + key)) || null; } catch { return null; } },
  set(key, v) { localStorage.setItem('minhund_' + key, JSON.stringify(v)); }
};

function getUsers()   { return DB.get('users')   || []; }
function getPets()    { return DB.get('pets')     || []; }
function getSession() { return DB.get('session')  || null; }
function setSession(u){ DB.set('session', u); }
function clearSession(){ DB.set('session', null); }
function saveUsers(u) { DB.set('users', u); }
function savePets(p)  { DB.set('pets', p); }

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
  pendingPhoto: undefined, // undefined = no change, null = remove, string = new photo
};

/* ===========================
   Boot
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = DB.get('lang');
  if (savedLang && LANG[savedLang]) {
    currentLang = savedLang;
    document.getElementById('lang-en').classList.toggle('active', savedLang === 'en');
    document.getElementById('lang-no').classList.toggle('active', savedLang === 'no');
    document.getElementById('html-root').lang = savedLang;
  }

  applyTranslations();

  const session = getSession();
  if (session) {
    state.user = session;
    updateNavUser();
    showView('dashboard');
  } else {
    showView('landing');
  }

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

  applyTranslations();
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
    showError(errEl, t('errEmailTaken'));
    return;
  }

  const user = { id: uid(), name, email, password, createdAt: Date.now() };
  users.push(user);
  saveUsers(users);

  const safe = { id: user.id, name: user.name, email: user.email };
  state.user = safe;
  setSession(safe);
  updateNavUser();
  toast(t('toastWelcome', { name }), 'success');
  showView('dashboard');
}

function handleLogin(e) {
  e.preventDefault();
  const email    = document.getElementById('login-email').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value;
  const errEl    = document.getElementById('login-error');
  const user     = getUsers().find(u => u.email === email && u.password === password);

  if (!user) { showError(errEl, t('errBadLogin')); return; }

  const safe = { id: user.id, name: user.name, email: user.email };
  state.user = safe;
  setSession(safe);
  updateNavUser();
  toast(t('toastWelcomeBack', { name: user.name }), 'success');
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
   Photo Upload
   =========================== */
function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = evt => {
    const img = new Image();
    img.onload = () => {
      const MAX = 400;
      let w = img.width, h = img.height;
      if (w > MAX || h > MAX) {
        if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
        else       { w = Math.round(w * MAX / h); h = MAX; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      const base64 = canvas.toDataURL('image/jpeg', 0.8);
      state.pendingPhoto = base64;
      showPhotoPreview(base64);
    };
    img.src = evt.target.result;
  };
  reader.readAsDataURL(file);
}

function showPhotoPreview(src) {
  const emojiEl = document.getElementById('photo-preview-emoji');
  const imgEl   = document.getElementById('photo-preview-img');
  const removeBtn = document.getElementById('remove-photo-btn');
  if (src) {
    emojiEl.classList.add('hidden');
    imgEl.src = src;
    imgEl.classList.remove('hidden');
    removeBtn.classList.remove('hidden');
  } else {
    emojiEl.classList.remove('hidden');
    imgEl.src = '';
    imgEl.classList.add('hidden');
    removeBtn.classList.add('hidden');
  }
}

function removePhoto() {
  state.pendingPhoto = null;
  showPhotoPreview(null);
  document.getElementById('pet-photo').value = '';
  const emojiEl = document.getElementById('photo-preview-emoji');
  if (state.editingPetId) {
    const pet = getPets().find(p => p.id === state.editingPetId);
    if (pet) emojiEl.textContent = speciesEmoji(pet.species);
  }
}

/* ===========================
   Dashboard
   =========================== */
function renderDashboard() {
  const pets  = getPets().filter(p => p.userId === state.user.id);
  const grid  = document.getElementById('pets-grid');
  const empty = document.getElementById('empty-pets');

  document.getElementById('dashboard-sub').textContent =
    pets.length === 0 ? '' :
    pets.length === 1 ? t('pet1registered') : t('petsRegistered', { n: pets.length });

  // Reminders: vaccinations + vet appointments
  const reminders = [];
  pets.forEach(pet => {
    (pet.vaccinations || []).forEach(v => {
      if (v.nextDue) {
        const days = daysUntil(v.nextDue);
        if (days !== null && days <= 30) reminders.push({ pet: pet.name, label: v.name + ' ' + t('reminderBooster'), days, type: 'vacc' });
      }
    });
    if (pet.vet && pet.vet.nextAppt) {
      const days = daysUntil(pet.vet.nextAppt);
      if (days !== null && days <= 30) reminders.push({ pet: pet.name, label: t('vetAppt'), days, type: 'vet' });
    }
  });

  const remSec  = document.getElementById('reminders-section');
  const remList = document.getElementById('reminders-list');
  if (reminders.length > 0) {
    remSec.classList.remove('hidden');
    reminders.sort((a, b) => a.days - b.days);
    remList.innerHTML = reminders.map(r => `
      <div class="reminder-item ${r.days <= 7 ? 'urgent' : r.type === 'vet' ? 'vet' : ''}">
        <span class="reminder-item__icon">${r.type === 'vet' ? '🏥' : (r.days <= 7 ? '🚨' : '⚡')}</span>
        <span class="reminder-item__text"><strong>${esc(r.pet)}</strong> — ${esc(r.label)}</span>
        <span class="reminder-item__days">${r.days <= 0 ? t('statusOverdue') : r.days === 0 ? t('statusToday') : t('statusIn', { n: r.days })}</span>
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
    const alerts = upcomingCount(pet);
    return `
    <div class="pet-card" onclick="openPet('${pet.id}')">
      <div class="pet-card__top">
        <div class="pet-avatar">${petAvatarHTML(pet, 52)}</div>
        <div>
          <div class="pet-card__name">${esc(pet.name)}</div>
          <div class="pet-card__meta">${[pet.breed, age].filter(Boolean).join(' · ')}</div>
        </div>
      </div>
      <div class="pet-card__stats">
        ${weight ? `<span class="pet-chip">⚖️ ${weight}</span>` : ''}
        <span class="pet-chip">💉 ${(pet.vaccinations||[]).length}</span>
        <span class="pet-chip">💊 ${(pet.medications||[]).length}</span>
        ${alerts > 0 ? `<span class="pet-chip alert">⚡ ${alerts}</span>` : ''}
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
  const pet = getPets().find(p => p.id === id);
  if (!pet) { showView('dashboard'); return; }

  const age = calcAge(pet.dob);
  document.getElementById('pet-header').innerHTML = `
    <div class="pet-header__avatar">${petAvatarHTML(pet, 72)}</div>
    <div class="pet-header__info">
      <h1>${esc(pet.name)}</h1>
      <div class="pet-header__meta">${[translateSpecies(pet.species), pet.breed, translateGender(pet.gender), age].filter(Boolean).join(' · ')}</div>
    </div>
    <div class="pet-header__actions">
      <button class="btn btn--ghost btn--sm" onclick="editPet('${pet.id}')">${t('editBtn')}</button>
      <button class="btn btn--danger btn--sm" onclick="confirmDeletePet('${pet.id}')">${t('deleteBtn')}</button>
    </div>`;

  // Sync tab labels
  document.querySelectorAll('.tab[data-tab]').forEach(tb => {
    const key = 'tab' + tb.dataset.tab.charAt(0).toUpperCase() + tb.dataset.tab.slice(1);
    if (t(key) !== key) tb.textContent = t(key);
  });

  renderTab(state.currentTab, pet);

  document.querySelectorAll('.tab').forEach(tb => {
    tb.classList.toggle('active', tb.dataset.tab === state.currentTab);
  });
}

function switchTab(tab) {
  state.currentTab = tab;
  document.querySelectorAll('.tab').forEach(tb => {
    tb.classList.toggle('active', tb.dataset.tab === tab);
  });
  document.querySelectorAll('.tab-panel').forEach(p => {
    p.classList.toggle('active', p.id === 'panel-' + tab);
    p.classList.toggle('hidden',  p.id !== 'panel-' + tab);
  });
  const pet = getPets().find(p => p.id === state.currentPetId);
  if (pet) renderTab(tab, pet);
}

function renderTab(tab, pet) {
  document.querySelectorAll('.tab-panel').forEach(p => {
    const isActive = p.id === 'panel-' + tab;
    p.classList.toggle('active', isActive);
    p.classList.toggle('hidden', !isActive);
  });
  if (tab === 'overview')     renderOverview(pet);
  if (tab === 'weight')       renderWeightTab(pet);
  if (tab === 'vaccinations') renderVaccTab(pet);
  if (tab === 'medications')  renderMedTab(pet);
  if (tab === 'vet')          renderVetTab(pet);
}

/* --- Overview --- */
function renderOverview(pet) {
  const age    = calcAge(pet.dob);
  const weight = lastWeight(pet);

  document.getElementById('overview-info').innerHTML = `
    <h3>${t('petInfoSection')}</h3>
    <div class="info-grid">
      <div class="info-item"><div class="info-item__label">${t('labelNameInfo')}</div><div class="info-item__value">${esc(pet.name)}</div></div>
      <div class="info-item"><div class="info-item__label">${t('labelSpecies')}</div><div class="info-item__value">${esc(translateSpecies(pet.species)||'—')}</div></div>
      <div class="info-item"><div class="info-item__label">${t('labelBreed')}</div><div class="info-item__value">${esc(pet.breed||'—')}</div></div>
      <div class="info-item"><div class="info-item__label">${t('labelGender')}</div><div class="info-item__value">${esc(translateGender(pet.gender)||'—')}</div></div>
      <div class="info-item"><div class="info-item__label">${t('labelAge')}</div><div class="info-item__value">${age||'—'}</div></div>
      <div class="info-item"><div class="info-item__label">${t('labelWeight')}</div><div class="info-item__value">${weight||'—'}</div></div>
      <div class="info-item"><div class="info-item__label">${t('labelColour')}</div><div class="info-item__value">${esc(pet.color||'—')}</div></div>
      <div class="info-item"><div class="info-item__label">${t('labelMicrochip')}</div><div class="info-item__value">${esc(pet.microchip||'—')}</div></div>
      ${pet.notes ? `<div class="info-item" style="grid-column:1/-1"><div class="info-item__label">${t('notesLabel')}</div><div class="info-item__value">${esc(pet.notes)}</div></div>` : ''}
    </div>`;

  const upcoming = [];
  (pet.vaccinations || []).forEach(v => {
    if (v.nextDue) {
      const d = daysUntil(v.nextDue);
      if (d !== null && d <= 60) upcoming.push({ icon: '💉', label: v.name + ' ' + t('reminderBooster'), days: d });
    }
  });
  if (pet.vet && pet.vet.nextAppt) {
    const d = daysUntil(pet.vet.nextAppt);
    if (d !== null && d <= 60) upcoming.push({ icon: '🏥', label: t('vetAppt'), days: d });
  }
  upcoming.sort((a, b) => a.days - b.days);

  document.getElementById('overview-upcoming').innerHTML = `
    <h3>${t('upcomingSection')}</h3>
    ${upcoming.length === 0
      ? `<p style="color:var(--muted);font-size:.85rem;">${t('noReminders')}</p>`
      : `<div class="upcoming-list">${upcoming.map(u => `
          <div class="upcoming-item">
            <span>${u.icon}</span>
            <span>${esc(u.label)}</span>
            <span class="badge-days ${u.days <= 7 ? 'urgent' : ''}">${u.days <= 0 ? t('statusOverdue') : t('statusIn', { n: u.days })}</span>
          </div>`).join('')}
        </div>`}`;
}

/* --- Weight tab --- */
function renderWeightTab(pet) {
  const weights = (pet.weights || []).slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  const tbody   = document.getElementById('weight-tbody');
  const empty   = document.getElementById('weight-empty');
  const wrap    = document.getElementById('weight-chart-wrap');

  // Update button text
  document.querySelector('#panel-weight .btn--primary').innerHTML = `<span>${t('addEntry')}</span>`;

  if (weights.length === 0) {
    wrap.classList.add('hidden');
    empty.classList.remove('hidden');
    tbody.innerHTML = '';
    return;
  }

  wrap.classList.remove('hidden');
  empty.classList.add('hidden');

  tbody.innerHTML = [...weights].reverse().map(w => `
    <tr>
      <td>${formatDate(w.date)}</td>
      <td><strong>${w.value} ${w.unit}</strong></td>
      <td style="color:var(--muted)">${esc(w.notes||'')}</td>
      <td><button class="btn btn--danger" onclick="deleteRecord('${pet.id}','weight','${w.id}')">✕</button></td>
    </tr>`).join('');

  drawWeightChart(weights);
}

function drawWeightChart(weights) {
  const svg = document.getElementById('weight-chart');
  const W   = svg.clientWidth || 600;
  const H   = 160;
  const pL = 44, pR = 16, pT = 16, pB = 32;
  const cW  = W - pL - pR;
  const cH  = H - pT - pB;

  const vals  = weights.map(w => parseFloat(w.value));
  const minV  = Math.min(...vals) * 0.95;
  const maxV  = Math.max(...vals) * 1.05;
  const range = maxV - minV || 1;

  const toX = i => pL + (i / (weights.length - 1 || 1)) * cW;
  const toY = v => pT + cH - ((v - minV) / range) * cH;

  const pts  = weights.map((w, i) => `${toX(i)},${toY(parseFloat(w.value))}`).join(' ');
  const area = `${pL},${pT + cH} ${pts} ${toX(weights.length - 1)},${pT + cH}`;

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
    <text class="chart-label" x="${pL - 6}" y="${pT + 4}" text-anchor="end">${maxV.toFixed(1)}</text>
    <text class="chart-label" x="${pL - 6}" y="${pT + cH}" text-anchor="end">${minV.toFixed(1)}</text>`;
}

/* --- Vaccination tab --- */
function renderVaccTab(pet) {
  const vaccs = pet.vaccinations || [];
  const tbody = document.getElementById('vacc-tbody');
  const empty = document.getElementById('vacc-empty');
  const table = document.getElementById('vacc-table');

  document.querySelector('#panel-vaccinations .btn--primary').innerHTML = `<span>${t('addVacc')}</span>`;

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
      `<span class="status-pill status-pill--${status}">${days < 0 ? t('statusOverdue') : days === 0 ? t('statusToday') : t('statusIn', { n: days })}</span>`;
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

  document.querySelector('#panel-medications .btn--primary').innerHTML = `<span>${t('addMed')}</span>`;

  if (meds.length === 0) {
    table.classList.add('hidden');
    empty.classList.remove('hidden');
    return;
  }

  table.classList.remove('hidden');
  empty.classList.add('hidden');

  tbody.innerHTML = [...meds].reverse().map(m => {
    const today  = new Date().toISOString().split('T')[0];
    const active = !m.endDate || m.endDate >= today;
    return `
    <tr>
      <td><strong>${esc(m.name)}</strong><br/><span class="status-pill status-pill--${active?'active':'ok'}">${active ? t('activeStatus') : t('completedStatus')}</span></td>
      <td>${esc(m.dosage)}</td>
      <td>${esc(m.frequency)}</td>
      <td>${m.startDate ? formatDate(m.startDate) : '—'}</td>
      <td>${m.endDate   ? formatDate(m.endDate)   : '—'}</td>
      <td style="color:var(--muted)">${esc(m.notes||'')}</td>
      <td><button class="btn btn--danger" onclick="deleteRecord('${pet.id}','medication','${m.id}')">✕</button></td>
    </tr>`;
  }).join('');
}

/* --- Vet tab --- */
function renderVetTab(pet) {
  const vet = pet.vet || {};
  document.getElementById('vet-clinic').value      = vet.clinicName  || '';
  document.getElementById('vet-doctor').value      = vet.doctorName  || '';
  document.getElementById('vet-phone').value       = vet.phone       || '';
  document.getElementById('vet-email').value       = vet.email       || '';
  document.getElementById('vet-address').value     = vet.address     || '';
  document.getElementById('vet-last-visit').value  = vet.lastVisit   || '';
  document.getElementById('vet-next-appt').value   = vet.nextAppt    || '';
  document.getElementById('vet-notes').value       = vet.notes       || '';
  applyTranslations();
}

function handleVetForm(e) {
  e.preventDefault();
  const pets = getPets();
  const pet  = pets.find(p => p.id === state.currentPetId);
  if (!pet) return;

  pet.vet = {
    clinicName: document.getElementById('vet-clinic').value.trim(),
    doctorName: document.getElementById('vet-doctor').value.trim(),
    phone:      document.getElementById('vet-phone').value.trim(),
    email:      document.getElementById('vet-email').value.trim(),
    address:    document.getElementById('vet-address').value.trim(),
    lastVisit:  document.getElementById('vet-last-visit').value || null,
    nextAppt:   document.getElementById('vet-next-appt').value || null,
    notes:      document.getElementById('vet-notes').value.trim(),
  };

  savePets(pets);
  toast(t('toastVetSaved'), 'success');
}

/* ===========================
   Pet CRUD
   =========================== */
function setupPetForm(editId) {
  const form      = document.getElementById('pet-form');
  const title     = document.getElementById('pet-form-title');
  const submitBtn = document.getElementById('pet-form-submit');
  state.pendingPhoto = undefined;
  form.reset();
  showPhotoPreview(null);

  if (editId) {
    const pet = getPets().find(p => p.id === editId);
    if (!pet) return;
    title.textContent      = t('saveChanges').replace('Save', 'Edit'); // fallback
    title.textContent      = (currentLang === 'no' ? 'Rediger ' : 'Edit ') + pet.name;
    submitBtn.textContent  = t('saveChanges');

    document.getElementById('pet-name').value      = pet.name      || '';
    document.getElementById('pet-species').value   = pet.species   || '';
    document.getElementById('pet-breed').value     = pet.breed     || '';
    document.getElementById('pet-gender').value    = pet.gender    || '';
    document.getElementById('pet-dob').value       = pet.dob       || '';
    document.getElementById('pet-color').value     = pet.color     || '';
    document.getElementById('pet-microchip').value = pet.microchip || '';
    document.getElementById('pet-notes').value     = pet.notes     || '';

    if (pet.photo) {
      state.pendingPhoto = pet.photo;
      showPhotoPreview(pet.photo);
    } else {
      document.getElementById('photo-preview-emoji').textContent = speciesEmoji(pet.species);
    }

    document.getElementById('pet-form-back').onclick = () => {
      state.editingPetId = null;
      showView('pet');
    };
    document.getElementById('pet-cancel-btn').onclick = () => {
      state.editingPetId = null;
      showView('pet');
    };
  } else {
    title.textContent     = t('addPetTitle');
    submitBtn.textContent = t('savePet');
    document.getElementById('photo-preview-emoji').textContent = '🐾';
    document.getElementById('pet-form-back').onclick = () => showView('dashboard');
    document.getElementById('pet-cancel-btn').onclick = () => showView('dashboard');
  }

  applyTranslations();
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

  // Photo: undefined = no change, null = remove, string = new
  if (state.pendingPhoto !== undefined) data.photo = state.pendingPhoto;

  let pets = getPets();

  if (state.editingPetId) {
    pets = pets.map(p => p.id === state.editingPetId ? { ...p, ...data } : p);
    savePets(pets);
    toast(t('toastUpdated', { name: data.name }), 'success');
    state.currentPetId = state.editingPetId;
    state.editingPetId = null;
    showView('pet');
  } else {
    const pet = {
      id: uid(), userId: state.user.id, ...data,
      weights: [], vaccinations: [], medications: [], vet: {},
      createdAt: Date.now(),
    };
    pets.push(pet);
    savePets(pets);
    toast(t('toastAdded', { name: data.name }), 'success');
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
  if (!confirm(t('confirmDeletePet', { name: pet.name }))) return;
  savePets(getPets().filter(p => p.id !== id));
  toast(t('toastRemoved', { name: pet.name }), 'success');
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
    pet.weights = pet.weights || [];
    pet.weights.push({
      id: uid(),
      date:  document.getElementById('w-date').value,
      value: parseFloat(document.getElementById('w-value').value),
      unit:  document.getElementById('w-unit').value,
      notes: document.getElementById('w-notes').value.trim(),
    });
  }

  if (type === 'vaccination') {
    pet.vaccinations = pet.vaccinations || [];
    pet.vaccinations.push({
      id:        uid(),
      name:      document.getElementById('v-name').value.trim(),
      dateGiven: document.getElementById('v-given').value,
      nextDue:   document.getElementById('v-due').value || null,
      notes:     document.getElementById('v-notes').value.trim(),
    });
  }

  if (type === 'medication') {
    pet.medications = pet.medications || [];
    pet.medications.push({
      id:        uid(),
      name:      document.getElementById('m-name').value.trim(),
      dosage:    document.getElementById('m-dosage').value.trim(),
      frequency: document.getElementById('m-frequency').value.trim(),
      startDate: document.getElementById('m-start').value || null,
      endDate:   document.getElementById('m-end').value   || null,
      notes:     document.getElementById('m-notes').value.trim(),
    });
  }

  savePets(pets);
  hideModal();
  toast(t('toastSaved'), 'success');
  renderTab(state.currentTab, pet);
}

function deleteRecord(petId, type, recordId) {
  if (!confirm(t('confirmDeleteRecord'))) return;
  const pets = getPets();
  const pet  = pets.find(p => p.id === petId);
  if (!pet) return;

  if (type === 'weight')      pet.weights      = (pet.weights      || []).filter(r => r.id !== recordId);
  if (type === 'vaccination') pet.vaccinations = (pet.vaccinations || []).filter(r => r.id !== recordId);
  if (type === 'medication')  pet.medications  = (pet.medications  || []).filter(r => r.id !== recordId);

  savePets(pets);
  toast(t('toastDeleted'), 'success');
  renderTab(state.currentTab, pet);
}

/* ===========================
   Modals
   =========================== */
function showModal(type) {
  document.getElementById('modal-backdrop').classList.remove('hidden');
  document.getElementById('modal-' + type).classList.remove('hidden');
  applyTranslations();
  const today = new Date().toISOString().split('T')[0];
  const dateInputs = document.querySelectorAll('#modal-' + type + ' input[type="date"]');
  dateInputs.forEach(el => { if (!el.value) el.value = today; });
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
  toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
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
  const now = new Date(); now.setHours(0,0,0,0);
  return Math.round((new Date(iso) - now) / 86400000);
}

function calcAge(dob) {
  if (!dob) return null;
  const months = Math.floor((new Date() - new Date(dob)) / (1000 * 60 * 60 * 24 * 30.44));
  if (months < 1)  return t('justBorn');
  if (months < 24) return t('monthsOld', { n: months });
  return t('yearsOld', { n: Math.floor(months / 12) });
}

function lastWeight(pet) {
  const ws = pet.weights || [];
  if (!ws.length) return null;
  const last = ws[ws.length - 1];
  return `${last.value} ${last.unit}`;
}

function upcomingCount(pet) {
  let n = (pet.vaccinations || []).filter(v => { if (!v.nextDue) return false; const d = daysUntil(v.nextDue); return d !== null && d <= 30; }).length;
  if (pet.vet && pet.vet.nextAppt) { const d = daysUntil(pet.vet.nextAppt); if (d !== null && d <= 30) n++; }
  return n;
}

function speciesEmoji(species) {
  return { Dog:'🐶', Cat:'🐱', Rabbit:'🐰', Bird:'🐦', Other:'🐾' }[species] || '🐾';
}

function translateSpecies(species) {
  const map = { Dog: t('speciesDog'), Cat: t('speciesCat'), Rabbit: t('speciesRabbit'), Bird: t('speciesBird'), Other: t('speciesOther') };
  return map[species] || species || '';
}

function translateGender(gender) {
  const map = { Male: t('genderMale'), Female: t('genderFemale'), '': t('genderUnknown') };
  return map[gender] !== undefined ? map[gender] : (gender || '');
}

function petAvatarHTML(pet, size) {
  if (pet.photo) {
    return `<img src="${pet.photo}" alt="${esc(pet.name)}" style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;display:block;" />`;
  }
  return speciesEmoji(pet.species);
}

function showError(el, msg) {
  el.textContent = msg;
  el.classList.remove('hidden');
}
