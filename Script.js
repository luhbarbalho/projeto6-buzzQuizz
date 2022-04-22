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