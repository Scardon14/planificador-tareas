AlDia.Dom = (() => { // Módulo con utilidades para trabajar con el DOM sin repetir código
    const $ = (selector, root = document) => root.querySelector(selector); // Atajo para buscar un elemento
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)]; // Atajo para buscar varios elementos como array

    function el(tag, { className = "", text, attrs = {}, children = [] } = {}) { // Crea un elemento con clase, texto, atributos e hijos
        const node = document.createElement(tag); // Crea la etiqueta pedida
        if (className) node.className = className; // Asigna las clases solo si se recibieron
        if (text !== undefined) node.textContent = text; // Inserta texto de forma segura (sin interpretar HTML)
        Object.entries(attrs).forEach(([name, value]) => node.setAttribute(name, value)); // Aplica cada atributo recibido
        node.append(...children); // Agrega los hijos (elementos o textos)
        return node; // Devuelve el elemento terminado
    }

    return { $, $$, el }; // Expone solo las funciones públicas
})();
