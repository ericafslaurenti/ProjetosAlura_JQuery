var frase = $(".frase").text(); //busca minha frase, retornando o elemento q tem essa classe\\
var numPalavras = frase.split(" ").length; //pega o tamanho da frase - quebrando -a em palavras\\
var tamanhoFrase = $("#tamanho-frase");//pega meu span - seleciona o meu nº da 1ª li\\

tamanhoFrase.text(numPalavras);//troca o valor do span usando o .text passando o nº de palavras\\

var campo = $(".campo-digitacao");
campo.on("input", function() {//qdo alguém estiver colocando dados no meu campo, essa fç é executada - o evento de input é um marcador de caracteres\\
    var conteudo = campo.val();//.val acessa o valor dos inputs do usuário\\

    var qtdPalavras = conteudo.split(/\S+/).length -1;//(/\S+/)expressão regular q busca por qlq espaço vazio. o -1 deixa o jogo + preciso\\
    $("#contador-palavras").text(qtdPalavras);

    var qtdCaracteres = conteudo.length;
    $("#contador-caracteres").text(qtdCaracteres);
});

var tempoRestante = $("#tempo-digitacao").text();
campo.one("focus", function(){ //evento focus é específico pra qdo vc entrar no campo
    var cronometroID = setInterval(function(){ //executa a fç de acordo c/ o  tempo estipulado no parâmetro
        tempoRestante--; //Nesse caso o tempo vai descrecer de 1 em 1s
        //console.log(tempoRestante);
        $("#tempo-digitacao").text(tempoRestante); //vai subtrair de 1 e atualizar o valor do tempo restante
        if(tempoRestante < 1){
            campo.attr("disabled",true);//o atributo disabled n possui valor, só queremos colocá-lo na tag Temos q informar isso passando o valor true p/ a fç, "habilitando" assim o atributo
            clearInterval(cronometroID);//qdo tempo <0, dá um clearInterval
        }
    },1000);
});

//a fç one só funciona no evento 1x, diferente da on q fica o tempo todo escutando o evento.
//$atalho pra fç Jquery//
//.text() - fç usada p/ obter o texto da minha frase\\
//.text(numPalavras) qdo passada sem argumento ela pega, qd passado com, ela coloca\\