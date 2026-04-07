document.addEventListener('DOMContentLoaded', () => {
    // Busca todos los enlaces del menú y el botón de "Explorar"
    const links = document.querySelectorAll('.nav-link, .btn-fancy');
    const pages = document.querySelectorAll('.page');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que la página salte bruscamente
            
            // Descubre qué sección queremos abrir
            const targetId = link.getAttribute('data-target');

            // Quita el color negro del menú anterior y se lo pone al nuevo
            document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
            if (link.classList.contains('nav-link')) {
                link.classList.add('active');
            }

            // Oculta todas las secciones
            pages.forEach(page => {
                page.classList.remove('active');
            });

            // Muestra la nueva sección con un milisegundo de retraso para disparar la animación CSS
            setTimeout(() => {
                document.getElementById(targetId).classList.add('active');
            }, 10);
        });
    });
});