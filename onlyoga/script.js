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
  '.hero__inner, .about__text, .about__feature-wrap, .feature-card, .section__header, .class-card, .schedule__table-wrap, .contact__info, .contact__form-wrap'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const isGrid = entry.target.closest('.classes__grid');
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
  name:  { el: document.getElementById('name'),  error: document.getElementById('name-error') },
  email: { el: document.getElementById('email'), error: document.getElementById('email-error') },
};

function validateField(key) {
  const { el, error } = fields[key];
  let msg = '';
  if (!el.value.trim()) {
    msg = 'This field is required.';
  } else if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
    msg = 'Please enter a valid email.';
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
  submitBtn.textContent = 'Sending…';
  statusEl.className = 'form__status';
  statusEl.textContent = '';

  try {
    await new Promise(resolve => setTimeout(resolve, 1200)); // replace with real fetch()
    statusEl.textContent = 'Thanks! We\'ll be in touch soon.';
    statusEl.className = 'form__status success';
    form.reset();
    Object.keys(fields).forEach(k => fields[k].el.classList.remove('invalid'));
  } catch {
    statusEl.textContent = 'Something went wrong. Please email us directly.';
    statusEl.className = 'form__status error';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Reserve My Spot';
  }
});

/* ===========================
   Footer year
   =========================== */
document.getElementById('year').textContent = new Date().getFullYear();
