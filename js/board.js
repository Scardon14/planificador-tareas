AlDia.Board = (() => { // Módulo que dibuja las columnas, las tarjetas y las estadísticas
    const { $, el } = AlDia.Dom; // Toma las utilidades del DOM
    const { STATES } = AlDia.Config; // Toma la lista de estados
    const container = $("#board"); // Contenedor del tablero
    const statsBox = $("#stats"); // Contenedor de las estadísticas
    const progressBar = $("#progress-bar"); // Barra de progreso general
    const progressLabel = $("#progress-label"); // Texto del porcentaje
    const lastIndex = STATES.length - 1; // Posición del estado final (Completado)

    const icon = name => el("i", { className: `bi ${name}`, attrs: { "aria-hidden": "true" } }); // Crea un icono de Bootstrap Icons

    function actionButton(className, action, label, children, extra = {}) { // Crea cualquier botón de acción de forma reutilizable
        return el("button", { className, attrs: { type: "button", "data-action": action, "aria-label": label, title: label, ...extra }, children }); // Devuelve el botón
    }

    function initials(name) { // Obtiene las iniciales de un nombre
        return name.split(" ").filter(Boolean).slice(0, 2).map(word => word[0]).join("").toUpperCase(); // Primera letra de las dos primeras palabras
    }

    function moveButton(target, direction) { // Crea el botón para mover la tarjeta al estado anterior o siguiente
        const isNext = direction === "next"; // Indica si avanza o retrocede
        const content = isNext ? [`${target.label} `, icon("bi-arrow-right")] : [icon("bi-arrow-left"), ` ${target.label}`]; // Ordena texto e icono según la dirección
        return actionButton(`btn-move ${isNext ? "is-next" : ""}`, "move", `Mover a ${target.label}`, content, { "data-target": target.id }); // Devuelve el botón
    }

    function createCard(task) { // Crea la tarjeta de una tarea
        const index = STATES.findIndex(state => state.id === task.estado); // Posición del estado actual
        const done = index === lastIndex; // Indica si la tarea está completada
        const overdue = !done && AlDia.Dates.isOverdue(task.fechaDeEntrega); // Indica si está vencida y sin completar
        return el("article", { className: `task-card${done ? " is-done" : ""}`, attrs: { draggable: done ? "false" : "true", "data-id": task.id }, children: [ // Tarjeta arrastrable
            el("div", { className: "task-top", children: [ // Encabezado de la tarjeta
                el("h3", { className: "task-title", text: task.nombre }), // Título de la tarea
                actionButton("btn-card-delete", "delete", "Eliminar tarea", [icon("bi-trash3")]) // Botón de eliminar
            ] }),
            el("p", { className: "task-description", text: task.descripcion }), // Descripción de la tarea
            el("div", { className: "task-meta", children: [ // Datos secundarios
                el("span", { className: "task-owner", children: [ el("span", { className: "avatar", text: initials(task.asignadoA) }), el("span", { text: task.asignadoA }) ] }), // Responsable con su avatar
                el("span", { className: `task-date${overdue ? " is-overdue" : ""}`, children: [icon("bi-calendar-event"), ` ${AlDia.Dates.format(task.fechaDeEntrega)}`] }) // Fecha de entrega
            ] }),
            el("div", { className: "task-actions", children: done ? [ // Una tarea completada muestra un candado en lugar de botones
                el("span", { className: "task-locked", children: [icon("bi-lock-fill"), " Completada · bloqueada"] }) // Mensaje de bloqueo
            ] : [ // Las demás muestran los botones para cambiar el estado manualmente
                STATES[index - 1] && moveButton(STATES[index - 1], "prev"), // Botón hacia el estado anterior (si existe)
                STATES[index + 1] && moveButton(STATES[index + 1], "next") // Botón hacia el estado siguiente (si existe)
            ].filter(Boolean) }) // Descarta los botones que no aplican
        ] });
    }

    function createColumn(state) { // Crea una columna del tablero
        const column = el("section", { className: "board-column", attrs: { "data-state": state.id }, children: [ // Contenedor de la columna
            el("header", { className: "column-header", children: [ // Encabezado de la columna
                el("h2", { className: "column-title", children: [icon(state.icon), ` ${state.label}`] }), // Título con icono
                el("span", { className: "column-count", attrs: { "data-count": state.id }, text: "0" }) // Contador de tareas
            ] }),
            el("div", { className: "board-list", attrs: { "data-state": state.id } }), // Zona donde se sueltan las tarjetas
            actionButton("column-add", "add", `Añadir tarea en ${state.label}`, [icon("bi-plus-lg"), " Añadir tarea"], { "data-state": state.id }) // Botón para crear tarea en esta columna
        ] });
        column.style.setProperty("--st", state.color); // Define el color de la columna para que lo hereden sus tarjetas
        return column; // Devuelve la columna terminada
    }

    function statCard(item) { // Crea una tarjeta de estadística
        const card = el("article", { className: "stat-card", children: [ // Contenedor de la estadística
            el("span", { className: "stat-icon", children: [icon(item.icon)] }), // Icono de la estadística
            el("div", { children: [ el("strong", { className: "stat-value", text: item.value }), el("span", { className: "stat-label", text: item.label }) ] }) // Valor y nombre
        ] });
        card.style.setProperty("--st", item.color); // Aplica el color de la estadística
        return card; // Devuelve la tarjeta terminada
    }

    function renderStats(manager) { // Actualiza las estadísticas y la barra de progreso
        const total = manager.getAll().length; // Total de tareas
        const done = manager.getByState(STATES[lastIndex].id).length; // Tareas completadas
        const percent = total ? Math.round((done / total) * 100) : 0; // Porcentaje completado
        const items = [{ label: "Total", value: total, icon: "bi-collection-fill", color: "var(--accent)" }, ...STATES.map(s => ({ label: s.label, value: manager.getByState(s.id).length, icon: s.icon, color: s.color }))]; // Datos de cada estadística
        statsBox.replaceChildren(...items.map(statCard)); // Redibuja las estadísticas
        progressBar.style.width = `${percent}%`; // Ajusta el ancho de la barra
        progressBar.parentElement.setAttribute("aria-valuenow", percent); // Informa el valor a lectores de pantalla
        progressLabel.textContent = `${percent}%`; // Muestra el porcentaje
    }

    function build() { // Crea las columnas una sola vez
        container.replaceChildren(...STATES.map(createColumn)); // Genera una columna por cada estado de la configuración
    }

    function render(manager) { // Redibuja las tarjetas y las estadísticas
        STATES.forEach(state => { // Recorre cada estado
            const tasks = manager.getByState(state.id); // Tareas del estado
            $(`.board-list[data-state="${state.id}"]`, container).replaceChildren(...tasks.map(createCard)); // Redibuja las tarjetas de la columna
            $(`[data-count="${state.id}"]`, container).textContent = tasks.length; // Actualiza el contador de la columna
        });
        renderStats(manager); // Actualiza las estadísticas
    }

    const getCard = id => $(`.task-card[data-id="${id}"]`, container); // Busca la tarjeta de una tarea por su ID

    function highlight(id) { // Aplica una animación breve a la tarjeta recién movida o creada
        const card = getCard(id); // Busca la tarjeta
        if (!card) return; // Detiene si no existe
        card.classList.add("just-moved"); // Activa la animación
        card.addEventListener("animationend", () => card.classList.remove("just-moved"), { once: true }); // Quita la clase al terminar
    }

    return { build, render, getCard, highlight }; // Expone solo las funciones públicas
})();
