AlDia.DragDrop = (() => { // Módulo de arrastrar y soltar tarjetas entre columnas
    const { $, $$ } = AlDia.Dom; // Toma las utilidades del DOM
    let draggedCard = null; // Tarjeta que se está arrastrando
    let dropped = false; // Indica si el arrastre terminó soltando en una columna

    function cardAfterCursor(list, y) { // Encuentra la tarjeta antes de la cual se insertará la arrastrada
        return $$(".task-card:not(.dragging)", list).find(card => { // Revisa las demás tarjetas de la lista
            const box = card.getBoundingClientRect(); // Obtiene su posición en pantalla
            return y < box.top + box.height / 2; // Es la primera cuyo punto medio está debajo del cursor
        }) || null; // Si no hay ninguna, se insertará al final
    }

    function clearHighlight() { // Quita el resaltado de todas las listas
        $$(".board-list.drag-over").forEach(list => list.classList.remove("drag-over")); // Recorre y limpia cada lista
    }

    function init(board, onDrop, onCancel) { // Conecta los eventos de arrastre al tablero
        board.addEventListener("dragstart", event => { // Se dispara al empezar a arrastrar
            const card = event.target.closest(".task-card"); // Detecta la tarjeta arrastrada
            if (!card) return; // Ignora si no es una tarjeta
            draggedCard = card; // Guarda la tarjeta
            dropped = false; // Reinicia el indicador
            event.dataTransfer.effectAllowed = "move"; // Indica que es un movimiento
            event.dataTransfer.setData("text/plain", card.dataset.id); // Firefox exige enviar algún dato
            requestAnimationFrame(() => card.classList.add("dragging")); // Aplica el estilo después de que el navegador toma la imagen de arrastre
        });

        board.addEventListener("dragover", event => { // Se dispara mientras se arrastra sobre el tablero
            const column = event.target.closest(".board-column"); // Detecta la columna bajo el cursor
            if (!column || !draggedCard) return; // Ignora si no hay columna o tarjeta
            event.preventDefault(); // Permite soltar en esta zona
            const list = $(".board-list", column); // Obtiene la lista de la columna
            clearHighlight(); // Quita el resaltado anterior
            list.classList.add("drag-over"); // Resalta la lista actual
            list.insertBefore(draggedCard, cardAfterCursor(list, event.clientY)); // Mueve la tarjeta en vivo a la posición donde caería
        });

        board.addEventListener("drop", event => { // Se dispara al soltar
            const column = event.target.closest(".board-column"); // Detecta la columna donde se soltó
            if (!column || !draggedCard) return; // Ignora si no hay columna o tarjeta
            event.preventDefault(); // Evita el comportamiento por defecto del navegador
            dropped = true; // Marca que el arrastre fue válido
            const next = draggedCard.nextElementSibling; // Tarjeta que quedó justo debajo
            onDrop(draggedCard.dataset.id, column.dataset.state, next ? next.dataset.id : null); // Avisa al controlador el movimiento
        });

        board.addEventListener("dragend", () => { // Se dispara al terminar el arrastre (suelte donde suelte)
            if (draggedCard) draggedCard.classList.remove("dragging"); // Quita el estilo de arrastre
            clearHighlight(); // Quita el resaltado
            if (!dropped) onCancel(); // Si se canceló, redibuja para devolver la tarjeta a su sitio
            draggedCard = null; // Limpia la referencia
        });
    }

    return { init }; // Expone solo la función pública
})();
