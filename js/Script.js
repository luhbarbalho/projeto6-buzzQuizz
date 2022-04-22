let numeroQuizzes = 0;

function criarQuizz() {
    const main = document.querySelector("main");
    main.classList.add("escondido");
    const comeco = document.querySelector(".comeceComeco");
    comeco.classList.remove("escondido");
}

function criarPerguntas() {
    const comeco = document.querySelector(".comeceComeco");
    comeco.classList.add("escondido");
    const perguntas = document.querySelector(".criePerguntas");
    perguntas.classList.remove("escondido");
}

function criarNiveis() {
    const perguntas = document.querySelector(".criePerguntas");
    perguntas.classList.add("escondido");
    const niveis = document.querySelector(".decidaNiveis");
    niveis.classList.remove("escondido");
}

function quizzFeito() {
    numeroQuizzes ++;
    const niveis = document.querySelector(".decidaNiveis");
    niveis.classList.add("escondido");
    const pronto = document.querySelector("section.quizzPronto");
    pronto.classList.remove("escondido");
    console.log(pronto)
}

function voltarHome() {
    const pronto = document.querySelector("section.quizzPronto");
    pronto.classList.add("escondido");
    const main = document.querySelector("main");
    main.classList.remove("escondido");

    const nenhumQuizz = document.querySelector(".nao-tem-quizz");
    nenhumQuizz.classList.add("escondido");
    const temQuizz = document.querySelector(".meus-quizzes");
    temQuizz.classList.remove("escondido");
}