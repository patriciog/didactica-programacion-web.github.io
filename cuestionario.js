function procesarFormulario() {
    const divResultado = document.querySelector('#resultado-evaluacion');
    const nombre = document.querySelector('#nombre').value.trim();

    if (nombre === "") {
        mostrarMensaje(divResultado, "Por favor, escribe tu nombre.", "mal");
        return;
    }

    const datosPreguntas = {
        q1: { tipo: "radio", correcta: "Almacena el contenido visible", feedback: "El body contiene lo que el usuario ve." },
        q2: { tipo: "radio", correcta: "De forma jerárquica por importancia", feedback: "La jerarquía h1-h6 organiza el contenido por importancia." },
        q3: { tipo: "select", correcta: "style", feedback: "El atributo 'style' se usa para CSS inline." },
        q4: { tipo: "checkbox_group", correcta: ["html", "python"], feedback: "HTML y Python son lenguajes; VHS no." },
        q5: { tipo: "select_multiple", correcta: ["br", "img"], feedback: "img y br son elementos vacíos." }
    };

    let nota = 0;
    let fallos = [];

    for (let id in datosPreguntas) {
        const config = datosPreguntas[id];
        let valorUsuario = null;
        let respondida = false;

        if (config.tipo === "radio") {
            // BUSQUEDA POR NAME para los radios
            const opciones = document.getElementsByName(id);
            for (let opt of opciones) {
                if (opt.checked) {
                    valorUsuario = opt.value;
                    respondida = true;
                    break;
                }
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
            valorUsuario = Array.from(el.selectedOptions).map(opt => opt.value);
            if (valorUsuario.length > 0) respondida = true;
        }

        if (!respondida) {
            mostrarMensaje(divResultado, `Falta la pregunta ${id.replace('q','')}.`, "mal");
            return;
        }

        // CORRECCIÓN
        let esCorrecta = false;
        if (Array.isArray(config.correcta)) {
            const resCorrecta = [...config.correcta].sort().join(',');
            const resUsuario = [...valorUsuario].sort().join(',');
            esCorrecta = (resCorrecta === resUsuario);
        } else {
            esCorrecta = (valorUsuario === config.correcta);
        }

        if (esCorrecta) {
            nota++;
        } else {
            fallos.push(`<strong>Pregunta ${id.replace('q','')}:</strong> ${config.feedback} (Correcta: ${config.correcta})`);
        }
    }

    let htmlFinal = `<h3>Resultado: ${nombre}</h3><p>Nota: ${nota} / 5</p>`;
    if (nota === 5) {
        htmlFinal += `<p>¡Perfecto!</p>`;
        mostrarMensaje(divResultado, htmlFinal, "bien");
    } else {
        htmlFinal += `<ul>`;
        fallos.forEach(f => htmlFinal += `<li>${f}</li>`);
        htmlFinal += `</ul>`;
        mostrarMensaje(divResultado, htmlFinal, "mal");
    }
}

function mostrarMensaje(elemento, contenido, tipo) {
    elemento.style.display = "block";
    elemento.innerHTML = contenido;
    elemento.style.padding = "15px";
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