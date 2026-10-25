// Representa una tarea con todos los campos solicitados.
class Task {
    constructor(id, nombre, descripcion, asignadoA, fechaDeEntrega, estado) {
        this.id = id; // Guarda el identificador único.
        this.nombre = nombre; // Guarda el nombre.
        this.descripcion = descripcion; // Guarda la descripción.
        this.asignadoA = asignadoA; // Guarda el responsable.
        this.fechaDeEntrega = fechaDeEntrega; // Guarda la fecha de entrega.
        this.estado = estado; // Guarda el estado actual.
    }
}

// Administra las tareas durante la sesión.
class TaskManager {
    constructor() {
        this.tasks = []; // Crea el array de tareas.
        this.nextId = 1; // Define el primer ID.
    }

    getAllTasks() {
        return [...this.tasks]; // Devuelve una copia de la lista.
    }

    getTasksWithStatus(status) {
        return this.tasks.filter(task => task.estado === status); // Filtra las tareas por estado.
    }

    addTask(taskData) {
        const task = new Task( // Construye una nueva tarea.
            this.nextId++, // Asigna un ID y aumenta el contador.
            taskData.nombre, // Recibe el nombre.
            taskData.descripcion, // Recibe la descripción.
            taskData.asignadoA, // Recibe el responsable.
            taskData.fechaDeEntrega, // Recibe la fecha.
            taskData.estado // Recibe el estado.
        );

        this.tasks.push(task); // Guarda la tarea en el array.
        return task; // Devuelve la tarea creada.
    }

    deleteTask(taskId) {
        const cantidadAnterior = this.tasks.length; // Guarda la cantidad inicial.
        this.tasks = this.tasks.filter(task => task.id !== taskId); // Excluye la tarea seleccionada.
        return this.tasks.length < cantidadAnterior; // Indica si se eliminó una tarea.
    }

    updateTask(taskId, status) {
        const task = this.tasks.find(task => task.id === taskId); // Busca la tarea por ID.
        if (!task) return false; // Detiene el método si no existe.
        task.estado = status; // Actualiza el estado.
        return true; // Confirma la actualización.
    }

    assignTask(taskId, assignee) {
        const task = this.tasks.find(task => task.id === taskId); // Busca la tarea por ID.
        if (!task) return false; // Detiene el método si no existe.
        task.asignadoA = assignee; // Actualiza el responsable.
        return true; // Confirma la asignación.
    }
}

// Crea el administrador de tareas.
const taskManager = new TaskManager(); // Mantiene una única lista durante la sesión.

// Obtiene las referencias de los elementos del HTML.
const formulario = document.getElementById("formulario"); // Obtiene el formulario.
const mensajesError = document.getElementById("mensajes-error"); // Obtiene el contenedor de errores.
const mensajeExito = document.getElementById("mensaje-exito"); // Obtiene el contenedor de confirmaciones.
const listaTareas = document.getElementById("lista-tareas"); // Obtiene el contenedor de tarjetas.
const estadoLista = document.getElementById("estado-lista"); // Obtiene el mensaje de lista vacía.
const contadorTareas = document.getElementById("contador-tareas"); // Obtiene el contador de la lista.
const totalTareas = document.getElementById("total-tareas"); // Obtiene el indicador total.
const totalPendientes = document.getElementById("total-pendientes"); // Obtiene el indicador por hacer.
const totalProceso = document.getElementById("total-proceso"); // Obtiene el indicador en proceso.
const totalHechas = document.getElementById("total-hechas"); // Obtiene el indicador completadas.

// Define las etiquetas visibles de los estados.
const nombresEstados = {
    POR_HACER: "Por hacer",
    EN_PROCESO: "En proceso",
    REVISION: "Revisión",
    HECHO: "Hecho"
};

// Define la clase visual de cada estado.
const clasesEstados = {
    POR_HACER: "badge-POR_HACER",
    EN_PROCESO: "badge-EN_PROCESO",
    REVISION: "badge-REVISION",
    HECHO: "badge-HECHO"
};

