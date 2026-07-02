function generarColorAleatorio() {
  let tono = Math.floor(Math.random() * 360);
  let saturacion = Math.floor(40 + Math.random() * 55);
  let luminosidad = Math.floor(30 + Math.random() * 45);
  
  return {
    tono: tono,
    saturacion: saturacion,
    luminosidad: luminosidad
  };
}

function convertirHSLaHEX(tono, saturacion, luminosidad) {
  let s = saturacion / 100;
  let l = luminosidad / 100;
  let a = s * Math.min(l, 1 - l);

  function calcularCanal(numero) {
    let k = (numero + tono / 30) % 12;
    let color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1); 
    
    return Math.round(255 * color).toString(16).padStart(2, '0');
  }

  let rojo  = calcularCanal(0);
  let verde = calcularCanal(8);
  let azul  = calcularCanal(4);
  
  return '#' + rojo + verde + azul;
}

function convertirHSLaRGBA(tono, saturacion, luminosidad) {

  let s = saturacion / 100;
  let l = luminosidad / 100;
  let a = s * Math.min(l, 1 - l);

  function calcularCanal(numero) {
    let k = (numero + tono / 30) % 12;
    
    return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)));
  }

  let rojo  = calcularCanal(0);
  let verde = calcularCanal(8);
  let azul  = calcularCanal(4);
 
  return 'rgba(' + rojo + ', ' + verde + ', ' + azul + ', 1)';
}

function convertirAHSL(tono, saturacion, luminosidad) {
  return 'hsl(' + tono + ', ' + saturacion + '%, ' + luminosidad + '%)';
}

function crearColor(formato) {
  let color = generarColorAleatorio();
  let hex = convertirHSLaHEX(color.tono, color.saturacion, color.luminosidad);
  let codigoVisible;
  
  if (formato === 'rgba') {
    codigoVisible = convertirHSLaRGBA(color.tono, color.saturacion, color.luminosidad);
  } else {
    // Si no es RGBA, mostramos HSL
    codigoVisible = convertirAHSL(color.tono, color.saturacion, color.luminosidad);
  }

  return {
    hex: hex,
    codigoVisible: codigoVisible
  };
}

function mostrarPaleta() {

  let cantidadColores = parseInt(document.getElementById('size-select').value);
  let formato = document.getElementById('format-select').value;
  let contenedorPaleta = document.getElementById('palette');

  contenedorPaleta.innerHTML = '';

  for (let i = 0; i < cantidadColores; i++) {

    let color = crearColor(formato);
    let tarjeta = document.createElement('article');
    tarjeta.className = 'color-card';
    tarjeta.tabIndex = 0;
    tarjeta.setAttribute('role', 'button');
    tarjeta.setAttribute('aria-label', 'Color ' + color.codigoVisible + '. Clic para copiar.');
    tarjeta.title = 'Copiar ' + color.codigoVisible;

    tarjeta.innerHTML =
      '<div class="color-swatch" style="background:' + color.hex + '" aria-hidden="true"></div>' +
      '<div class="color-info">' +
        '<span class="hex-code">' + color.codigoVisible + '</span>' +
        '<svg class="copy-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<rect x="9" y="9" width="13" height="13" rx="2"/>' +
          '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>' +
        '</svg>' +
      '</div>';


      tarjeta.addEventListener('click', function() {
      let codigo = this.querySelector('.hex-code').textContent;
      navigator.clipboard.writeText(codigo);
      mostrarToast('Copiado:' + codigo);
    });
    
    contenedorPaleta.appendChild(tarjeta);
  }
}

let timerToast;
function mostrarToast(mensaje) {
  let toast = document.getElementById('toast');
  toast.textContent = mensaje;
  toast.classList.add('show');

  clearTimeout(timerToast);
  timerToast = setTimeout(function() {
    toast.classList.remove('show');
  }, 2200);
}

let boton = document.getElementById('btn-generate');
boton.addEventListener('click', function() {
  mostrarPaleta();
  mostrarToast('¡Nueva paleta generada!');
});