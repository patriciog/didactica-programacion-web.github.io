function procesarFormulario() {
    const divResultado = document.querySelector('#resultado-evaluacion');
    const nombre = document.querySelector('#nombre').value.trim();

    // VALIDACIÓN: Nombre
    if (nombre === "") {
        mostrarMensaje(divResultado, "Por favor, escribe tu nombre.", "mal");
        return;
    }

    // Configuración de respuestas
    const datosPreguntas = {
        q1: { tipo: "radio", correcta: "a", feedback: "El body contiene lo visible." },
        q2: { tipo: "radio", correcta: "a", feedback: "La jerarquía es vital para el SEO y accesibilidad." },
        q3: { tipo: "select", correcta: "style", feedback: "Atributo 'style' para CSS en línea." },
        q4: { tipo: "checkbox_group", correcta: ["html", "python"], feedback: "HTML y Python son los lenguajes correctos." },
        q5: { tipo: "select_multiple", correcta: ["img", "br"], feedback: "Las etiquetas <img> y <br> no necesitan cierre independiente." }
    };

    let nota = 0;
    let fallos = [];
    const idsPreguntas = Object.keys(datosPreguntas);

    for (let id of idsPreguntas) {
        const config = datosPreguntas[id];
        let valorUsuario = null;
        let respondida = false;

        // Lógica según el tipo de campo
        if (config.tipo === "radio") {
            const el = document.querySelector(`input[name="${id}"]:checked`);
            if (el) {
                valorUsuario = el.value;
                respondida = true;
            }
        } 
        else if (config.tipo === "select") {
            const el = document.getElementById(id);
            valorUsuario = el.value;
            if (valorUsuario !== "") respondida = true;
        } 
        else if (config.tipo === "checkbox_group") {
            const checks = Array.from(document.querySelectorAll(`input[name="${id}"]:checked`))
                                .map(c => c.value);
            if (checks.length > 0) {
                valorUsuario = checks;
                respondida = true;
            }
        } 
        else if (config.tipo === "select_multiple") {
            const el = document.getElementById(id);
            const seleccionados = Array.from(el.selectedOptions).map(opt => opt.value);
            if (seleccionados.length > 0) {
                valorUsuario = seleccionados;
                respondida = true;
            }
        }

        // Validar si se dejó en blanco
        if (!respondida) {
            mostrarMensaje(divResultado, `Falta responder la pregunta ${id.replace('q','')}.`, "mal");
            return;
        }

        // Corrección
        let esCorrecta = false;
        if (Array.isArray(config.correcta)) {
            // Comparar arrays (ambos deben tener los mismos elementos)
            esCorrecta = valorUsuario.length === config.correcta.length && 
                         valorUsuario.every(v => config.correcta.includes(v));
        } else {
            esCorrecta = valorUsuario === config.correcta;
        }

        if (esCorrecta) {
            nota++;
        } else {
            fallos.push(`<strong>Pregunta ${id.replace('q','')}:</strong> ${config.feedback} <br><small>Respuesta correcta: ${config.correcta}</small>`);
        }
    }

    // Mostrar resultados finales
    let htmlFinal = `<h3>Estudiante: ${nombre}</h3>`;
    htmlFinal += `<p>Nota final: <strong>${nota} / ${idsPreguntas.length}</strong></p>`;
    
    if (nota === idsPreguntas.length) {
        htmlFinal += `<p>¡Felicidades! Has aprobado con la máxima puntuación.</p>`;
        mostrarMensaje(divResultado, htmlFinal, "bien");
    } else {
        htmlFinal += `<p>Revisa los siguientes puntos:</p><ul>`;
        fallos.forEach(f => htmlFinal += `<li style="margin-bottom:10px;">${f}</li>`);
        htmlFinal += `</ul>`;
        mostrarMensaje(divResultado, htmlFinal, "mal");
    }
}

function mostrarMensaje(elemento, contenido, tipo) {
    elemento.style.display = "block";
    elemento.innerHTML = contenido;
    if (tipo === "bien") {
        elemento.style.backgroundColor = "#d4edda";
        elemento.style.color = "#155724";
        elemento.style.border = "1px solid #c3e6cb";
    } else {
        elemento.style.backgroundColor = "#f8d7da";
        elemento.style.color = "#721c24";
        elemento.style.border = "1px solid #f5c6cb";
    }
}

function ocultarResultado() {
    document.querySelector('#resultado-evaluacion').style.display = "none";
}