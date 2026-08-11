function cargarIG(link) {
    window.open(link, "_blank");
}

function cambiarColor(degradado1) {
    const overlay = document.getElementById('bg-overlay');
    overlay.style.backgroundImage = degradado1;
    overlay.style.opacity = 1;
}

function cambiarImagen(nuevaImagen) {
    const dibujo = document.getElementById('dibujo');
    dibujo.src = nuevaImagen;
}

function resetColor() {
    const overlay = document.getElementById('bg-overlay');
    overlay.style.opacity = 0;
    
    // Restaurar a la imagen principal
    const dibujo = document.getElementById('dibujo');
    dibujo.src = 'dibujoGato.png';
}
