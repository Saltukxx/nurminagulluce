document.addEventListener('DOMContentLoaded', (event) => {
  // Masonry layout
  const grid = document.querySelector('.masonry-grid');
  const masonry = new Masonry(grid, {
    itemSelector: '.gallery-img',
    columnWidth: '.gallery-img',
    gutter: 20
  });

  // Lightbox functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const close = document.getElementsByClassName('close')[0];
  
  document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('click', () => {
      lightbox.style.display = 'block';
      lightboxImg.src = img.src;
    });
  });

  close.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });

  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.gallery-img').forEach((img, i) => {
    gsap.from(img, {
      scrollTrigger: {
        trigger: img,
        start: 'top bottom',
        end: 'bottom top',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 1,
      delay: i * 0.2
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Form submission animation
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    gsap.to(form, {opacity: 0, y: -50, duration: 0.5, onComplete: () => {
      form.reset();
      gsap.to(form, {opacity: 1, y: 0, duration: 0.5, delay: 0.5});
    }});
    // Add your form submission logic here
  });
});