document.addEventListener('DOMContentLoaded', () => {


    // Custom smooth scroll function with customizable timing and cubic easing
    function smoothScrollTo(targetSelector, duration = 800) {
        const targetElement = document.querySelector(targetSelector);
        if (!targetElement) return;

        const headerOffset = 100; // slightly increased offset for float curvy header spacing
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

    // Apply custom smooth scroll to all local anchor links (CTAs and logo)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId, 800); // 0.8s duration for snappy, premium transition
        });
    });

    // Handle Form Submission
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

