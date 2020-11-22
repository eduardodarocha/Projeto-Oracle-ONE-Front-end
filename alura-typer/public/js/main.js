var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function() {
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	inicializaMarcadores();
	$("#botao-reiniciar").click(reiniciaJogo);
	atualizaPlacar();
	$("#usuarios").selectize({
		create: true,
		sortField: 'text'
	});
	$('.tooltip').tooltipster({
		trigger: "custom",

	});
});

function atualizaTempoInicial(tempo) {
	tempoInicial = tempo;
	$("#tempo-digitacao").text(tempo);
}

function atualizaTamanhoFrase() {
	var frase = $(".frase").text();

	var numPalavras = frase.split(" ").length; //conta o número de palavras que foram separadas pelo split

	var tamanhoFrase = $("#tamanho-frase");

	tamanhoFrase.text(numPalavras); //troca o texto dentro de tamanhoFrase para o que foi passado como parâmetro
};

function inicializaContadores() {
	campo.on("input", function() {
		var conteudo = campo.val();

		var qtPalavras = conteudo.split(/\S+/).length - 1;
		var conteudoSemEspaco = conteudo.replace(/\s+/g, '');

		$("#contador-palavras").text(qtPalavras);

		// var qtCaracteres = conteudo.length;
		var qtCaracteres = conteudoSemEspaco.length;
		$("#contador-caracteres").text(qtCaracteres);
	});
};

function inicializaCronometro() {
	campo.one("focus", function() {
		var tempoRestante = $("#tempo-digitacao").text();
		$("#botao-reiniciar").attr("disabled", true);
		var cronometroID = setInterval(function() {
			tempoRestante--;
			$("#tempo-digitacao").text(tempoRestante);
			if (tempoRestante < 1) {
				clearInterval(cronometroID);
				finalizaJogo();
			}
		}, 1000);
	});
};

function finalizaJogo() {
	campo.attr("disabled", true);
	$("#botao-reiniciar").attr("disabled", false);
	// campo.css("background-color", "lightgray");
	campo.toggleClass("campo-desativado");
	inserePlacar();
};

function inicializaMarcadores() {

	campo.on("input", function() {
		var frase = $(".frase").text();
		var digitado = campo.val();
		var comparavel = frase.substr(0, digitado.length);

		if (digitado == comparavel) {
			campo.addClass("borda-verde");
			campo.removeClass("borda-vermelha");
		} else {
			campo.addClass("borda-vermelha");
			campo.removeClass("borda-verde");
		}
	});
};

function reiniciaJogo() {
	campo.attr("disabled", false);
	campo.val("");
	$("#contador-palavras").text("0");
	$("#contador-caracteres").text("0");
	$("#tempo-digitacao").text(tempoInicial);
	inicializaCronometro();
	campo.toggleClass("campo-desativado");

	campo.removeClass("borda-vermelha");
	campo.removeClass("borda-verde");
};
