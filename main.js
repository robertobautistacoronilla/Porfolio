document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links (polyfill support if needed, though CSS does most)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    // Lightbox Functionality
    // Inject Lightbox HTML
    const lightboxHTML = `
        <div id="lightbox" class="lightbox">
            <span class="lightbox-close">&times;</span>
            <img src="" alt="Zoomed Image">
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    // Open Lightbox
    const images = document.querySelectorAll('.grid-item img'); // Changed from .gallery-grid img to .grid-item img to match existing
    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Disable scroll
        });
    });

    // Close Lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Enable scroll
    };

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Apple-style Reveal Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before element is fully in view
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing once visible for performance (optional, but good for one-off animations)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal-up, .reveal-zoom').forEach(el => {
        observer.observe(el);
    });

    // Parallax Effect for Hero
    const heroContent = document.querySelector('.hero-content');
    const heroSection = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        // Only parallax if hero is visible
        if (scrolled < heroSection.offsetHeight) {
            // Move content down slower than scroll (parallax) and fade out
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    });


});
