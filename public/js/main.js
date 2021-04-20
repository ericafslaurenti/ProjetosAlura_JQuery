var frase = $(".frase").text(); //busca minha frase, retornando o elemento q tem essa classe\\
var numPalavras = frase.split(" ").length; //pega o tamanho da frase - quebrando -a em palavras\\
var tamanhoFrase = $("#tamanho-frase");//pega meu span - seleciona o meu nº da 1ª li\\

tamanhoFrase.text(numPalavras);//troca o valor do span usando o .text passando o nº de palavras\\

//$atalho pra fç Jquery//
//.text() - fç usada p/ obter o texto da minha frase\\
//.text(numPalavras) qdo passada sem argumento ela pega, qd passado com, ela coloca\\