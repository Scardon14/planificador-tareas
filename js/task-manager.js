AlDia.TaskManager = class TaskManager { // Clase que administra la colección de tareas y su persistencia
    constructor(storageKey) { // Recibe la clave de localStorage donde se guardan las tareas
        this.storageKey = storageKey; // Guarda la clave para usarla al guardar
        this.tasks = this.#load(); // Carga las tareas guardadas al iniciar
    }

    #load() { // Lee y valida las tareas guardadas (método privado)
        const saved = AlDia.Storage.read(this.storageKey, []); // Lee el arreglo guardado
        const validIds = AlDia.Config.STATES.map(state => state.id); // Obtiene los estados que existen actualmente
        return (Array.isArray(saved) ? saved : []).map(item => new AlDia.Task({ // Convierte cada dato guardado en una tarea
            ...item, // Copia todos los campos guardados
            estado: validIds.includes(item.estado) ? item.estado : validIds[0] // Si el estado ya no existe, la manda a la primera columna
        }));
    }

    #save() { // Guarda todas las tareas en localStorage (método privado)
        AlDia.Storage.write(this.storageKey, this.tasks); // Persiste el arreglo completo
    }

    getAll() { // Devuelve todas las tareas
        return [...this.tasks]; // Entrega una copia para que nadie modifique el arreglo original
    }

    getByState(state) { // Devuelve las tareas de un estado, respetando su orden
        return this.tasks.filter(task => task.estado === state); // Conserva solo las del estado pedido
    }

    find(id) { // Busca una tarea por su ID
        return this.tasks.find(task => task.id === id); // Devuelve la tarea o undefined
    }

    add(data) { // Crea y guarda una tarea nueva
        const task = new AlDia.Task(data); // Construye la tarea
        this.tasks.push(task); // La agrega al final de la lista
        this.#save(); // Guarda el cambio
        return task; // Devuelve la tarea creada
    }

    remove(id) { // Elimina una tarea
        const before = this.tasks.length; // Guarda la cantidad inicial
        this.tasks = this.tasks.filter(task => task.id !== id); // Excluye la tarea indicada
        this.#save(); // Guarda el cambio
        return this.tasks.length < before; // Indica si se eliminó algo
    }

    isLocked(task) { // Indica si una tarea está bloqueada (completada)
        const states = AlDia.Config.STATES; // Toma la lista de estados
        return task.estado === states[states.length - 1].id; // Está bloqueada si ya está en el estado final
    }

    move(id, state, beforeId = null) { // Cambia el estado de una tarea y la ubica antes de otra (o al final)
        const task = this.find(id); // Busca la tarea
        if (!task || this.isLocked(task)) return false; // Detiene el método si no existe o si ya está completada
        this.tasks = this.tasks.filter(item => item.id !== id); // La saca temporalmente de la lista
        task.estado = state; // Actualiza su estado
        const index = this.tasks.findIndex(item => item.id === beforeId); // Busca la posición de la tarea de referencia
        if (index === -1) this.tasks.push(task); // Sin referencia, la coloca al final
        else this.tasks.splice(index, 0, task); // Con referencia, la inserta justo antes de ella
        this.#save(); // Guarda el cambio
        return true; // Confirma que se movió
    }
};
