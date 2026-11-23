AlDia.Task = class Task { // Clase que representa una tarea
    constructor({ id, nombre, descripcion, asignadoA, fechaDeEntrega, estado }) { // Recibe los datos como un objeto
        this.id = id || Task.generarId(); // Usa el ID recibido o crea uno nuevo
        this.nombre = nombre; // Guarda el nombre
        this.descripcion = descripcion; // Guarda la descripción
        this.asignadoA = asignadoA; // Guarda el responsable
        this.fechaDeEntrega = fechaDeEntrega; // Guarda la fecha de entrega
        this.estado = estado; // Guarda el estado actual (columna donde está la tarea)
    }

    static generarId() { // Crea un identificador único sin depender de librerías
        return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); // Combina la hora actual con un número aleatorio
    }
};
