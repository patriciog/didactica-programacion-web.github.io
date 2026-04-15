// 1. Mostrar/Ocultar Menú Lateral
const btnMenu = document.getElementById('btn-menu');
const menuLateral = document.getElementById('menu-lateral');

btnMenu.onclick = function() {
	menuLateral.classList.toggle('oculto');
};

// 2. Accesibilidad: Aumentar/Reducir tamaño de letra
const btnAccesibilidad = document.getElementById('btn-accesibilidad');
const iframePrincipal = document.getElementById('iframe-principal');

let nivelLetra = 0;
const tamanos = ['16px', '20px', '24px'];

// Función que aplica el tamaño a la carcasa Y al iframe
function aplicarTamanoLetra() {
	const nuevoTamano = tamanos[nivelLetra];

	// 1. Cambiamos la variable en la Carcasa (index.html)
	document.documentElement.style.setProperty('--tamano-fuente', nuevoTamano);

	// 2. Nos metemos en el Iframe y cambiamos la variable allí también
	try {
		if (iframePrincipal && iframePrincipal.contentDocument) {
			iframePrincipal.contentDocument.documentElement.style.setProperty('--tamano-fuente', nuevoTamano);
		}
	} catch (e) {
		console.log("Error de seguridad al acceder al iframe (normal si se abre en local).");
	}
}

if (btnAccesibilidad) {
	btnAccesibilidad.onclick = function() {
		nivelLetra = (nivelLetra + 1) % 3; // Pasa de 0 a 1, a 2, y vuelve a 0
		aplicarTamanoLetra();
	};
}

// TRUCO CLAVE: Cuando cambias de página en el menú, el iframe se resetea.
// Esto vuelve a aplicar el tamaño grande a la página nueva nada más cargar.
if (iframePrincipal) {
	iframePrincipal.addEventListener('load', function() {
		aplicarTamanoLetra();
	});
}

// 3. Navegación entre "Páginas"
function cambiarPagina() {
	// En móviles, ocultamos el menú tras hacer clic para mayor comodidad
	if(window.innerWidth <= 768) {
		menuLateral.classList.add('oculto');
	}
}

// 4. Validación y Corrección del Formulario
function procesarFormulario() {
	const divResultado = document.getElementById('resultado-evaluacion');
	const formulario = document.getElementById('formulario-evaluacion');
	
	// Variables para recoger valores
	const nombre = document.getElementById('nombre').value;
	const etiquetaEnlace = document.getElementById('etiqueta_enlace').value;
	
	// Recoger radio buttons
	const radiosCSS = document.getElementsByName('lenguaje_decoracion');
	let radioSeleccionado = "";
	for (let i = 0; i < radiosCSS.length; i++) {
		if (radiosCSS[i].checked) {
			radioSeleccionado = radiosCSS[i].value;
		}
	}

	// Recoger checkboxes
	const chkFlipped = document.getElementById('chk-flipped').checked;
	const chkAronson = document.getElementById('chk-aronson').checked;
	const chkMontessori = document.getElementById('chk-montessori').checked;

	// VALIDACIÓN: Comprobar que no hay campos vacíos obligatorios
	if (nombre.trim() === "") {
		mostrarMensaje(divResultado, "Por favor, escribe tu nombre.", "mal");
		return; // Sale de la función
	}
	if (radioSeleccionado === "") {
		mostrarMensaje(divResultado, "Por favor, responde a la pregunta 2.", "mal");
		return;
	}
	if (etiquetaEnlace === "") {
		mostrarMensaje(divResultado, "Por favor, selecciona una opción en la pregunta 3.", "mal");
		return;
	}

	// CORRECCIÓN: Calcular la nota si todo está validado
	let nota = 0;
	const totalPreguntas = 3; // (La de nombre no cuenta)
	let fallos = [];

	// Corregir P2 (CSS)
	if (radioSeleccionado === "css") {
		nota++;
	} else {
		fallos.push("Pregunta 2: El lenguaje de decoración es CSS.");
	}

	// Corregir P3 (Etiqueta <a\>)
	if (etiquetaEnlace === "a") {
		nota++;
	} else {
		fallos.push("Pregunta 3: La etiqueta correcta para enlaces es &lt;a&gt;.");
	}

	// Corregir P4 (Checkboxes - Flipped y Aronson correctos, Montessori incorrecto)
	if (chkFlipped === true && chkAronson === true && chkMontessori === false) {
		nota++;
	} else {
		fallos.push("Pregunta 4: Debías marcar 'Flipped Classroom' y 'Puzzle de Aronson'.");
	}

	// Mostrar Resultados
	let mensajeHTML = `<h3>Resultados para ${nombre}:</h3>`;
	mensajeHTML += `<p>Has acertado ${nota} de ${totalPreguntas} preguntas.</p>`;
	
	if (nota === totalPreguntas) {
		mensajeHTML += `<p>¡Excelente trabajo! Todo correcto.</p>`;
		mostrarMensaje(divResultado, mensajeHTML, "bien");
	} else {
		mensajeHTML += `<p><strong>Revisa tus respuestas:</strong></p><ul>`;
		for (let i = 0; i < fallos.length; i++) {
			mensajeHTML += `<li>${fallos[i]}</li>`;
		}
		mensajeHTML += `</ul>`;
		mostrarMensaje(divResultado, mensajeHTML, "mal");
	}
}

// Función de apoyo para mostrar mensajes
function mostrarMensaje(elemento, contenido, tipo) {
	elemento.style.display = "block";
	elemento.innerHTML = contenido;
	
	if (tipo === "bien") {
		elemento.className = "nota-bien";
	} else {
		elemento.className = "nota-mal";
	}
}

// Limpiar el aviso si se pulsa "Limpiar"
function ocultarResultado() {
	document.getElementById('resultado-evaluacion').style.display = "none";
}
