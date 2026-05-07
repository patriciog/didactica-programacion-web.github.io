// Validación y Corrección del Formulario
function procesarFormulario() {
    const divResultado = document.querySelector('#resultado-evaluacion');
    const nombre = document.querySelector('#nombre').value.trim();

    // VALIDACIÓN: Comprobar que el nombre no está vacío
    if (nombre === "") {
        mostrarMensaje(divResultado, "Por favor, escribe tu nombre.", "mal");
        return; // Sale de la función
    }

    // Definición de las respuestas correctas y el feedback para cada una
    // (En la estructura HTML generada, la opción correcta siempre se asignó al value "a")
    const datosPreguntas = {
        q1: { correcta: "a", feedback: "El texto define explícitamente a HTML como el esqueleto o base estructural de la web." },
        q2: { correcta: "a", feedback: "La estructura fundamental se basa en pares de etiquetas de apertura y cierre." },
        q3: { correcta: "a", feedback: "La etiqueta &lt;body&gt; es el contenedor de todo lo que el usuario puede ver." },
        q4: { correcta: "a", feedback: "Esta etiqueta es un requisito obligatorio y no debe duplicarse." },
        q5: { correcta: "a", feedback: "La jerarquía de encabezados va desde el nivel 1 (&lt;h1&gt;) hasta el 6 (&lt;h6&gt;)." },
        q6: { correcta: "a", feedback: "Se aconseja limitar el &lt;h1&gt; a una única instancia como título principal." },
        q7: { correcta: "a", feedback: "La etiqueta designada para bloques de texto de tipo párrafo es &lt;p&gt;." },
        q8: { correcta: "a", feedback: "Textos y multimedia son el contenido que completa y rellena el esqueleto." },
        q9: { correcta: "a", feedback: "Dado que el &lt;h1&gt; es el principal, los niveles del &lt;h2&gt; al &lt;h6&gt; se usan para subtítulos." },
        q10: { correcta: "a", feedback: "Imágenes y vídeos son ejemplos de contenido visible del contenedor principal." }
    };

    const totalPreguntas = 10;
    let nota = 0;
    let fallos = [];

    // VALIDACIÓN y CORRECCIÓN de las 10 preguntas
    for (let i = 1; i <= totalPreguntas; i++) {
        const nombrePregunta = "q" + i;
        const opciones = document.querySelectorAll(`[name="${nombrePregunta}"]`);
        let respondida = false;
        let valorSeleccionado = "";

        // Comprobar qué radio button está seleccionado en la pregunta actual
        for (let j = 0; j < opciones.length; j++) {
            if (opciones[j].checked) {
                respondida = true;
                valorSeleccionado = opciones[j].value;
                break;
            }
        }

        // Si no se ha respondido, detener la corrección y avisar al usuario
        if (!respondida) {
            mostrarMensaje(divResultado, `Por favor, responde a la pregunta ${i + 1}.`, "mal");
            return; 
        }

        // Si está respondida, corregir
        if (valorSeleccionado === datosPreguntas[nombrePregunta].correcta) {
            nota++;
        } else {
            // El índice visual de la pregunta es i + 1 (porque la 1 es el nombre)
            fallos.push(`<strong>Pregunta ${i + 1}:</strong> ${datosPreguntas[nombrePregunta].feedback}`);
        }
    }

    // MOSTRAR RESULTADOS
    let mensajeHTML = `<h3>Resultados para ${nombre}:</h3>`;
    mensajeHTML += `<p>Has acertado ${nota} de ${totalPreguntas} preguntas.</p>`;
    
    if (nota === totalPreguntas) {
        mensajeHTML += `<p>¡Excelente trabajo! Todo correcto.</p>`;
        mostrarMensaje(divResultado, mensajeHTML, "bien");
    } else {
        mensajeHTML += `<p><strong>Revisa tus respuestas:</strong></p><ul style="text-align: left;">`;
        for (let i = 0; i < fallos.length; i++) {
            mensajeHTML += `<li style="margin-bottom: 8px;">${fallos[i]}</li>`;
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

// Limpiar el aviso si se pulsa el botón "Limpiar"
function ocultarResultado() {
    document.querySelector('#resultado-evaluacion').style.display = "none";
}