// Valida los cinco campos del formulario.
function validateTaskForm() {
    const nombre = document.getElementById("nombre").value.trim(); // Lee el nombre sin espacios extremos.
    const descripcion = document.getElementById("descripcion").value.trim(); // Lee la descripción.
    const asignadoA = document.getElementById("asignado-a").value.trim(); // Lee el responsable.
    const fecha = document.getElementById("fecha-entrega").value; // Lee la fecha.
    const estado = document.getElementById("estado").value; // Lee el estado.
    const errores = []; // Almacena los mensajes de error.

    if (nombre.length <= 8) errores.push("El nombre debe tener más de 8 caracteres."); // Valida el nombre.
    if (descripcion.length <= 15) errores.push("La descripción debe tener más de 15 caracteres."); // Valida la descripción.
    if (asignadoA.length <= 8) errores.push("El responsable debe tener más de 8 caracteres."); // Valida el responsable.
    if (!fecha) errores.push("Debes seleccionar una fecha de entrega."); // Valida la fecha.
    if (!estado) errores.push("Debes seleccionar un estado."); // Valida el estado.

    mostrarErrores(errores); // Muestra los errores encontrados.
    return errores.length === 0; // Devuelve true si todos los campos son válidos.
}

// Presenta todos los errores del formulario.
function mostrarErrores(errores) {
    mensajesError.replaceChildren(); // Limpia los mensajes anteriores.

    if (errores.length === 0) { // Comprueba si no hay errores.
        mensajesError.classList.add("d-none"); // Oculta la alerta.
        return; // Termina la función.
    }

    errores.forEach(error => { // Recorre cada error.
        const parrafo = document.createElement("p"); // Crea un párrafo.
        parrafo.className = "mb-1"; // Reduce el margen inferior.
        parrafo.textContent = error; // Inserta el mensaje como texto.
        mensajesError.appendChild(parrafo); // Añade el mensaje a la alerta.
    });

    mensajesError.classList.remove("d-none"); // Muestra la alerta.
}

// Muestra una confirmación temporal en el formulario.
function mostrarExito(mensaje) {
    mensajeExito.textContent = mensaje; // Define el texto de confirmación.
    mensajeExito.classList.remove("d-none"); // Hace visible el mensaje.
}

// Oculta las confirmaciones anteriores.
function ocultarExito() {
    mensajeExito.textContent = ""; // Limpia el texto.
    mensajeExito.classList.add("d-none"); // Oculta el contenedor.
}

// Crea un elemento de texto sin interpretar contenido como HTML.
function crearDetalle(etiqueta, valor) {
    const detalle = document.createElement("p"); // Crea el párrafo del detalle.
    detalle.className = "task-detail"; // Aplica el estilo de detalle.

    const textoEtiqueta = document.createElement("span"); // Crea la etiqueta.
    textoEtiqueta.className = "task-detail-label"; // Aplica su estilo.
    textoEtiqueta.textContent = etiqueta; // Define el nombre del dato.

    const textoValor = document.createElement("span"); // Crea el valor.
    textoValor.className = "task-detail-value"; // Aplica su estilo.
    textoValor.textContent = valor; // Define el valor visible.

    detalle.append(textoEtiqueta, textoValor); // Combina la etiqueta y el valor.
    return detalle; // Devuelve el detalle terminado.
}

