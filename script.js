document.addEventListener('DOMContentLoaded', () => {
    // 3D Parallax Effect for Hero
    const parallaxContainer = document.getElementById('parallax-container');
    const layers = document.querySelectorAll('.text-layer, .image-layer');

    if (parallaxContainer && window.innerWidth > 900) {
        parallaxContainer.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

            layers.forEach(layer => {
                const speed = layer.getAttribute('data-speed');
                const isImage = layer.classList.contains('image-layer');
                const isLayerBack = layer.classList.contains('layer-back');
                const isLayerFront = layer.classList.contains('layer-front');
                
                // Base transforms depending on the layer's initial z-position
                let baseZ = 0;
                if (isLayerBack) baseZ = 50;
                if (isLayerFront) baseZ = 100;

                const x = xAxis * speed;
                const y = yAxis * speed;

                if (isImage) {
                    layer.style.transform = `translateZ(0) rotateY(${xAxis * 0.5}deg) rotateX(${-yAxis * 0.5}deg) translateX(${x * 2}px) translateY(${y * 2}px)`;
                } else {
                    layer.style.transform = `translateZ(${baseZ}px) translateX(${x}px) translateY(${y}px)`;
                }
            });
        });

        // Reset on mouse leave
        parallaxContainer.addEventListener('mouseleave', () => {
            layers.forEach(layer => {
                const isLayerBack = layer.classList.contains('layer-back');
                const isLayerFront = layer.classList.contains('layer-front');
                
                let baseZ = 0;
                if (isLayerBack) baseZ = 50;
                if (isLayerFront) baseZ = 100;

                layer.style.transform = `translateZ(${baseZ}px) translateX(0) translateY(0) rotateY(0) rotateX(0)`;
                layer.style.transition = 'transform 0.5s ease-out';
            });
        });

        // Remove transition during mousemove for instant feedback
        parallaxContainer.addEventListener('mouseenter', () => {
            layers.forEach(layer => {
                layer.style.transition = 'none';
            });
        });
    }

    // Smooth scroll for nav links (Vanilla)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
