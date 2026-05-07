// Validación y Corrección del Formulario
function procesarFormulario() {
    const divResultado = document.querySelector('#resultado-evaluacion');
    const nombre = document.querySelector('#nombre').value.trim();

    // VALIDACIÓN: Comprobar que el nombre no está vacío
    if (nombre === "") {
        mostrarMensaje(divResultado, "Por favor, escribe tu nombre.", "mal");
        return; // Sale de la función
    }

    // Definición de las respuestas correctas y el feedback extraído del JSON
    const datosPreguntas = {
        q1: { correcta: "a", feedback: "Esta etiqueta actúa como el lienzo donde se coloca todo lo que el usuario final verá en su navegador." },
        q2: { correcta: "a", feedback: "La jerarquía ayuda a los buscadores y usuarios a entender la organización lógica del contenido." },
        q3: { correcta: "a", feedback: "El uso de etiquetas vinculadas es un estándar de accesibilidad que ayuda a lectores de pantalla y facilita la interacción." },
        q4: { correcta: "a", feedback: "Este atributo indica en qué ventana o marco se debe cargar el recurso enlazado." },
        q5: { correcta: "a", feedback: "La igualdad estricta compara tanto el valor numérico como el tipo de dato (número frente a cadena de texto)." },
        q6: { correcta: "a", feedback: "'for' es una palabra clave reservada que se utiliza para crear bucles en la lógica del lenguaje." },
        q7: { correcta: "a", feedback: "En programación, los índices de las colecciones de datos ordenadas suelen comenzar en cero." },
        q8: { correcta: "a", feedback: "El padding añade 'aire' dentro de la caja, mientras que el margin separa la caja de sus vecinas." },
        q9: { correcta: "a", feedback: "Las unidades relativas facilitan el diseño responsivo al escalar según la configuración del usuario o del navegador." },
        q10: { correcta: "a", feedback: "El símbolo de almohadilla se utiliza para identificar de forma única a un elemento por su ID." }
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
            mostrarMensaje(divResultado, `Por favor, responde a la pregunta ${i}.`, "mal");
            return; 
        }

        // Si está respondida, corregir
        if (valorSeleccionado === datosPreguntas[nombrePregunta].correcta) {
            nota++;
        } else {
            fallos.push(`<strong>Pregunta ${i}:</strong> ${datosPreguntas[nombrePregunta].feedback}`);
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
