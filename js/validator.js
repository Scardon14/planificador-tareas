AlDia.Validator = (() => { // Módulo de validación del formulario
    const { RULES, STATES } = AlDia.Config; // Toma las reglas y los estados válidos

    function validate(data) { // Revisa los datos y devuelve la lista de errores
        const errors = []; // Almacena los mensajes de error
        if (data.nombre.length <= RULES.MIN_NOMBRE) errors.push(`El nombre debe tener más de ${RULES.MIN_NOMBRE} caracteres.`); // Valida el nombre
        if (data.descripcion.length <= RULES.MIN_DESCRIPCION) errors.push(`La descripción debe tener más de ${RULES.MIN_DESCRIPCION} caracteres.`); // Valida la descripción
        if (data.asignadoA.length <= RULES.MIN_RESPONSABLE) errors.push(`El responsable debe tener más de ${RULES.MIN_RESPONSABLE} caracteres.`); // Valida el responsable
        if (!data.fechaDeEntrega) errors.push("Debes seleccionar una fecha de entrega."); // Exige una fecha
        else if (AlDia.Dates.isOverdue(data.fechaDeEntrega)) errors.push("La fecha de entrega no puede ser anterior a hoy."); // Evita fechas pasadas
        if (!STATES.some(state => state.id === data.estado)) errors.push("Debes seleccionar un estado."); // Exige un estado existente
        return errors; // Devuelve los errores (lista vacía si todo está bien)
    }

    return { validate }; // Expone solo la función pública
})();