// Crea una tarjeta completa para una tarea.
function crearTarjetaTarea(task) {
    const columna = document.createElement("div"); // Crea la columna de Bootstrap.
    columna.className = "col-12 col-md-6 col-xl-4"; // Define el ancho adaptable.

    const tarjeta = document.createElement("article"); // Crea la tarjeta semántica.
    tarjeta.className = `task-card status-${task.estado}`; // Aplica el estilo según el estado.

    const encabezado = document.createElement("div"); // Crea el encabezado.
    encabezado.className = "task-card-header"; // Aplica el diseño del encabezado.

    const titulo = document.createElement("h3"); // Crea el título.
    titulo.className = "task-card-title"; // Aplica el estilo del título.
    titulo.textContent = task.nombre; // Muestra el nombre.

    const id = document.createElement("span"); // Crea la etiqueta del ID.
    id.className = "task-id"; // Aplica el estilo del ID.
    id.textContent = `#${task.id}`; // Muestra el identificador único.

    encabezado.append(titulo, id); // Añade el título y el ID al encabezado.

    const cuerpo = document.createElement("div"); // Crea el cuerpo.
    cuerpo.className = "task-card-body"; // Aplica el espaciado.

    const descripcion = document.createElement("p"); // Crea la descripción.
    descripcion.className = "task-description"; // Aplica su estilo.
    descripcion.textContent = task.descripcion; // Muestra la descripción.

    const responsable = crearDetalle("Responsable", task.asignadoA); // Construye el detalle del responsable.
    const fecha = crearDetalle("Fecha de entrega", formatearFecha(task.fechaDeEntrega)); // Construye el detalle de la fecha.

    const etiquetaEstado = document.createElement("span"); // Crea la etiqueta de estado.
    etiquetaEstado.className = `status-badge ${clasesEstados[task.estado]}`; // Aplica el color correspondiente.
    etiquetaEstado.textContent = nombresEstados[task.estado]; // Muestra el estado legible.

    const controlEstado = document.createElement("div"); // Crea el control de cambio de estado.
    controlEstado.className = "task-status-control"; // Aplica el diseño del control.

    const labelEstado = document.createElement("label"); // Crea la etiqueta del selector.
    labelEstado.htmlFor = `estado-tarea-${task.id}`; // Asocia la etiqueta con el selector.
    labelEstado.textContent = "Cambiar estado"; // Define el texto de la etiqueta.

    const selectorEstado = document.createElement("select"); // Crea el selector de estado.
    selectorEstado.id = `estado-tarea-${task.id}`; // Asigna un ID único al selector.
    selectorEstado.className = "task-status-select"; // Aplica el estilo del selector.
    selectorEstado.setAttribute("aria-label", `Cambiar estado de ${task.nombre}`); // Mejora la accesibilidad.

    Object.entries(nombresEstados).forEach(([valor, etiqueta]) => { // Recorre los estados disponibles.
        const opcion = document.createElement("option"); // Crea una opción.
        opcion.value = valor; // Define el valor interno.
        opcion.textContent = etiqueta; // Define el texto visible.
        opcion.selected = valor === task.estado; // Selecciona el estado actual.
        selectorEstado.appendChild(opcion); // Añade la opción al selector.
    });

    selectorEstado.addEventListener("change", () => { // Escucha los cambios del selector.
        const nuevoEstado = selectorEstado.value; // Lee el estado seleccionado.
        const actualizado = taskManager.updateTask(task.id, nuevoEstado); // Actualiza el estado en el array.

        if (actualizado) { // Comprueba que la actualización funcionó.
            renderizarTareas(); // Redibuja las tarjetas y estadísticas.
            mostrarExito(`La tarea "${task.nombre}" ahora está: ${nombresEstados[nuevoEstado]}.`); // Confirma el cambio.
        }
    });

    controlEstado.append(labelEstado, selectorEstado); // Combina la etiqueta y el selector.
    cuerpo.append(descripcion, responsable, fecha, etiquetaEstado, controlEstado); // Añade los detalles al cuerpo.

    const pie = document.createElement("div"); // Crea el pie de la tarjeta.
    pie.className = "task-card-footer"; // Aplica su diseño.

    const textoId = document.createElement("span"); // Crea el texto del identificador.
    textoId.className = "text-secondary small"; // Aplica un estilo discreto.
    textoId.textContent = `Tarea #${task.id}`; // Muestra el identificador.

    const botonEliminar = document.createElement("button"); // Crea el botón de eliminación.
    botonEliminar.type = "button"; // Evita enviar el formulario.
    botonEliminar.className = "btn btn-delete"; // Aplica el estilo del botón.
    botonEliminar.textContent = "Eliminar"; // Define su texto.

    botonEliminar.addEventListener("click", () => { // Escucha el clic de eliminación.
        const confirmar = window.confirm(`¿Quieres eliminar la tarea "${task.nombre}"?`); // Solicita confirmación.

        if (!confirmar) return; // Cancela si el usuario no confirma.

        const eliminado = taskManager.deleteTask(task.id); // Elimina la tarea del array.

        if (eliminado) { // Comprueba que se eliminó.
            renderizarTareas(); // Actualiza las tarjetas y estadísticas.
            mostrarExito(`La tarea "${task.nombre}" fue eliminada.`); // Confirma la eliminación.
        }
    });

    pie.append(textoId, botonEliminar); // Añade el identificador y el botón.
    tarjeta.append(encabezado, cuerpo, pie); // Combina las secciones de la tarjeta.
    columna.appendChild(tarjeta); // Inserta la tarjeta en la columna.

    return columna; // Devuelve la tarjeta terminada.
}

