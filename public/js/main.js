var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase(){
    var frase = $(".frase").text(); //busca minha frase, retornando o elemento q tem essa classe
    var numPalavras = frase.split(" ").length; //pega o tamanho da frase - quebrando -a em palavras
    var tamanhoFrase = $("#tamanho-frase");//pega meu span - seleciona o meu nº da 1ª li
    tamanhoFrase.text(numPalavras);//troca o valor do span usando o .text passando o nº de palavras
}

function inicializaContadores(){
    campo.on("input", function() {//qdo alguém estiver colocando dados no meu campo, essa fç é executada - o evento de input é um marcador de caracteres\\
        var conteudo = campo.val();//.val acessa o valor dos inputs do usuário\\
    
        var qtdPalavras = conteudo.split(/\S+/).length -1;//(/\S+/)expressão regular q busca por qlq espaço vazio. o -1 deixa o jogo + preciso\\
        $("#contador-palavras").text(qtdPalavras);
    
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro(){
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function(){ //evento focus é específico pra qdo vc entrar no campo
        var cronometroID = setInterval(function(){ //executa a fç de acordo c/ o  tempo estipulado no parâmetro
            tempoRestante--; //Nesse caso o tempo vai descrecer de 1 em 1s
        //console.log(tempoRestante);
            $("#tempo-digitacao").text(tempoRestante); //vai subtrair de 1 e atualizar o valor do tempo restante
            if(tempoRestante < 1){

                clearInterval(cronometroID);//qdo tempo <0, dá um clearInterval
				finalizaJogo();
            }
        },1000);
    });
}

function finalizaJogo(){
    campo.attr("disabled",true);//o atributo disabled n possui valor, só queremos colocá-lo na tag Temos q informar isso passando o valor true p/ a fç, "habilitando" assim o atributo
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores(){
    var frase = $(".frase").text()
campo.on("input", function(){
    var digitado = campo.val();
    var comparavel = frase.substr(0,digitado.length);

    if(digitado == comparavel){
       campo.addClass("borda-verde");
       campo.removeClass("borda-vermelha");
    }else{
        campo.addClass("borda-vermelha");
        campo.removeClass("borda-verde");
    }
});
}

function reiniciaJogo(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}

//a fç one só funciona no evento 1x, diferente da on q fica o tempo todo escutando o evento.
//$atalho pra fç Jquery
//.text() - fç usada p/ obter o texto da minha frase
//.text(numPalavras) qdo passada sem argumento ela pega, qd passado com, ela coloca
//.attr() coloca, retira ou modifica valores de atributos de elementos HTML. True coloca, false remove
//campo.val(""); zera o meu campo
//$("#contador-caracteres").text("0"); zera i campo de caracteres
//$(document).ready(function() fç q espera todo carregamento da pág e depois executa o q está dentro dela. Atalho dessa fuç: $(function()
//addClass aciciona uma classe
//toggleClass() adiciona e remove classes
//append adiciona depois e a prepend antes do conteúdo tbody
//a tag <a> te direciona p/ um link ou id na página