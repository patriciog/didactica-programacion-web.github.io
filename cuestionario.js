function procesarFormulario() {
    const divResultado = document.querySelector('#resultado-evaluacion');
    const nombre = document.querySelector('#nombre').value.trim();

    // 1. VALIDACIÓN: Nombre vacío
    if (nombre === "") {
        mostrarMensaje(divResultado, "Por favor, escribe tu nombre.", "mal");
        return;
    }

    // Configuración de respuestas correctas
    // Para q4 (múltiple), usamos un array ordenado alfabéticamente para facilitar la comparación
    const datosPreguntas = {
        q1: { tipo: "radio", correcta: "a", feedback: "El <body> contiene todo lo visible para el usuario." },
        q2: { tipo: "radio", correcta: "a", feedback: "Los encabezados deben seguir una estructura jerárquica lógica." },
        q3: { tipo: "select", correcta: "style", feedback: "El atributo 'style' permite aplicar CSS directamente en el elemento." },
        q4: { tipo: "multiple", correcta: ["html", "python"], feedback: "HTML y Python son lenguajes; VHS es un formato de video antiguo." },
        q5: { tipo: "checkbox", correcta: true, feedback: "El atributo 'alt' es clave para que los lectores de pantalla describan imágenes." }
    };

    let nota = 0;
    let fallos = [];
    const totalPreguntas = Object.keys(datosPreguntas).length;

    // 2. PROCESAMIENTO DE RESPUESTAS
    for (let id in datosPreguntas) {
        const config = datosPreguntas[id];
        let valorUsuario = null;
        let respondida = false;

        if (config.tipo === "radio") {
            const seleccion = document.querySelector(`input[name="${id}"]:checked`);
            if (seleccion) {
                valorUsuario = seleccion.value;
                respondida = true;
            }
        } 
        else if (config.tipo === "select") {
            const el = document.getElementById(id);
            valorUsuario = el.value;
            if (valorUsuario !== "") respondida = true;
        } 
        else if (config.tipo === "multiple") {
            const seleccionados = Array.from(document.querySelectorAll(`input[name="${id}"]:checked`))
                                       .map(el => el.value);
            if (seleccionados.length > 0) {
                valorUsuario = seleccionados;
                respondida = true;
            }
        } 
        else if (config.tipo === "checkbox") {
            const el = document.getElementById(id);
            valorUsuario = el.checked;
            // En un checkbox único de confirmación, interpretamos que no marcarlo es "no contestar" 
            // o "responder falso". Aquí validaremos que al menos se haya interactuado si fuera necesario, 
            // pero para este test, el valor es el estado del check.
            respondida = true; 
        }

        // VALIDACIÓN: ¿Ha contestado?
        if (!respondida) {
            mostrarMensaje(divResultado, `Por favor, responde a la pregunta ${id.replace('q', '')}.`, "mal");
            return;
        }

        // CORRECCIÓN
        let esCorrecta = false;
        if (config.tipo === "multiple") {
            // Comparamos arrays: deben tener el mismo tamaño y mismos elementos
            esCorrecta = valorUsuario.length === config.correcta.length && 
                         valorUsuario.every(v => config.correcta.includes(v));
        } else {
            esCorrecta = valorUsuario === config.correcta;
        }

        if (esCorrecta) {
            nota++;
        } else {
            fallos.push(`<strong>Pregunta ${id.replace('q', '')}:</strong> ${config.feedback} (Respuesta correcta: ${config.correcta})`);
        }
    }

    // 3. MOSTRAR RESULTADOS
    let mensajeHTML = `<h3>Resultados para ${nombre}:</h3>`;
    mensajeHTML += `<p>Has acertado ${nota} de ${totalPreguntas} preguntas.</p>`;
    
    if (nota === totalPreguntas) {
        mensajeHTML += `<p>¡Excelente trabajo! Todo está correcto.</p>`;
        mostrarMensaje(divResultado, mensajeHTML, "bien");
    } else {
        mensajeHTML += `<p><strong>Revisa tus errores:</strong></p><ul>`;
        fallos.forEach(f => mensajeHTML += `<li style="margin-bottom: 10px;">${f}</li>`);
        mensajeHTML += `</ul>`;
        mostrarMensaje(divResultado, mensajeHTML, "mal");
    }
}

function mostrarMensaje(elemento, contenido, tipo) {
    elemento.style.display = "block";
    elemento.innerHTML = contenido;
    elemento.style.border = "1px solid";
    if (tipo === "bien") {
        elemento.style.backgroundColor = "#d4edda";
        elemento.style.color = "#155724";
    } else {
        elemento.style.backgroundColor = "#f8d7da";
        elemento.style.color = "#721c24";
    }
}

function ocultarResultado() {
    const res = document.querySelector('#resultado-evaluacion');
    res.style.display = "none";
    res.innerHTML = "";
}