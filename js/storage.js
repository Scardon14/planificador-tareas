AlDia.Storage = (() => { // Módulo que encapsula el acceso a localStorage
    function read(key, fallback) { // Lee un valor guardado o devuelve uno por defecto
        try { // Protege contra datos corruptos o localStorage bloqueado
            const raw = localStorage.getItem(key); // Obtiene el texto guardado
            return raw === null ? fallback : JSON.parse(raw); // Convierte el texto a objeto o usa el valor por defecto
        } catch { // Se ejecuta si ocurre cualquier error
            return fallback; // Devuelve el valor por defecto para que la app siga funcionando
        }
    }

    function write(key, value) { // Guarda un valor convertido a texto JSON
        try { // Protege contra cuota llena o navegador en modo privado
            localStorage.setItem(key, JSON.stringify(value)); // Guarda el valor en el navegador
            return true; // Indica que se guardó bien
        } catch { // Se ejecuta si el guardado falla
            return false; // Indica que no se pudo guardar
        }
    }

    return { read, write }; // Expone solo las funciones públicas
})();
