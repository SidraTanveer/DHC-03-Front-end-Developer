// Add event listener to portfolio text
const portfolioText = document.querySelector('.header-left h1 span');

portfolioText.addEventListener('click', () => {
  portfolioText.style.color = '#4e086c';
  setTimeout(() => {
    portfolioText.style.color = '#8222c7';
  }, 500);
});
// Navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Smooth scrolling
const links = document.querySelectorAll('.nav-links a');

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const id = link.getAttribute('href');
    const section = document.querySelector(id);
    section.scrollIntoView({ behavior: 'smooth' });
  });
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
const formData = new FormData(contactForm);

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch('/contact', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
});