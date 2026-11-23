AlDia.Theme = (() => { // Módulo que gestiona el modo claro/oscuro y las paletas de colores
    const { STORAGE_KEYS, PALETTES } = AlDia.Config; // Toma la configuración necesaria
    const root = document.documentElement; // Referencia a la etiqueta <html>, donde se guardan los atributos del tema
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches; // Detecta si el sistema operativo usa modo oscuro
    const saved = AlDia.Storage.read(STORAGE_KEYS.THEME, {}); // Lee la preferencia guardada en una visita anterior
    const state = { // Estado actual del tema
        mode: saved.mode || (prefersDark ? "dark" : "light"), // Usa el modo guardado o, si no existe, el del sistema
        palette: PALETTES.some(p => p.id === saved.palette) ? saved.palette : PALETTES[0].id // Valida la paleta guardada
    };

    function refreshControls() { // Sincroniza los botones con el estado actual (si ya existen en la página)
        const icon = AlDia.Dom.$("#mode-toggle i"); // Busca el icono del botón de modo
        if (icon) icon.className = `bi ${state.mode === "dark" ? "bi-sun-fill" : "bi-moon-stars-fill"}`; // Muestra sol en oscuro y luna en claro
        AlDia.Dom.$$("#palette-menu .palette-item").forEach(item => item.classList.toggle("active", item.dataset.palette === state.palette)); // Marca la paleta activa
    }

    function apply() { // Aplica el estado al documento y lo guarda
        root.setAttribute("data-bs-theme", state.mode); // Bootstrap usa este atributo para activar su modo oscuro
        root.setAttribute("data-palette", state.palette); // Nuestro CSS usa este atributo para elegir los colores de acento
        AlDia.Storage.write(STORAGE_KEYS.THEME, state); // Guarda la elección para la próxima visita
        refreshControls(); // Actualiza el aspecto de los botones
    }

    function bindControls() { // Crea el menú de paletas y conecta los botones (se llama cuando el HTML ya cargó)
        const menu = AlDia.Dom.$("#palette-menu"); // Obtiene el menú desplegable de paletas
        menu.replaceChildren(...PALETTES.map(p => AlDia.Dom.el("li", { children: [ // Crea un elemento de lista por cada paleta
            AlDia.Dom.el("button", { className: "dropdown-item palette-item", attrs: { type: "button", "data-palette": p.id }, children: [ // Crea el botón de la paleta
                AlDia.Dom.el("span", { className: "swatch", attrs: { "data-palette": p.id } }), // Dibuja la muestra de color con los colores de esa paleta
                p.name // Escribe el nombre de la paleta
            ] })
        ] })));
        menu.addEventListener("click", event => { // Escucha clics en todo el menú con una sola función
            const item = event.target.closest("[data-palette]"); // Detecta qué paleta se pulsó
            if (!item) return; // Ignora clics fuera de las paletas
            state.palette = item.dataset.palette; // Cambia la paleta
            apply(); // Aplica y guarda el cambio
        });
        AlDia.Dom.$("#mode-toggle").addEventListener("click", () => { // Escucha el botón de modo claro/oscuro
            state.mode = state.mode === "dark" ? "light" : "dark"; // Alterna entre claro y oscuro
            apply(); // Aplica y guarda el cambio
        });
        refreshControls(); // Marca la paleta activa y el icono correcto
    }

    apply(); // Aplica el tema apenas carga el script para evitar un parpadeo de color

    return { bindControls }; // Expone solo lo que necesita el controlador
})();