// Formatea la fecha para que sea más fácil de leer.
function formatearFecha(fecha) {
    if (!fecha) return "Sin fecha"; // Devuelve un texto alternativo si falta la fecha.
    const [anio, mes, dia] = fecha.split("-"); // Separa el año, mes y día.
    return `${dia}/${mes}/${anio}`; // Devuelve la fecha en formato día/mes/año.
}

// Redibuja las tarjetas y actualiza todos los indicadores.
function renderizarTareas() {
    const tareas = taskManager.getAllTasks(); // Obtiene las tareas actuales.
    listaTareas.replaceChildren(); // Limpia las tarjetas anteriores.

    tareas.forEach(task => { // Recorre todas las tareas.
        listaTareas.appendChild(crearTarjetaTarea(task)); // Crea e inserta cada tarjeta.
    });

    const total = tareas.length; // Calcula el total de tareas.
    totalTareas.textContent = total; // Actualiza la estadística total.
    totalPendientes.textContent = taskManager.getTasksWithStatus("POR_HACER").length; // Cuenta las pendientes.
    totalProceso.textContent = taskManager.getTasksWithStatus("EN_PROCESO").length; // Cuenta las tareas en proceso.
    totalHechas.textContent = taskManager.getTasksWithStatus("HECHO").length; // Cuenta las tareas completadas.
    contadorTareas.textContent = total; // Actualiza el contador de la lista.
    estadoLista.classList.toggle("d-none", total > 0); // Oculta el estado vacío si existen tareas.
}

// Conecta el formulario con la creación de tareas.
formulario.addEventListener("submit", event => {
    event.preventDefault(); // Evita la recarga de la página.
    ocultarExito(); // Oculta confirmaciones anteriores.

    if (!validateTaskForm()) return; // Detiene el envío si hay errores.

    const taskData = { // Recoge los datos validados.
        nombre: document.getElementById("nombre").value.trim(), // Obtiene el nombre.
        descripcion: document.getElementById("descripcion").value.trim(), // Obtiene la descripción.
        asignadoA: document.getElementById("asignado-a").value.trim(), // Obtiene el responsable.
        fechaDeEntrega: document.getElementById("fecha-entrega").value, // Obtiene la fecha.
        estado: document.getElementById("estado").value // Obtiene el estado.
    };

    const nuevaTarea = taskManager.addTask(taskData); // Guarda la tarea en el array.
    renderizarTareas(); // Muestra las tarjetas y actualiza las estadísticas.
    formulario.reset(); // Limpia los campos del formulario.
    mostrarErrores([]); // Oculta los errores anteriores.
    mostrarExito(`¡La tarea "${nuevaTarea.nombre}" se creó correctamente!`); // Confirma la creación.
});

// Limpia las alertas cuando se restablece el formulario.
formulario.addEventListener("reset", () => {
    mostrarErrores([]); // Oculta los errores.
    ocultarExito(); // Oculta las confirmaciones.
});

// Dibuja la interfaz inicial con cero tareas.
renderizarTareas(); // Muestra las estadísticas y el mensaje inicial.
