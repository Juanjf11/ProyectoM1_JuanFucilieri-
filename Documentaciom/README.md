Cree y dividi la app en 3 archivos (html - css - js) para realizar el proyecto.
A estos archivos los conecte mediante:

CSS = link rel="stylesheet" href="css/style.css"

JS = script src="js/apppaleta.jsg

Primero hice la estructura HTML con elementos (body, header, main, section, div, label) y fui agregando los controles que pedia la consigna: un selector para la cantidad de colores (6, 8, 9), otro para el formato (HSL o RGBA) y un boton para "generar la paleta", todo esto designado por el usuraio. En el contenedor vacio se mostraran las paletas y agregue un toast, que seria la notificacion que aparece abajo al copiar un color.

CSS
Posterior a eso, aplique CSS que le da el aspecto al HTML. Puse un fondo oscuro general, tipografia, colores y espacios para poder tener una mejora visual. Se diseño los controles y el boton, una grilla automatica que acomoda las tarjetas, unas sutiles animaciones al generar las tarjetas y otra animacion toast.


JS
Despues, desde JS obtuve esos elementos con getElementById, escuche el evento click del boton y, cuando se dispara. Primero genera los valores HSL aleatorio para cada color (H=tono numero entre 0-360 | S=saturacion valor entre 40%-95% | L=luminosidad valor entre 30%-75%). Elegi estos rangos para generar siempre colores mas vivos y lindos, evitando esos colores muy oscuros.
Esos valores se convierten al formato que elegio el usuario, ya sea HSL o RGBA, siempre calculando el hex internamente porque se necesita para pintar el fondo del cuadro de color.
Se crean las tarjetas con un cuadro pintado de color generado, el codigo se muestra abajo del mismo y un icono para copiar al portapapeles directamente(al clickear, aparece un toast confirmando dicha accion).
A su vez, al volver a presionar el boton estas tarjetas se borran y generan nuevas tarjetas al contenedor.
  

FUNCIONALIDADES
Selección de tamaño de paleta: 6, 8 o 9 colores
Generación aleatoria de colores en formato HSL y RGBA
Visualización de cada color con su código
Clic en cualquier tarjeta para copiar el código
Notificación al generar paleta y al copiar un color
Animación suave al aparecer las tarjetas

DECISIONES TECNICAS

HTML, CSS y JS funciona directo en el navegador

Generar colores en HSL es más fácil controlar que los colores salgan bonitos limitando los rangos de saturación y luminosidad.

Convertir HSL a HEX internamente porque el cuadrado de color siempre necesita HEX para el fondo, independientemente del formato elegido.

Animación solo en las tarjetas es el elemento que cambia cada vez que se genera una paleta, por eso es el lugar más normal para una animación.

Toast para el microfeedback es la forma simple y no molesta de confirmarle al usuario que su acción funcionó correctamente.



PD: No hice mas commits debido a que tuve problemas con la vinculacion de git y github en VScode.

