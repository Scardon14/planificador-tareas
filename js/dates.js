AlDia.Dates = (() => { // Módulo con utilidades de fechas
    const pad = number => String(number).padStart(2, "0"); // Agrega un cero a la izquierda a números de un dígito

    function today() { // Devuelve la fecha de hoy con formato AAAA-MM-DD
        const now = new Date(); // Obtiene la fecha actual
        return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`; // Arma el texto con año, mes y día
    }

    function format(iso) { // Convierte AAAA-MM-DD en un texto corto y legible
        if (!iso) return "Sin fecha"; // Devuelve un texto alternativo si falta la fecha
        const [year, month, day] = iso.split("-").map(Number); // Separa año, mes y día como números
        return new Date(year, month - 1, day).toLocaleDateString("es-CO", { day: "numeric", month: "short" }); // Ejemplo: "15 dic"
    }

    const isOverdue = iso => Boolean(iso) && iso < today(); // Indica si la fecha ya pasó (el formato permite comparar como texto)

    return { today, format, isOverdue }; // Expone solo las funciones públicas
})();
