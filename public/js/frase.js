$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria() {
    $.get("http://localhost:3000/frases", function() {

    });
}

//assíncrono: sem atrapalhar o fluxo da nossa aplicação