/* ===========================
   Navigation
   =========================== */
const navToggle = document.querySelector('.nav__toggle');
const navLinks  = document.querySelector('.nav__links');
const allNavLinks = document.querySelectorAll('.nav__links a');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});

// Close menu when a link is clicked
allNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ===========================
   Active nav link on scroll
   =========================== */
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const top    = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav__links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < bottom);
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

/* ===========================
   Scroll reveal
   =========================== */
const revealEls = document.querySelectorAll(
  '.hero__content, .card, .form, .section__title, .section__subtitle'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger cards within a grid
      const delay = entry.target.closest('.projects__grid')
        ? [...entry.target.parentElement.children].indexOf(entry.target) * 80
        : 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ===========================
   Contact form
   =========================== */
const form = document.getElementById('contact-form');

if (form) {
  const submitBtn  = document.getElementById('submit-btn');
  const statusEl   = document.getElementById('form-status');

  const fields = {
    name:    { el: document.getElementById('name'),    error: document.getElementById('name-error') },
    email:   { el: document.getElementById('email'),   error: document.getElementById('email-error') },
    message: { el: document.getElementById('message'), error: document.getElementById('message-error') },
  };

  function validateField(key) {
    const { el, error } = fields[key];
    let msg = '';

    if (!el.value.trim()) {
      msg = 'This field is required.';
    } else if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
      msg = 'Please enter a valid email address.';
    } else if (key === 'message' && el.value.trim().length < 10) {
      msg = 'Message must be at least 10 characters.';
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
      await new Promise((resolve) => setTimeout(resolve, 1200));
      statusEl.textContent = 'Message sent! I\'ll get back to you soon.';
      statusEl.className = 'form__status success';
      form.reset();
      Object.keys(fields).forEach(k => fields[k].el.classList.remove('invalid'));
    } catch (err) {
      statusEl.textContent = 'Something went wrong. Please try again or email me directly.';
      statusEl.className = 'form__status error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}

/* ===========================
   Footer year
   =========================== */
document.getElementById('year').textContent = new Date().getFullYear();
