const checkbox = document.querySelectorAll('input[name="q4"]');

checkbox.forEach(c => {
    c.addEventListener('change', validarGrupoCheckbox);
});

function procesarFormulario(event) {
    event.preventDefault();
    const divResultado = document.querySelector('#resultado-evaluacion');
    const formulario = document.getElementById('formulario-evaluacion');
    const nombre = document.querySelector('#nombre').value.trim();
    validarGrupoCheckbox();
    
    const datos = new FormData(formulario);
    const q1 = datos.get('q1');
    const q2 = datos.get('q2');
    const q3 = datos.getAll('q3');
    const q4 = datos.getAll('q4');
    const q5 = datos.getAll('q5');

    let correctas = 0;
    let fallos = [];

    if(q1 == 'a'){
        correctas++;
    }else{
            fallos.push(`<strong>Pregunta 1:</strong> El body contiene lo que el usuario ve. (Correcta: Almacena el contenido visible)`);
    }

    if(q2 == 'a'){
        correctas++
    }else{
        fallos.push(`<strong>Pregunta 2:</strong> La jerarquía h1-h6 organiza el contenido por importancia. (Correcta: De forma jerárquica por importancia)`);
    }

    if(q3.length == 1 && q3[0] == "style"){
        correctas++
    }else{
        fallos.push(`<strong>Pregunta 3:</strong> El atributo 'style' se usa para CSS inline. (Correcta: style)`);
    }

    if(q4.length == 2 && q4.includes('html') && q4.includes('python')){
        correctas++
    }else{
        fallos.push(`<strong>Pregunta 4:</strong> HTML y Python son lenguajes; VHS no. (Correcta: ["html", "python"])`);
    }

    if(q5.length == 2 && q5.includes('img') && q5.includes('br')){
        correctas++
    }else{
        fallos.push(`<strong>Pregunta 5:</strong> img y br son elementos vacíos. (Correcta: ["br", "img"])`);
    }

    let htmlFinal = `<h3>Resultado: ${nombre}</h3><p>Nota: ${correctas} / 5</p>`;
    if(correctas == 5){
        mostrarMensaje(divResultado, htmlFinal, "bien");
    }else{
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

function validarGrupoCheckbox(){
    const checkbox = document.querySelectorAll('input[name="q4"]');
    const isCheck = Array.from(checkbox).some(checkbox => checkbox.checked);

    const primerCheckbox = checkbox[0];

    if(!isCheck){
        primerCheckbox.setCustomValidity("Debes seleccionar al menos una opción");
    }else{
        primerCheckbox.setCustomValidity("");
    }
}