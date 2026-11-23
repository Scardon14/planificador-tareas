(() => { // Controlador principal: conecta todos los módulos sin mezclar responsabilidades
    const { $ } = AlDia.Dom; // Toma la utilidad para buscar elementos
    const { STORAGE_KEYS, STATES } = AlDia.Config; // Toma la configuración
    const manager = new AlDia.TaskManager(STORAGE_KEYS.TASKS); // Crea el administrador de tareas (carga lo guardado)
    const finalState = STATES[STATES.length - 1]; // Estado final: Completado
    const stateLabel = id => STATES.find(state => state.id === id).label; // Obtiene el nombre visible de un estado

    const render = () => AlDia.Board.render(manager); // Redibuja el tablero con los datos actuales

    function celebrate(task) { // Celebra una tarea completada
        AlDia.Confetti.celebrate(AlDia.Board.getCard(task.id)); // Lanza el confeti desde la tarjeta
        AlDia.Notifications.toast({ title: "¡Felicitaciones! 🎉", message: `Completaste «${task.nombre}». ¡Sigue así!`, icon: "bi-trophy-fill", variant: "celebrate", delay: 5000 }); // Muestra la alerta de felicitación
    }

    function changeState(id, newState, beforeId = null) { // Cambia el estado de una tarea (por botón o arrastre)
        const task = manager.find(id); // Busca la tarea
        if (!task) return; // Detiene si no existe
        const previous = task.estado; // Recuerda su estado anterior
        const moved = manager.move(id, newState, beforeId); // Intenta mover la tarea y guardar en localStorage
        render(); // Redibuja el tablero (también devuelve la tarjeta a su lugar si no se pudo mover)
        if (!moved) return AlDia.Notifications.toast({ title: "Tarea bloqueada", message: "Las tareas completadas no se pueden reabrir ni mover.", icon: "bi-lock-fill", variant: "danger" }); // Avisa que está bloqueada
        AlDia.Board.highlight(id); // Anima la tarjeta movida
        if (previous === newState) return; // No avisa si solo se reordenó dentro de la misma columna
        if (newState === finalState.id) celebrate(task); // Si llegó a Completado, celebra
        else AlDia.Notifications.toast({ title: "Tarea movida", message: `La tarea: "${task.nombre}" ahora está en ${stateLabel(newState)}.`, icon: "bi-arrow-left-right" }); // Si no, informa el cambio
    }

    function requestDelete(id) { // Pide confirmación y elimina una tarea
        const task = manager.find(id); // Busca la tarea
        if (!task) return; // Detiene si no existe
        AlDia.Notifications.confirmDelete(task.nombre, () => { // Abre la confirmación
            manager.remove(id); // Elimina la tarea y guarda
            render(); // Redibuja el tablero
            AlDia.Notifications.toast({ title: "Tarea eliminada", message: `La tarea: "${task.nombre}" fue eliminada.`, icon: "bi-trash3-fill", variant: "danger" }); // Confirma la eliminación
        });
    }

    function createTask(data) { // Crea una tarea con los datos del formulario
        const task = manager.add(data); // Guarda la tarea
        render(); // Redibuja el tablero
        AlDia.Board.highlight(task.id); // Anima la tarjeta nueva
        AlDia.Notifications.toast({ title: "Tarea creada", message: `La tarea: "${task.nombre}" se agregó a ${stateLabel(task.estado)}.`, icon: "bi-check2-circle", variant: "success" }); // Confirma la creación
    }

    const cardId = element => element.closest(".task-card").dataset.id; // Obtiene el ID de la tarjeta que contiene un elemento

    const boardActions = { // Mapa de acciones del tablero (evita una cadena de if)
        add: button => AlDia.TaskForm.open(button.dataset.state), // Abre el formulario con el estado de la columna
        move: button => changeState(cardId(button), button.dataset.target), // Mueve la tarjeta al estado del botón
        delete: button => requestDelete(cardId(button)) // Solicita eliminar la tarjeta
    };

    AlDia.Theme.bindControls(); // Activa el selector de paletas y el modo claro/oscuro
    AlDia.Board.build(); // Crea las columnas
    render(); // Dibuja las tareas guardadas
    AlDia.TaskForm.init(createTask); // Activa el formulario
    AlDia.DragDrop.init($("#board"), changeState, render); // Activa el arrastrar y soltar
    $("#board").addEventListener("click", event => { // Escucha todos los clics del tablero con un solo evento
        const button = event.target.closest("[data-action]"); // Detecta el botón pulsado
        if (button) boardActions[button.dataset.action]?.(button); // Ejecuta la acción correspondiente
    });
    $("#btn-nueva-tarea").addEventListener("click", () => AlDia.TaskForm.open()); // Abre el formulario desde el botón principal
})();
