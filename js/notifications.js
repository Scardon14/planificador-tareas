AlDia.Notifications = (() => { // Módulo de avisos (toasts) y confirmación de eliminación
    const { $, el } = AlDia.Dom; // Toma las utilidades del DOM
    const container = $("#toast-container"); // Contenedor donde aparecen los avisos
    const deleteModal = bootstrap.Modal.getOrCreateInstance($("#modal-eliminar")); // Ventana de confirmación de Bootstrap
    let pendingConfirm = null; // Acción que se ejecutará si el usuario confirma

    function toast({ title, message, icon = "bi-info-circle-fill", variant = "info", delay = 3500 }) { // Muestra un aviso temporal
        const node = el("div", { className: `toast app-toast toast-${variant}`, attrs: { role: "status", "aria-live": "polite", "aria-atomic": "true" }, children: [ // Crea el aviso
            el("div", { className: "toast-body d-flex align-items-center gap-3", children: [ // Crea el cuerpo del aviso
                el("i", { className: `bi ${icon} toast-icon`, attrs: { "aria-hidden": "true" } }), // Icono del aviso
                el("div", { className: "flex-grow-1", children: [ el("strong", { text: title }), el("div", { className: "toast-message", text: message }) ] }), // Título y mensaje
                el("button", { className: "btn-close", attrs: { type: "button", "data-bs-dismiss": "toast", "aria-label": "Cerrar" } }) // Botón para cerrar
            ] })
        ] });
        container.appendChild(node); // Agrega el aviso a la página
        node.addEventListener("hidden.bs.toast", () => node.remove()); // Lo elimina del DOM cuando se oculta
        bootstrap.Toast.getOrCreateInstance(node, { delay }).show(); // Lo muestra con la duración indicada
    }

    function confirmDelete(taskName, onConfirm) { // Pide confirmación antes de eliminar
        $("#nombre-eliminar").textContent = taskName; // Escribe el nombre de la tarea en la ventana
        pendingConfirm = onConfirm; // Guarda la acción pendiente
        deleteModal.show(); // Abre la ventana
    }

    $("#btn-confirmar-eliminar").addEventListener("click", () => { // Escucha el botón "Eliminar" de la ventana
        deleteModal.hide(); // Cierra la ventana
        if (pendingConfirm) pendingConfirm(); // Ejecuta la acción guardada
        pendingConfirm = null; // Limpia la acción para no repetirla
    });

    return { toast, confirmDelete }; // Expone solo las funciones públicas
})();
