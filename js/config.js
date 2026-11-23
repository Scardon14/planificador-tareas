window.AlDia = window.AlDia || {}; // Crea el espacio de nombres global de la aplicación si aún no existe
AlDia.Config = Object.freeze({ // Define la configuración y la congela para evitar cambios accidentales
    STORAGE_KEYS: { TASKS: "aldia:tareas", THEME: "aldia:tema" }, // Claves con las que se guarda la información en localStorage
    RULES: { MIN_NOMBRE: 8, MIN_DESCRIPCION: 15, MIN_RESPONSABLE: 8 }, // Longitudes que el usuario debe superar al llenar el formulario
    STATES: [ // Lista ordenada de columnas del tablero (agregar una línea aquí crea una columna nueva)
        { id: "POR_HACER", label: "Por hacer", icon: "bi-inbox-fill", color: "#6C8EBF" }, // Primera columna: tareas pendientes
        { id: "EN_PROCESO", label: "En proceso", icon: "bi-lightning-charge-fill", color: "#F59F00" }, // Segunda columna: tareas en ejecución
        { id: "HECHO", label: "Completado", icon: "bi-check-circle-fill", color: "#2F9E44" } // Última columna: tareas terminadas (activa la celebración)
    ],
    PALETTES: [ // Paletas disponibles (sus colores se definen en css/themes.css)
        { id: "oceano", name: "Océano" }, // Azul con acento coral
        { id: "atardecer", name: "Atardecer" }, // Naranja con acento rosa
        { id: "bosque", name: "Bosque" }, // Verde con acento dorado
        { id: "lavanda", name: "Lavanda" }, // Violeta con acento fucsia
        { id: "turquesa", name: "Turquesa" } // Turquesa con acento naranja
    ]
});
