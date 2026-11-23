AlDia.Confetti = (() => { // Módulo que dibuja confeti en un canvas, sin librerías externas
    const COLORS = ["#F94144", "#F3722C", "#F9C74F", "#90BE6D", "#43AA8B", "#4D96FF", "#B388EB", "#FF8FAB"]; // Colores de las piezas
    const canvas = document.createElement("canvas"); // Crea el lienzo donde se dibuja
    canvas.className = "confetti-canvas"; // Le asigna la clase que lo fija sobre toda la pantalla
    canvas.setAttribute("aria-hidden", "true"); // Lo oculta a lectores de pantalla porque es decorativo
    document.body.appendChild(canvas); // Lo agrega a la página
    const ctx = canvas.getContext("2d"); // Obtiene el contexto de dibujo 2D
    let particles = []; // Lista de piezas de confeti activas
    let running = false; // Indica si la animación está en marcha

    function resize() { // Ajusta el lienzo al tamaño de la ventana
        canvas.width = window.innerWidth; // Define el ancho
        canvas.height = window.innerHeight; // Define el alto
    }
    resize(); // Ajusta el tamaño al cargar
    window.addEventListener("resize", resize); // Reajusta si cambia la ventana

    function burst({ x, y, count = 90, angle = -90, spread = 360, power = 11 }) { // Lanza un grupo de piezas desde un punto
        for (let i = 0; i < count; i++) { // Crea cada pieza
            const direction = (angle + (Math.random() - 0.5) * spread) * Math.PI / 180; // Calcula su dirección en radianes
            const speed = power * (0.45 + Math.random() * 0.75); // Calcula su velocidad inicial
            particles.push({ // Agrega la pieza a la lista
                x, y, // Posición inicial
                vx: Math.cos(direction) * speed, // Velocidad horizontal
                vy: Math.sin(direction) * speed, // Velocidad vertical
                size: 6 + Math.random() * 6, // Tamaño aleatorio
                color: COLORS[Math.floor(Math.random() * COLORS.length)], // Color aleatorio
                rotation: Math.random() * Math.PI, // Giro inicial
                spin: (Math.random() - 0.5) * 0.4, // Velocidad de giro
                round: Math.random() < 0.3, // Algunas piezas son círculos y otras rectángulos
                life: 0, // Cuadros que lleva viva
                ttl: 110 + Math.random() * 70 // Cuadros que durará
            });
        }
        if (!running) { running = true; requestAnimationFrame(tick); } // Inicia la animación si estaba detenida
    }

    function drawParticle(p) { // Dibuja una pieza
        ctx.save(); // Guarda el estado del lienzo
        ctx.translate(p.x, p.y); // Mueve el origen a la pieza
        ctx.rotate(p.rotation); // Gira la pieza
        ctx.globalAlpha = Math.min(1, (p.ttl - p.life) / 40); // Desvanece la pieza al final de su vida
        ctx.fillStyle = p.color; // Aplica su color
        if (p.round) { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill(); } // Dibuja un círculo
        else ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2); // Dibuja un rectángulo
        ctx.restore(); // Restaura el estado del lienzo
    }

    function tick() { // Avanza un cuadro de la animación
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Borra el cuadro anterior
        particles = particles.filter(p => p.life < p.ttl && p.y < canvas.height + 40); // Elimina las piezas que terminaron
        particles.forEach(p => { // Actualiza y dibuja cada pieza
            p.vy += 0.28; // Aplica gravedad
            p.vx *= 0.992; // Aplica un poco de resistencia del aire
            p.x += p.vx; // Mueve en horizontal
            p.y += p.vy; // Mueve en vertical
            p.rotation += p.spin; // Gira la pieza
            p.life++; // Aumenta su edad
            drawParticle(p); // La dibuja
        });
        if (particles.length) requestAnimationFrame(tick); // Continúa mientras haya piezas
        else running = false; // Detiene la animación cuando no queda ninguna
    }

    function celebrate(element) { // Lanza la celebración completa desde una tarjeta
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // Respeta a quien desactiva las animaciones
        const box = element ? element.getBoundingClientRect() : null; // Obtiene la posición de la tarjeta
        const x = box ? box.left + box.width / 2 : window.innerWidth / 2; // Calcula el centro horizontal
        const y = box ? box.top + box.height / 2 : window.innerHeight / 2; // Calcula el centro vertical
        burst({ x, y, count: 110 }); // Explosión desde la tarjeta
        burst({ x: 0, y: window.innerHeight, count: 70, angle: -55, spread: 40, power: 20 }); // Cañón desde la esquina izquierda
        burst({ x: window.innerWidth, y: window.innerHeight, count: 70, angle: -125, spread: 40, power: 20 }); // Cañón desde la esquina derecha
    }

    return { celebrate }; // Expone solo la función pública
})();
