document.addEventListener('DOMContentLoaded', () => {
    const carrusel = document.querySelector('.carrusel');

    if (!carrusel) return;

    const inner = document.createElement('div');
    inner.className = 'carrusel-inner';
    const images = Array.from(carrusel.querySelectorAll('img'));

    images.forEach(img => inner.appendChild(img));

    images.forEach(img => inner.appendChild(img.cloneNode(true)));

    carrusel.appendChild(inner);

    let position = 0;
    const speed = 1; 

 
    const allImages = inner.querySelectorAll('img');
    let loadedCount = 0;
    allImages.forEach(img => {
        if (img.complete) loadedCount++;
        else img.addEventListener('load', () => {
            loadedCount++;
            if (loadedCount === allImages.length) startAnimation();
        });
    });

    if (loadedCount === allImages.length) startAnimation();

    function startAnimation() {
        const gap = 40;
        const totalWidth = Array.from(allImages).reduce((sum, img) => sum + img.offsetWidth + gap, 0);

        function animate() {
            position -= speed;
            if (Math.abs(position) >= totalWidth / 2) position = 0; // reiniciar para loop infinito
            inner.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animate);
        }

        animate();
    }
});
