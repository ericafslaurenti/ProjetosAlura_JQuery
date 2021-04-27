$("#botao-placar").click(mostraPlacar);

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Erica";
    var numPalavras = $("#contador-palavras").text();
    
    var linha = novaLinha(usuario,numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.prepend(linha);
    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top;
    $("html, body").animate(
    {
        scrollTop: posicaoPlacar+"px"
    },1000);
}

function novaLinha(usuario,palavras){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href","#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(){
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(function(){
        linha.remove();
    },1000);
}//n esquecer de remover o fadeOut

function mostraPlacar(){
    $(".placar").stop().slideToggle(600);
}

$("#botao-sync").click(sincronizaPlacar);

function sincronizaPlacar(){
    var placar = [];
    var linhas = $("tbody>tr");

    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        var score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);
    });
    var dados = {
        placar: placar
    };
    $.post("http://localhost:3000/placar", dados,function(){
        console.log("Salvou o placar no servidor");
    })
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar", function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);
            $("tbody").append(linha);
        })
    });
}
//.show - fç q mostra | .hide - oculta | .toggle - faz as 2 coisas
//slideDown tem a mesma funcionalidade q a fç show, mas realiza a transição de uma maneira mais suave | slideUp é o contrário do slideDow | slideToggle faz as 2 coisas
//fadeOut faz com q o elemento desapareça da tela | fadeIn faz o contrário e o fadeToggle faz as 2 coisas.
//.stop - fç q pára o q estava fazendo no momento e dá sequencia a próxima
//pra cada data que eu recebo .each eu quero salvar 1 linha