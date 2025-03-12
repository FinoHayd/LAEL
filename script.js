document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("#top-nav ul li a");
    const themeContents = document.querySelectorAll(".theme-content");
    
    if (!navLinks.length || !themeContents.length) return; // Evitar errores si no hay elementos
    
    function showSelectedTheme(event) {
        event.preventDefault(); // Evita la recarga de la página
        
        // Ocultar todas las secciones y pausar videos
        themeContents.forEach(content => {
            content.classList.remove("active");
            const videos = content.querySelectorAll("video");
            videos.forEach(video => video.pause());
        });
        
        // Remover la clase 'active' de todos los enlaces
        navLinks.forEach(link => link.classList.remove("active"));
        
        // Obtener el ID del contenido a mostrar
        const targetId = event.currentTarget.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.classList.add("active");
        }
        
        // Agregar la clase 'active' al enlace seleccionado
        event.currentTarget.classList.add("active");
        
        // Actualizar la URL con el hash de la sección seleccionada
        history.pushState(null, "", targetId);
    }
    
    // Asignar evento a cada enlace del menú
    navLinks.forEach(link => {
        link.addEventListener("click", showSelectedTheme);
    });
    
    // Hacer visible la sección de contacto siempre
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
        contactSection.style.display = "block";
    }
    
    // Verificar si hay un hash en la URL al cargar la página
    const currentHash = window.location.hash;
    if (currentHash) {
        const activeLink = document.querySelector(`#top-nav ul li a[href="${currentHash}"]`);
        const activeSection = document.querySelector(currentHash);
        
        if (activeLink && activeSection) {
            themeContents.forEach(content => content.classList.remove("active"));
            navLinks.forEach(link => link.classList.remove("active"));
            
            activeSection.classList.add("active");
            activeLink.classList.add("active");
        }
    } else {
        // Si no hay hash, mostrar la sección inicial
        const defaultSection = document.querySelector("#welcome-message");
        if (defaultSection) defaultSection.classList.add("active");
    }
});