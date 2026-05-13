// 1. Mostrar/Ocultar Menú Lateral
const btnMenu = document.querySelector('#btn-menu');
const menuLateral = document.querySelector('#menu-lateral');

// En móviles, oculto de inicio
if(window.innerWidth <= 768) {
	menuLateral.classList.add('oculto');
}

btnMenu.onclick = function() {
	menuLateral.classList.toggle('oculto');
};

// 2. Accesibilidad: Aumentar/Reducir tamaño de letra
const btnAccesibilidad = document.querySelector('#btn-accesibilidad');
const iframePrincipal = document.querySelector('#iframe-principal');

let nivelLetra = 0;
const tamanos = ['16px', '20px', '24px'];

// Función que aplica el tamaño a la carcasa Y al iframe
function aplicarTamanoLetra() {
    const nuevoTamano = tamanos[nivelLetra];

    // 1. Aplicar a la ventana principal (index3.txt) 
    document.documentElement.style.setProperty('--tamano-fuente', nuevoTamano);

    // 2. Aplicar al contenido del iframe (html53.txt) 
    try {
        if (iframePrincipal) {
            // Accedemos al documento interno del iframe 
            const docIframe = iframePrincipal.contentDocument || iframePrincipal.contentWindow.document;
            if (docIframe && docIframe.documentElement) {
                docIframe.documentElement.style.setProperty('--tamano-fuente', nuevoTamano);
            }
        }
    } catch (e) {
        // Este error es común si intentas probarlo abriendo el archivo localmente (doble clic)
        // por restricciones de seguridad del navegador (CORS).
        console.log("Aviso: No se puede acceder al iframe. Usa un servidor local (Live Server).");
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
