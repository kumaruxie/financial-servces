document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle Logic ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const navBackdrop = document.getElementById('nav-backdrop');

    function toggleMobileMenu(forceClose = false) {
        if (!mobileToggle || !navLinks) return;

        const isOpen = forceClose ? false : !navLinks.classList.contains('active');

        mobileToggle.classList.toggle('active', isOpen);
        mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        navLinks.classList.toggle('active', isOpen);

        if (navBackdrop) {
            navBackdrop.classList.toggle('active', isOpen);
        }

        // Prevent body scroll when mobile menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    if (navBackdrop) {
        navBackdrop.addEventListener('click', () => {
            toggleMobileMenu(true);
        });
    }

    // Close mobile menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            toggleMobileMenu(true);
        }
    });

    // --- Custom Smooth Scroll Function ---
    function smoothScrollTo(targetSelector, duration = 800) {
        const targetElement = document.querySelector(targetSelector);
        if (!targetElement) return;

        // Dynamic header offset based on screen width
        const isMobile = window.innerWidth <= 900;
        const headerOffset = isMobile ? 80 : 100;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        // Cubic easing function for premium feel
        function easeInOutCubic(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }

        requestAnimationFrame(animation);
    }

    // Apply custom smooth scroll to all local anchor links (CTAs and nav links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            e.preventDefault();

            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                toggleMobileMenu(true);
            }

            smoothScrollTo(targetId, 800);
        });
    });

    // --- Handle Form Submission ---
    const contactForm = document.getElementById('consultation-form');
    const successMessage = document.getElementById('form-success-message');

    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Fade out form
            contactForm.style.transition = 'opacity 0.4s ease';
            contactForm.style.opacity = '0';
            
            setTimeout(() => {
                contactForm.style.display = 'none';
                
                // Show success message
                successMessage.style.display = 'block';
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(10px)';
                successMessage.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                
                // Force reflow
                successMessage.offsetHeight;
                
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'translateY(0)';
            }, 400);
        });
    }
});
