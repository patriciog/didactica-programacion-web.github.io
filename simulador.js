// 1. Obtenemos los elementos del HTML
const selector = document.getElementById('selectorTipo');
const checkbox = document.getElementById('checkRequerido');
const inputDinamico = document.getElementById('inputDinamico');
const codigoResultado = document.getElementById('codigoResultado');

// 2. Creamos una función que actualiza todo
function actualizarSimulador() {
    // Obtenemos los valores actuales
    const tipoActual = selector.value;
    const esRequerido = checkbox.checked;

    // Cambiamos el input real
    inputDinamico.type = tipoActual;
    inputDinamico.required = esRequerido;

    // Construimos el texto del código HTML
    let textoCodigo = `<label for="dato">Tu dato:</label>\n`;
    textoCodigo += `<input type="${tipoActual}" id="dato"`;
    
    if (esRequerido) {
        textoCodigo += ` required`;
    }
    
    textoCodigo += `>`;

    // Mostramos el código en pantalla
    codigoResultado.textContent = textoCodigo;
}

// 3. Le decimos al navegador que escuche los cambios
selector.addEventListener('change', actualizarSimulador);
checkbox.addEventListener('change', actualizarSimulador);

// Ejecutamos una vez al inicio para que el código coincida
actualizarSimulador();