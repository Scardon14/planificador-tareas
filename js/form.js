AlDia.TaskForm = (() => { // Módulo del formulario de nueva tarea (dentro de una ventana modal)
    const { $, el } = AlDia.Dom; // Toma las utilidades del DOM
    const { STATES } = AlDia.Config; // Toma la lista de estados
    const form = $("#formulario"); // Formulario
    const errorBox = $("#mensajes-error"); // Contenedor de errores
    const stateSelect = $("#estado"); // Selector de estado inicial
    const modalElement = $("#modal-tarea"); // Elemento de la ventana modal
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement); // Instancia de la ventana modal de Bootstrap
    let presetState = STATES[0].id; // Estado con el que se abrirá el formulario

    function readValues() { // Lee los campos del formulario sin espacios sobrantes
        return Object.fromEntries([...new FormData(form)].map(([name, value]) => [name, value.trim()])); // Convierte los campos en un objeto limpio
    }

    function showErrors(errors) { // Muestra u oculta la lista de errores
        errorBox.replaceChildren(...errors.map(message => el("p", { className: "mb-1", text: message }))); // Crea un párrafo por error
        errorBox.classList.toggle("d-none", errors.length === 0); // Oculta la caja si no hay errores
    }

    function open(stateId = STATES[0].id) { // Abre el formulario con un estado inicial
        presetState = stateId; // Guarda el estado elegido
        modal.show(); // Abre la ventana
    }

    function init(onSubmit) { // Conecta los eventos del formulario
        stateSelect.replaceChildren(...STATES.map(state => el("option", { text: state.label, attrs: { value: state.id } }))); // Llena el selector con los estados de la configuración
        modalElement.addEventListener("show.bs.modal", () => { // Se dispara justo antes de abrir la ventana
            form.reset(); // Limpia los campos
            showErrors([]); // Oculta errores anteriores
            $("#fecha-entrega").min = AlDia.Dates.today(); // Impide elegir fechas pasadas
            stateSelect.value = presetState; // Preselecciona el estado de la columna
        });
        modalElement.addEventListener("shown.bs.modal", () => $("#nombre").focus()); // Enfoca el primer campo al terminar de abrir
        form.addEventListener("submit", event => { // Se dispara al enviar el formulario
            event.preventDefault(); // Evita recargar la página
            const values = readValues(); // Lee los datos
            const errors = AlDia.Validator.validate(values); // Valida los datos
            showErrors(errors); // Muestra los errores si existen
            if (errors.length) return; // Detiene el envío si hay errores
            onSubmit(values); // Entrega los datos al controlador
            modal.hide(); // Cierra la ventana
        });
    }

    return { init, open }; // Expone solo las funciones públicas
})();
