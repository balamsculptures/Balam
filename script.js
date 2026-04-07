// Variables globales para la galería
let currentImageIndex = 0;
let galleryItems = [];

document.addEventListener('DOMContentLoaded', () => {
    /* --- NAVEGACIÓN DEL MENÚ --- */
    const links = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            const targetId = link.getAttribute('data-target');

            if (!link.classList.contains('logo') && !link.classList.contains('btn-fancy')) {
                document.querySelectorAll('.menu-links a').forEach(nav => nav.classList.remove('active'));
                link.classList.add('active');
            } else if (link.classList.contains('logo')) {
                document.querySelectorAll('.menu-links a').forEach(nav => nav.classList.remove('active'));
            }

            pages.forEach(page => page.classList.remove('active'));
            setTimeout(() => {
                document.getElementById(targetId).classList.add('active');
            }, 10);
        });
    });

    /* --- SISTEMA DE GALERÍA (LIGHTBOX) --- */
    const cards = document.querySelectorAll('.art-card');
    
    // Escaneamos todas las tarjetas para armar el catálogo en memoria
    cards.forEach((card, index) => {
        const img = card.querySelector('img').src;
        const title = card.querySelector('h3').innerText;
        const desc = card.querySelector('p').innerText;
        
        galleryItems.push({ img, title, desc });

        // Le agregamos el clic a cada tarjeta
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => openLightbox(index));
    });
});

// Funciones del Lightbox
function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxContent();
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'flex';
    // Pequeño retraso para que la animación de CSS funcione
    setTimeout(() => lightbox.classList.add('show'), 10); 
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('show');
    setTimeout(() => lightbox.style.display = 'none', 400); // Espera a que termine la animación
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    // Si llegamos al final, volvemos a empezar (loop)
    if (currentImageIndex >= galleryItems.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryItems.length - 1;
    }
    
    // Efecto de desvanecimiento al cambiar foto
    const imgElement = document.getElementById('lightbox-img');
    imgElement.style.opacity = 0;
    
    setTimeout(() => {
        updateLightboxContent();
        imgElement.style.opacity = 1;
    }, 200);
}

function updateLightboxContent() {
    const item = galleryItems[currentImageIndex];
    document.getElementById('lightbox-img').src = item.img;
    document.getElementById('lightbox-title').innerText = item.title;
    document.getElementById('lightbox-desc').innerText = item.desc;
}

/* --- SOPORTE PARA TECLADO (EL TOQUE FANCY) --- */
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('show')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') changeImage(1);
        if (e.key === 'ArrowLeft') changeImage(-1);
    }
});