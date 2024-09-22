function cargarIG(link) {
    if (confirm("¿Estás seguro de que quieres ir a otra página?")) {
        window.open(link, "_blank");
    }
}


function cambiarColor(degradado1) {
    const body = document.body;

    body.style.transition = "background-image 5s ease-in-out";

    body.style.backgroundImage = degradado1;

}

function cambiarImagen(nuevaImagen) {
    const dibujo = document.getElementById('dibujo');
    dibujo.src = nuevaImagen;
}

function resetColor() {
    document.body.style.backgroundImage = "linear-gradient(45deg, #af73ff, #555cff)"; // Restaura el color original
    document.body.style.transition = "background-image 5s ease-in-out";
}
