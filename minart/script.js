document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    // Initialize GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    console.log('GSAP plugins registered');

    // Dynamic gallery population
    const galleryData = [
        { src: 'https://via.placeholder.com/400x300', title: 'Artwork 1', description: 'Description of Artwork 1' },
        { src: 'https://via.placeholder.com/400x300', title: 'Artwork 2', description: 'Description of Artwork 2' },
        { src: 'https://via.placeholder.com/400x300', title: 'Artwork 3', description: 'Description of Artwork 3' },
        { src: 'https://via.placeholder.com/400x300', title: 'Artwork 4', description: 'Description of Artwork 4' },
        { src: 'https://via.placeholder.com/400x300', title: 'Artwork 5', description: 'Description of Artwork 5' },
        { src: 'https://via.placeholder.com/400x300', title: 'Artwork 6', description: 'Description of Artwork 6' },
    ];

    const gallery = document.querySelector('.gallery');
    galleryData.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        galleryItem.innerHTML = `
            <img src="${item.src}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;
        gallery.appendChild(galleryItem);
        console.log(`Added gallery item ${index + 1}`);
    });

    // Header animations
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo');
    const navItems = document.querySelectorAll('nav ul li');

    gsap.from(logo, { duration: 1, y: -50, opacity: 0, ease: "power3.out" });
    gsap.from(navItems, { 
        duration: 0.5, 
        opacity: 0, 
        y: -20, 
        stagger: 0.1, 
        ease: "power3.out",
        delay: 0.5
    });
    console.log('Header animations applied');

    // Enhanced particle animation
    const heroSection = document.querySelector('.hero');
    const particleCount = window.innerWidth < 768 ? 50 : 100;

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = gsap.utils.random(3, 8);
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        const startX = gsap.utils.random(0, window.innerWidth);
        const startY = -20; // Start above the viewport
        
        gsap.set(particle, { x: startX, y: startY });
        
        heroSection.appendChild(particle);
        console.log(`Particle created at (${startX}, ${startY}) with size ${size}px`);
        
        animateParticle(particle);
    }

    function animateParticle(particle) {
        const duration = gsap.utils.random(5, 15);
        const endX = gsap.utils.random(-100, 100);
        
        gsap.to(particle, {
            duration: duration,
            x: `+=${endX}`,
            y: window.innerHeight + 20,
            ease: "none",
            onComplete: () => {
                particle.remove();
                createParticle(); // Create a new particle to replace this one
            }
        });

        gsap.to(particle, {
            duration: gsap.utils.random(1, 3),
            opacity: gsap.utils.random(0.3, 0.8),
            repeat: -1,
            yoyo: true
        });
    }

    // Create initial set of particles
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    console.log(`Created ${particleCount} initial particles`);

    // Adjust particle animation on window resize
    window.addEventListener('resize', () => {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            gsap.killTweensOf(particle);
            particle.remove();
        });

        const newParticleCount = window.innerWidth < 768 ? 50 : 100;
        for (let i = 0; i < newParticleCount; i++) {
            createParticle();
        }
        console.log(`Window resized. Created ${newParticleCount} new particles`);
    });

    // Scroll animations
    gsap.utils.toArray('.section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 20%",
                scrub: 1
            }
        });
    });

    console.log('All scripts executed successfully');
});
