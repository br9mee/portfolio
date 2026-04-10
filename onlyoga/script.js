/* ===========================
   i18n
   =========================== */
const LANG = {
  en: {
    navAbout:       'About',
    navClasses:     'Classes',
    navInstructors: 'Instructors',
    navContact:     'Contact',
    navCta:         'Get Started',
    heroTag:        'Online · Anytime · Anywhere',
    heroTitle1:     'Yoga at home,',
    heroTitle2:     'without compromise.',
    heroSub:        'Master the 26 Bikram postures at home, flow through Vinyasa, or unwind with Yin and Calm — guided by two experienced instructors, available anytime.',
    heroBtn1:       'Explore Classes',
    heroBtn2:       'Meet the Instructors',
    heroScroll:     'scroll',
    aboutLabel:     'Our Platform',
    aboutTitle1:    'Real yoga,',
    aboutTitle2:    'wherever you are.',
    aboutP1:        'Onlyoga brings expert-led yoga straight to your living room. Whether you\'re working through the 26 Bikram postures, flowing through a Vinyasa sequence, or settling into a deep Yin hold — your practice is always within reach.',
    aboutP2:        'Two experienced instructors. Every style, from beginner-friendly Calm sessions to advanced flows. No studio required.',
    aboutBtn:       'See All Classes',
    feat1Num:       '01',
    feat1Title:     'On Demand',
    feat1Desc:      'Every class is available whenever you need it. Morning Bikram, lunchtime Yin, evening Calm — your schedule, your pace.',
    feat2Num:       '02',
    feat2Title:     'Expert Instructors',
    feat2Desc:      'Two certified instructors bring years of experience to every session, with clear guidance and thoughtful cues.',
    feat3Num:       '03',
    feat3Title:     'Every Style',
    feat3Desc:      'From the structured heat of Bikram to the deep stillness of Yin — six class types to suit every mood and level.',
    classesLabel:   'What We Offer',
    classesTitle:   'Find your practice.',
    bikramName:     'Bikram',
    bikramDesc:     'The classic 26-posture series — guided step by step, with full walkthroughs of each pose and its benefits.',
    bikramLevel:    'All levels',
    vinyasaName:    'Vinyasa Flow',
    vinyasaDesc:    'Dynamic movement synchronized with breath. Creative sequencing that challenges and energises.',
    vinyasaLevel:   'Intermediate',
    yinName:        'Yin',
    yinDesc:        'Long, passive holds that release deep connective tissue. Meditative, restorative, deeply calming.',
    yinLevel:       'All levels',
    calmName:       'Calm',
    calmDesc:       'Gentle, accessible yoga for stress relief, recovery, and slowing down. Perfect for tired days or complete beginners.',
    calmLevel:      'Beginner',
    meditationName: 'Meditation',
    meditationDesc: 'Guided stillness. Learn to settle the mind and find clarity through breath and presence.',
    meditationLevel:'All levels',
    advancedName:   'Advanced Flow',
    advancedDesc:   'A demanding, energetic series that builds discipline, heat, and a powerful mind-body connection.',
    advancedLevel:  'Advanced',
    instrLabel:     'Your Guides',
    instrTitle:     'Meet the instructors.',
    instr1Name:     'Astrid Moen',
    instr1Role:     'Bikram & Vinyasa',
    instr1Bio:      'With over twelve years on the mat, Astrid specialises in Bikram and dynamic Vinyasa flows. Her classes are warm, precise, and deeply motivating — she guides you through every posture with clarity and care.',
    instr2Name:     'Lena Bakke',
    instr2Role:     'Yin & Restorative',
    instr2Bio:      'Lena brings a calm, nurturing energy to every session. Her Yin and Calm classes are known for their depth, care, and ability to leave you completely at ease — no matter where you start.',
    contactLabel:   'Get In Touch',
    contactTitle:   'Start your journey.',
    contactSub:     'Have a question or want to try a free class? We\'d love to hear from you.',
    contactAvail:   'Available worldwide, online',
    contactHours:   'Classes available 24/7',
    formTitle:      'Book a free class',
    formName:       'Name',
    formNamePh:     'Your name',
    formEmail:      'Email',
    formEmailPh:    'your@email.com',
    formStyle:      'Preferred Style',
    formStylePh:    '— Select a style —',
    formMessage:    'Message (optional)',
    formMessagePh:  'Any questions for us?',
    formSubmit:     'Reserve My Spot',
    formNameErr:    'Please enter your name.',
    formEmailErr:   'Please enter a valid email.',
    formSuccess:    'Thanks! We\'ll be in touch soon.',
    formError:      'Something went wrong. Please email us directly.',
    formSending:    'Sending…',
    footerCopy:     'Onlyoga. All rights reserved.',
  },
  no: {
    navAbout:       'Om oss',
    navClasses:     'Timer',
    navInstructors: 'Instruktører',
    navContact:     'Kontakt',
    navCta:         'Kom i gang',
    heroTag:        'Online · Når som helst · Hvor som helst',
    heroTitle1:     'Yoga hjemme,',
    heroTitle2:     'uten kompromiss.',
    heroSub:        'Mestre de 26 Bikram-posisjonene hjemme, flyt gjennom Vinyasa, eller slapp av med Yin og Rolig — veiledet av to erfarne instruktører, tilgjengelig når som helst.',
    heroBtn1:       'Utforsk timer',
    heroBtn2:       'Møt instruktørene',
    heroScroll:     'rull',
    aboutLabel:     'Vår plattform',
    aboutTitle1:    'Ekte yoga,',
    aboutTitle2:    'uansett hvor du er.',
    aboutP1:        'Onlyoga bringer ekspertledet yoga rett inn i stuen din. Enten du jobber deg gjennom de 26 Bikram-posisjonene, flyter gjennom en Vinyasa-sekvens, eller senker deg ned i et dypt Yin-hold — er praksisen din alltid innen rekkevidde.',
    aboutP2:        'To erfarne instruktører. Alle stiler, fra nybegynnervennlige Rolig-timer til avanserte flyter. Inget studio nødvendig.',
    aboutBtn:       'Se alle timer',
    feat1Num:       '01',
    feat1Title:     'På forespørsel',
    feat1Desc:      'Alle timer er tilgjengelige når du trenger dem. Bikram om morgenen, Yin til lunsj, Rolig om kvelden — din timeplan, ditt tempo.',
    feat2Num:       '02',
    feat2Title:     'Erfarne instruktører',
    feat2Desc:      'To sertifiserte instruktører bringer årevis med erfaring til hver økt, med tydelig veiledning og gjennomtenkte instruksjoner.',
    feat3Num:       '03',
    feat3Title:     'Alle stiler',
    feat3Desc:      'Fra den strukturerte varmen i Bikram til den dype stillheten i Yin — seks timtyper for alle stemninger og nivåer.',
    classesLabel:   'Hva vi tilbyr',
    classesTitle:   'Finn din praksis.',
    bikramName:     'Bikram',
    bikramDesc:     'Den klassiske serien med 26 posisjoner — veiledet steg for steg, med komplette gjennomganger av hver pose og dens fordeler.',
    bikramLevel:    'Alle nivåer',
    vinyasaName:    'Vinyasa Flow',
    vinyasaDesc:    'Dynamisk bevegelse synkronisert med pust. Kreative sekvenser som utfordrer og gir energi.',
    vinyasaLevel:   'Mellomnivå',
    yinName:        'Yin',
    yinDesc:        'Lange, passive hold som frigjør dypt bindevev. Meditativt, gjenopprettende, dypt beroligende.',
    yinLevel:       'Alle nivåer',
    calmName:       'Rolig',
    calmDesc:       'Skånsom, tilgjengelig yoga for stressavlastning, restitusjon og nedprioritering. Perfekt for slitne dager eller nybegynnere.',
    calmLevel:      'Nybegynner',
    meditationName: 'Meditasjon',
    meditationDesc: 'Veiledet stillhet. Lær å roe sinnet og finne klarhet gjennom pust og nærvær.',
    meditationLevel:'Alle nivåer',
    advancedName:   'Avansert flyt',
    advancedDesc:   'En krevende, energisk serie som bygger disiplin, varme og en kraftfull forbindelse mellom kropp og sinn.',
    advancedLevel:  'Avansert',
    instrLabel:     'Dine veiledere',
    instrTitle:     'Møt instruktørene.',
    instr1Name:     'Astrid Moen',
    instr1Role:     'Bikram & Vinyasa',
    instr1Bio:      'Med over tolv år på matten spesialiserer Astrid seg på Bikram og dynamiske Vinyasa-flyter. Timene hennes er varme, presise og dypt motiverende — hun veileder deg gjennom hver posisjon med klarhet og omsorg.',
    instr2Name:     'Lena Bakke',
    instr2Role:     'Yin & Restorativ',
    instr2Bio:      'Lena bringer en rolig, omsorgsfull energi til hver økt. Hennes Yin- og Rolig-timer er kjent for sin dybde, omsorg og evne til å etterlate deg helt avslappet — uansett hvor du starter.',
    contactLabel:   'Ta kontakt',
    contactTitle:   'Start din reise.',
    contactSub:     'Har du spørsmål eller ønsker å prøve en gratis time? Vi hører gjerne fra deg.',
    contactAvail:   'Tilgjengelig globalt, online',
    contactHours:   'Timer tilgjengelig 24/7',
    formTitle:      'Book en gratis time',
    formName:       'Navn',
    formNamePh:     'Ditt navn',
    formEmail:      'E-post',
    formEmailPh:    'din@epost.no',
    formStyle:      'Foretrukket stil',
    formStylePh:    '— Velg en stil —',
    formMessage:    'Melding (valgfritt)',
    formMessagePh:  'Noen spørsmål til oss?',
    formSubmit:     'Reserver plassen min',
    formNameErr:    'Vennligst skriv inn navnet ditt.',
    formEmailErr:   'Vennligst skriv inn en gyldig e-postadresse.',
    formSuccess:    'Takk! Vi tar kontakt snart.',
    formError:      'Noe gikk galt. Send oss en e-post direkte.',
    formSending:    'Sender…',
    footerCopy:     'Onlyoga. Alle rettigheter forbeholdt.',
  }
};

