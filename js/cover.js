document.addEventListener('DOMContentLoaded', () => {
    const cover = document.getElementById('sobre-portada');
    const seal = document.getElementById('sobre-sello');
    const envelopeImage = cover.querySelector('.sobre-imagen');
    const invitation = document.getElementById('carta');
    let opening = false;

    const openImageSource = envelopeImage.dataset.openSrc.trim();
    if (openImageSource) {
        const preloadedOpenImage = new Image();
        preloadedOpenImage.onload = () => {
            const openImage = document.createElement('img');
            openImage.className = 'sobre-imagen sobre-imagen--abierto';
            openImage.src = openImageSource;
            openImage.alt = '';
            openImage.setAttribute('aria-hidden', 'true');
            cover.querySelector('.sobre-escena').insertBefore(openImage, seal);
            cover.classList.add('con-sobre-abierto');
        };
        preloadedOpenImage.onerror = () => {
            console.error(`No se pudo cargar la imagen del sobre abierto: ${openImageSource}`);
        };
        preloadedOpenImage.src = openImageSource;
    }

    envelopeImage.addEventListener('error', () => {
        cover.classList.add('imagen-fallida');
        console.error('No se pudo cargar la imagen del sobre; se usará la portada alternativa.');
    });

    seal.addEventListener('click', () => {
        if (opening) return;
        opening = true;
        seal.disabled = true;
        cover.classList.add('abriendo');

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.setTimeout(() => {
            cover.hidden = true;
            invitation.hidden = false;
            invitation.classList.add('revelando');
            invitation.focus({ preventScroll: true });

            const target = document.getElementById(window.location.hash.slice(1));
            if (target) target.scrollIntoView({ block: 'start' });
        }, reducedMotion ? 260 : 5000);
    });
});
