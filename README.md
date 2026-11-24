
# Al día · Planificador de tareas

> Organiza tus pendientes, visualiza el avance de cada actividad y celebra cada logro desde un tablero sencillo e intuitivo.

<p align="center">
  <strong>Tablero Kanban personal desarrollado con HTML, CSS y JavaScript.</strong>
</p>

<p align="center">
  <a href="https://scardon14.github.io/planificador-tareas/">Ver demostración en vivo</a>
  ·
  <a href="https://github.com/Scardon14/planificador-tareas">Ver repositorio</a>
</p>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)
![Estado](https://img.shields.io/badge/Estado-Activo-2F9E44)

---

## Tabla de contenido

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación y ejecución local](#instalación-y-ejecución-local)
- [Uso de la aplicación](#uso-de-la-aplicación)
- [Reglas de validación](#reglas-de-validación)
- [Persistencia de datos](#persistencia-de-datos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Arquitectura y organización del código](#arquitectura-y-organización-del-código)
- [Personalización](#personalización)
- [Despliegue en GitHub Pages](#despliegue-en-github-pages)
- [Compatibilidad y accesibilidad](#compatibilidad-y-accesibilidad)
- [Solución de problemas](#solución-de-problemas)
- [Seguridad y privacidad](#seguridad-y-privacidad)
- [Licencia](#licencia)
- [Autora](#autora)

## Descripción

**Al día** es una aplicación web para la planificación y el seguimiento de tareas. Presenta las actividades en un tablero Kanban con tres estados: **Por hacer**, **En proceso** y **Completado**.

Cada tarea contiene un nombre, una descripción, una persona responsable y una fecha de entrega. El usuario puede cambiar su estado mediante botones o arrastrando las tarjetas entre las columnas. La aplicación guarda las tareas y las preferencias visuales en el almacenamiento local del navegador, por lo que permanecen disponibles al volver a abrir la página desde el mismo navegador y dominio.

La interfaz incluye estadísticas, una barra de progreso, notificaciones y opciones de personalización visual para facilitar el seguimiento de las actividades.

## Características

- **Tablero Kanban:** organización de tareas en las columnas Por hacer, En proceso y Completado.
- **Creación de tareas:** formulario modal para registrar nombre, descripción, responsable, fecha de entrega y estado inicial.
- **Movimiento de tareas:** cambio de estado mediante botones o arrastrando y soltando tarjetas en el tablero.
- **Bloqueo de tareas completadas:** las tareas que llegan al estado Completado no se pueden reabrir ni mover a otra columna. Sí pueden eliminarse.
- **Confirmación antes de eliminar:** ventana de confirmación para evitar eliminaciones accidentales.
- **Persistencia local:** almacenamiento de tareas y preferencias mediante `localStorage`.
- **Estadísticas:** visualización del total de tareas y de la cantidad correspondiente a cada estado.
- **Progreso general:** indicador porcentual de tareas completadas.
- **Notificaciones:** avisos al crear, mover o eliminar tareas.
- **Celebración de logros:** efecto de confeti y mensaje de felicitación al completar una tarea.
- **Modo claro y oscuro:** selección manual y detección inicial de la preferencia del sistema operativo.
- **Cinco paletas de colores:** Océano, Atardecer, Bosque, Lavanda y Turquesa.
- **Diseño adaptable:** interfaz preparada para diferentes tamaños de pantalla.
- **Validación de formularios:** revisión de campos obligatorios, longitudes mínimas y fechas.
- **Respeto por movimiento reducido:** considera la preferencia `prefers-reduced-motion` del sistema.

## Tecnologías

| Tecnología | Uso en el proyecto |
|---|---|
| HTML5 | Estructura semántica de la aplicación y formularios. |
| CSS3 | Diseño visual, variables, temas, paletas y adaptación a pantallas. |
| JavaScript ES2022 | Lógica de la aplicación, módulos, clases y manejo de eventos. |
| Bootstrap 5.3 | Componentes de interfaz, modales, menús y notificaciones. |
| Bootstrap Icons | Iconografía de botones, tarjetas y estados. |
| Google Fonts – Inter | Tipografía de la interfaz. |
| localStorage | Persistencia de tareas y preferencias en el navegador. |

La aplicación no requiere un proceso de compilación ni un gestor de paquetes. Las dependencias visuales se cargan desde CDN, por lo que se necesita conexión a internet para disponer de Bootstrap, Bootstrap Icons y Google Fonts.

## Requisitos

- Navegador web moderno y actualizado: Google Chrome, Mozilla Firefox, Microsoft Edge o Safari.
- Conexión a internet para cargar los recursos externos (CDN).
- No se necesita instalar Node.js, npm, Java ni una base de datos.
- Para ejecutar el proyecto localmente, basta con descargar o clonar el repositorio y abrir la página principal.

## Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/Scardon14/planificador-tareas.git
```

### 2. Entrar en la carpeta del proyecto

```bash
cd planificador-tareas
```

### 3. Abrir la aplicación

Abre el archivo `index.html` en un navegador web.

También puedes utilizar la extensión **Live Server** de Visual Studio Code:

1. Abre la carpeta del proyecto en Visual Studio Code.
2. Instala la extensión Live Server, si todavía no la tienes.
3. Haz clic derecho sobre `index.html`.
4. Selecciona **Open with Live Server**.

No hay comandos de compilación ni pasos adicionales de instalación.

## Uso de la aplicación

### Crear una tarea

1. Selecciona **Nueva tarea** en la parte superior del tablero o **Añadir tarea** dentro de una columna.
2. Completa el nombre, la descripción, la persona responsable y la fecha de entrega.
3. Selecciona el estado inicial.
4. Envía el formulario. Si hay campos inválidos, la aplicación mostrará los mensajes correspondientes.
5. La nueva tarjeta aparecerá en la columna seleccionada.

### Cambiar el estado de una tarea

Hay dos formas de mover una tarea:

- **Con botones:** utiliza las acciones de avance o retroceso que aparecen en la tarjeta.
- **Con arrastrar y soltar:** arrastra la tarjeta a la columna de destino y suéltala en la posición deseada.

Las tareas completadas quedan bloqueadas y no pueden volver a estados anteriores.

### Eliminar una tarea

1. Selecciona el botón de eliminar de la tarjeta.
2. Revisa el nombre de la tarea en la ventana de confirmación.
3. Confirma la eliminación para retirarla del tablero.

### Personalizar la apariencia

- Selecciona el botón de paleta para elegir entre Océano, Atardecer, Bosque, Lavanda y Turquesa.
- Utiliza el botón de modo para alternar entre tema claro y oscuro.
- La aplicación guarda las preferencias para la próxima visita.

### Consultar el progreso

El panel de estadísticas muestra el número total de tareas y cuántas se encuentran en cada estado. La barra de progreso representa el porcentaje de tareas completadas respecto del total.

## Reglas de validación

El formulario aplica las siguientes reglas:

| Campo | Regla |
|---|---|
| Nombre | Debe contener más de 8 caracteres. |
| Descripción | Debe contener más de 15 caracteres. |
| Responsable | Debe contener más de 8 caracteres. |
| Fecha de entrega | Es obligatoria y no puede ser anterior al día actual. |
| Estado | Debe corresponder a uno de los estados configurados en la aplicación. |

Los espacios al inicio y al final de los valores se eliminan antes de validar la información.

## Persistencia de datos

La aplicación utiliza `localStorage` para guardar la información directamente en el navegador.

| Clave | Información almacenada |
|---|---|
| `aldia:tareas` | Lista de tareas, sus datos, estado y orden. |
| `aldia:tema` | Modo visual y paleta seleccionada. |

**Importante:** los datos no se almacenan en un servidor ni se sincronizan entre dispositivos o navegadores. Permanecen asociados al navegador y al dominio desde el que se utiliza la aplicación. Si se borran los datos del sitio o el almacenamiento local, las tareas guardadas pueden perderse.

Para reiniciar los datos, abre las herramientas de desarrollo del navegador y elimina las claves anteriores desde **Application / Storage → Local Storage** (el nombre de la sección puede variar según el navegador).

## Estructura del proyecto

```text
planificador-tareas/
├── index.html
├── README.md
├── css/
│   ├── style.css
│   └── themes.css
├── img/
│   ├── apple-touch-icon.png
│   ├── favicon-32.png
│   └── favicon.svg
└── js/
    ├── app.js
    ├── board.js
    ├── confetti.js
    ├── config.js
    ├── dates.js
    ├── dom.js
    ├── drag-drop.js
    ├── form.js
    ├── notifications.js
    ├── storage.js
    ├── task-manager.js
    ├── task.js
    ├── theme.js
    └── validator.js
```

## Arquitectura y organización del código

El código se organiza en módulos con responsabilidades específicas. Los archivos JavaScript utilizan el espacio de nombres global `AlDia` y se cargan desde `index.html` en un orden definido.

| Módulo | Responsabilidad |
|---|---|
| `config.js` | Define estados, paletas, reglas de validación y claves de almacenamiento. |
| `storage.js` | Lee y escribe información en `localStorage`, controlando posibles errores. |
| `dom.js` | Proporciona utilidades para consultar y crear elementos del DOM. |
| `dates.js` | Gestiona la fecha actual, el formato de fechas y la detección de vencimientos. |
| `task.js` | Define la clase `Task`, que representa una tarea. |
| `task-manager.js` | Administra las tareas: carga, consulta, creación, eliminación, movimiento y persistencia. |
| `validator.js` | Valida los datos ingresados en el formulario. |
| `form.js` | Gestiona el formulario modal de creación de tareas. |
| `board.js` | Construye las columnas, tarjetas, estadísticas y barra de progreso. |
| `drag-drop.js` | Implementa la interacción de arrastrar y soltar tarjetas. |
| `notifications.js` | Muestra notificaciones y solicita confirmación antes de eliminar. |
| `confetti.js` | Implementa el efecto visual de celebración. |
| `theme.js` | Administra el modo claro/oscuro y las paletas de colores. |
| `app.js` | Conecta los módulos y coordina los eventos principales. |

### Flujo general

1. La aplicación carga la configuración y las utilidades.
2. Se recuperan las tareas y preferencias guardadas en el navegador.
3. Se construye el tablero con sus columnas y estadísticas.
4. El usuario crea, mueve o elimina tareas.
5. El administrador de tareas actualiza la información y la guarda en `localStorage`.
6. La interfaz se vuelve a representar para mostrar los cambios.

## Personalización

### Agregar una paleta de colores

1. Abre `js/config.js`.
2. Agrega la nueva paleta al arreglo `PALETTES`:

```javascript
{ id: "cereza", name: "Cereza" }
```

3. Abre `css/themes.css` y define las variables de color correspondientes:

```css
[data-palette="cereza"] {
    --accent: #C2255C;
    --accent-2: #F08C00;
}
```

Ajusta los valores según el esquema visual que quieras utilizar y verifica el contraste de los elementos.

### Agregar un estado o columna

En `js/config.js`, agrega el nuevo estado al arreglo `STATES`:

```javascript
{
    id: "REVISION",
    label: "Revisión",
    icon: "bi-eye-fill",
    color: "#845EF7"
}
```

El orden del arreglo determina el orden de las columnas y de los botones de navegación. **El último estado se considera el estado final:** al llegar a él, la tarea queda bloqueada y se activa la celebración. Por eso, conserva `Completado` como último estado si deseas mantener el comportamiento actual.

### Modificar las reglas del formulario

En `js/config.js`, ajusta los valores de `RULES` para cambiar las longitudes mínimas del nombre, la descripción y el responsable. Las reglas de fecha y estado se encuentran en `js/validator.js`.

## Despliegue en GitHub Pages

El proyecto puede publicarse directamente desde la raíz del repositorio, ya que no requiere compilación.

1. Sube los cambios a la rama `main`:

```bash
git add .
git commit -m "docs: actualizar README del proyecto"
git push origin main
```

2. En GitHub, abre el repositorio y entra en **Settings → Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. Selecciona la rama `main` y la carpeta `/(root)`.
5. Guarda la configuración.
6. Espera a que GitHub Pages publique el sitio. Puedes consultar el estado del despliegue en la pestaña **Actions**.

URL del proyecto:

**https://scardon14.github.io/planificador-tareas/**

Si GitHub Pages ya está configurado, los nuevos cambios se publicarán después de que se complete el despliegue.

## Compatibilidad y accesibilidad

- La interfaz está diseñada para navegadores modernos.
- Los controles principales incluyen etiquetas accesibles y nombres descriptivos.
- Las notificaciones utilizan atributos `aria-live` para comunicar cambios.
- La barra de progreso expone su valor mediante atributos ARIA.
- Se consideran las preferencias del sistema para el modo oscuro y el movimiento reducido.
- En pantallas táctiles se pueden utilizar los botones de movimiento de las tarjetas.

## Solución de problemas

| Problema | Posible solución |
|---|---|
| No cargan los estilos o iconos | Comprueba la conexión a internet y que los recursos CDN estén disponibles. |
| No se conservan las tareas | Verifica que el navegador permita `localStorage` y que no se hayan borrado los datos del sitio. |
| No aparece una nueva paleta | Comprueba que el identificador esté agregado tanto en `config.js` como en `themes.css`. |
| GitHub Pages muestra un error 404 | Verifica que `index.html` esté en la raíz de la rama y carpeta configuradas en Pages. Revisa también el estado del workflow en Actions. |
| Los cambios no aparecen publicados | Comprueba que el último despliegue haya finalizado correctamente y actualiza la página. |

## Seguridad y privacidad

- La aplicación no utiliza un backend ni envía las tareas a un servidor propio.
- La información de las tareas se almacena localmente en el navegador.
- Los valores introducidos por el usuario se incorporan al DOM como texto, evitando interpretarlos como marcado HTML.
- No guardes información confidencial o sensible en las tareas si compartes el dispositivo o el perfil del navegador con otras personas.
- Las bibliotecas y fuentes externas se cargan desde CDN; su disponibilidad depende de esos proveedores.

## Licencia

Este repositorio no incluye actualmente un archivo de licencia. Si deseas permitir que otras personas reutilicen, modifiquen o distribuyan el proyecto, agrega un archivo `LICENSE` con los términos que hayas elegido antes de declarar una licencia en esta sección.

## Autora

**Gabriela Cardona**

Desarrolladora de software.

- GitHub: [@Scardon14](https://github.com/Scardon14)

---

<p align="center">
  Hecho con intención, organizado con <strong>Al día</strong>.
</p>