let currentLang = localStorage.getItem('onlyoga_lang') || 'en';

function t(key) {
  return LANG[currentLang][key] || LANG.en[key] || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPh);
  });
  document.documentElement.lang = currentLang;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('onlyoga_lang', lang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  applyTranslations();
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

// Set initial active state and apply translations on load
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.classList.toggle('active', btn.dataset.lang === currentLang);
});
applyTranslations();

/* ===========================
   Navigation
   =========================== */
const navToggle = document.querySelector('.nav__toggle');
const navLinks  = document.querySelector('.nav__links');
const allLinks  = document.querySelectorAll('.nav__links a');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});

allLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

/* ===========================
   Scroll reveal
   =========================== */
const revealEls = document.querySelectorAll(
  '.hero__inner, .about__text, .about__feature-wrap, .feature-card, .section__header, .class-card, .instructor-card, .contact__info, .contact__form-wrap'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const isGrid = entry.target.closest('.classes__grid') || entry.target.closest('.instructors__grid');
      const delay = isGrid
        ? [...entry.target.parentElement.children].indexOf(entry.target) * 80
        : 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

/* ===========================
   Contact form
   =========================== */
const form      = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const statusEl  = document.getElementById('form-status');

const fields = {
  name:  { el: document.getElementById('name'),  error: document.getElementById('name-error'),  errKey: 'formNameErr' },
  email: { el: document.getElementById('email'), error: document.getElementById('email-error'), errKey: 'formEmailErr' },
};

function validateField(key) {
  const { el, error, errKey } = fields[key];
  let msg = '';
  if (!el.value.trim()) {
    msg = t(errKey);
  } else if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
    msg = t(errKey);
  }
  error.textContent = msg;
  el.classList.toggle('invalid', !!msg);
  return !msg;
}

Object.keys(fields).forEach(key => {
  fields[key].el.addEventListener('blur', () => validateField(key));
  fields[key].el.addEventListener('input', () => {
    if (fields[key].el.classList.contains('invalid')) validateField(key);
  });
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const valid = Object.keys(fields).map(validateField).every(Boolean);
  if (!valid) return;

  submitBtn.disabled = true;
  submitBtn.textContent = t('formSending');
  statusEl.className = 'form__status';
  statusEl.textContent = '';

  try {
    await new Promise(resolve => setTimeout(resolve, 1200)); // replace with real fetch()
    statusEl.textContent = t('formSuccess');
    statusEl.className = 'form__status success';
    form.reset();
    Object.keys(fields).forEach(k => fields[k].el.classList.remove('invalid'));
  } catch {
    statusEl.textContent = t('formError');
    statusEl.className = 'form__status error';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = t('formSubmit');
  }
});

/* ===========================
   Footer year
   =========================== */
document.getElementById('year').textContent = new Date().getFullYear();
