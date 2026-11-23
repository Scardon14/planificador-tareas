# Al día · Planificador de tareas

Tablero estilo Trello hecho con HTML, CSS, JavaScript y Bootstrap 5.

## Funciones
- Tres columnas: **Por hacer → En proceso → Completado**.
- Cambia el estado **arrastrando** la tarjeta o con los **botones** de cada tarjeta (funciona también en móvil).
- Al completar una tarea aparece una **alerta de felicitación** y **confeti**.
- **Persistencia en localStorage**: tareas, modo y paleta se conservan al recargar.
- **Modo claro / oscuro** y **5 paletas** de color (Océano, Atardecer, Bosque, Lavanda, Turquesa).

## Estructura
```
index.html
css/
  themes.css        paletas y modos claro/oscuro (variables CSS)
  style.css         estilos de los componentes
js/
  config.js         estados, paletas y reglas (único lugar a editar para cambiar columnas)
  storage.js        lectura y escritura en localStorage
  dom.js            utilidades para crear elementos
  dates.js          utilidades de fechas
  theme.js          modo claro/oscuro y paletas
  task.js           clase Task
  task-manager.js   clase TaskManager (CRUD + persistencia)
  validator.js      validación del formulario
  confetti.js       efecto de confeti
  notifications.js  avisos y confirmación de eliminar
  board.js          columnas, tarjetas y estadísticas
  drag-drop.js      arrastrar y soltar
  form.js           formulario de nueva tarea
  app.js            controlador que conecta todo
```

## Cómo agregar una paleta
1. Añade `{ id: "miPaleta", name: "Mi paleta" }` en `PALETTES` de `js/config.js`.
2. Añade `[data-palette="miPaleta"] { --accent: #...; --accent-2: #...; }` en `css/themes.css`.

## Cómo agregar una columna
Añade una línea en `STATES` de `js/config.js` (la última columna es la que activa la celebración).

Abre `index.html` directamente en el navegador; no necesita servidor.
