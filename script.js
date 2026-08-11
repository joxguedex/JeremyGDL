// ─── Abrir enlace en nueva pestaña ───
function cargarIG(link) {
    window.open(link, "_blank");
}

// ─── Cambiar color de fondo con overlay suave ───
function cambiarColor(degradado1) {
    const overlay = document.getElementById('bg-overlay');
    overlay.style.backgroundImage = degradado1;
    overlay.style.opacity = 1;
}

// ─── Cambiar imagen del dibujo con fade ───
function cambiarImagen(nuevaImagen) {
    const dibujo = document.getElementById('dibujo');
    dibujo.style.opacity = 0.2;
    setTimeout(() => {
        dibujo.src = nuevaImagen;
        dibujo.style.opacity = 1;
    }, 80);
}

// ─── Restaurar color y dibujo original ───
function resetColor() {
    const overlay = document.getElementById('bg-overlay');
    overlay.style.opacity = 0;

    const dibujo = document.getElementById('dibujo');
    dibujo.style.opacity = 0.2;
    setTimeout(() => {
        dibujo.src = 'dibujoGato.png';
        dibujo.style.opacity = 1;
    }, 80);
}


// ═══════════════════════════════════════════
//  SISTEMA DE PARTÍCULAS FLOTANTES
// ═══════════════════════════════════════════
(function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    const PARTICLE_COUNT = 50;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.pulse = Math.random() * Math.PI * 2;
            this.pulseSpeed = Math.random() * 0.02 + 0.005;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.pulse += this.pulseSpeed;

            // Wrap around screen edges
            if (this.x < -10) this.x = canvas.width + 10;
            if (this.x > canvas.width + 10) this.x = -10;
            if (this.y < -10) this.y = canvas.height + 10;
            if (this.y > canvas.height + 10) this.y = -10;
        }
        draw() {
            const currentOpacity = this.opacity * (0.6 + 0.4 * Math.sin(this.pulse));
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
            ctx.fill();

            // Glow effect
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.15})`;
            ctx.fill();
        }
    }

    // Crear partículas
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    // Dibujar líneas entre partículas cercanas
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const opacity = (1 - dist / 150) * 0.08;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        drawConnections();
        requestAnimationFrame(animate);
    }
    animate();
})();
