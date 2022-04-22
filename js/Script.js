let numeroQuizzes = 0;
let basicoCerto;
let perguntaCerto;
let nivelCerto;
let quantPerguntas;
let quantNiveis;
const main = document.querySelector("main");

function criarQuizz() {
    main.classList.add("escondido");
    document.querySelector(".comeceComeco").classList.remove("escondido");
}


function conferenciaBasica() {
    basicoCerto = 0;

    const tituloQuizz = document.querySelector(".tituloQuizz").value;
    const urlQuizz = document.querySelector(".urlQuizz").value;
    quantPerguntas = document.querySelector(".quantPerguntas").value;
    quantNiveis = document.querySelector(".quantNiveis").value;


    if ((tituloQuizz.length >= 20) && (tituloQuizz.length <= 65)){
        basicoCerto += 1;
    } if (typeof urlQuizz == 'string') { // AJEITAR O CÓDIGO PARA TESTAR URL.
        basicoCerto += 1;
    } if (parseInt(quantPerguntas) >= 3) {
        basicoCerto += 1;
    } if (parseInt(quantNiveis) >=2) {
        basicoCerto += 1;
    }
    if (basicoCerto == 4) {
        document.querySelector(".comeceComeco").classList.add("escondido");
        document.querySelector(".criePerguntas").classList.remove("escondido");
    } if (basicoCerto < 4) {
        alert("Tem alguma informação errada aí!");
    }
}




function conferenciaPergunta() {

    perguntaCerto = 0

    const perguntaInput = document.querySelector(".perguntaInput").value;
    const perguntaCor = document.querySelector(".perguntaCor").value;
    const respostaCorreta = document.querySelector(".respostaCorreta").value;
    const URLrespostaCorreta = document.querySelector(".URLrespostaCorreta").value;

    const respostaIncorreta1 = document.querySelector(".respostaIncorreta1").value;
    const URLrespostaIncorreta1 = document.querySelector(".URLrespostaIncorreta1").value;
    const respostaIncorreta2 = document.querySelector(".respostaIncorreta2").value;
    const URLrespostaIncorreta2 = document.querySelector(".URLrespostaIncorreta2").value;
    const respostaIncorreta3 = document.querySelector(".respostaIncorreta3").value;
    const URLrespostaIncorreta3 = document.querySelector(".URLrespostaIncorreta3").value;


    if ((perguntaInput.length >= 20) && (typeof perguntaInput == 'string')){
        perguntaCerto += 2;
    } if (typeof perguntaCor == 'string') { // AJEITAR O CÓDIGO PARA TESTAR #hexacdecimal.
        perguntaCerto += 2;
    } if ((typeof respostaCorreta == 'string')&&(respostaCorreta !== " ")) {
        perguntaCerto += 2;
    } if (typeof URLrespostaCorreta == 'string') {// AJEITAR O CÓDIGO PARA TESTAR URL.
        perguntaCerto += 2;
    } if ((typeof respostaIncorreta1 == 'string')&&(respostaIncorreta1 !== " ")) {
        perguntaCerto += 2;
    } if (typeof URLrespostaIncorreta1 == 'string') {// AJEITAR O CÓDIGO PARA TESTAR URL.
        perguntaCerto += 2;
    } if ((typeof respostaIncorreta2 == 'string')&&(respostaIncorreta2 !== " ")) {
        perguntaCerto += 1;
    } if (typeof URLrespostaIncorreta2 == 'string') {// AJEITAR O CÓDIGO PARA TESTAR URL.
        perguntaCerto += 1;
    } if ((typeof respostaIncorreta3 == 'string')&&(respostaIncorreta3 !== " ")) {
        perguntaCerto += 1;
    } if (typeof URLrespostaIncorreta3 == 'string') {// AJEITAR O CÓDIGO PARA TESTAR URL.
        perguntaCerto += 1;
    }

    

    if (perguntaCerto >= 12) {
        document.querySelector(".criePerguntas").classList.add("escondido");
        document.querySelector(".decidaNiveis").classList.remove("escondido");
    } if (perguntaCerto < 12) {
        alert("Tem alguma informação errada aí!");
    }
}






function conferenciaNiveis() {
    nivelCerto = 0;

    const tituloNivel = document.querySelector(".tituloNivel").value;
    const acerto = document.querySelector(".acerto").value;
    const urlimg = document.querySelector(".urlimg").value;
    const descricaoNivel = document.querySelector(".descricaoNivel").value;


    if ((tituloNivel.length >= 10) && (typeof tituloNivel == 'string')){
        nivelCerto += 1;
    } if ((parseInt(acerto) >= 0) && (parseInt(acerto) <= 100)) {
        nivelCerto += 1;
    } if (typeof urlimg == 'string') {// AJEITAR O CÓDIGO PARA TESTAR URL.
        nivelCerto += 1;
    } if ((descricaoNivel.length >= 30) && (typeof descricaoNivel == 'string')) {
        nivelCerto += 1;
    }


    if (nivelCerto == 4) {
        document.querySelector(".decidaNiveis").classList.add("escondido");
        document.querySelector(".finalizarQuizz").classList.remove("escondido");
    } if (nivelCerto < 4) {
        alert("Tem alguma informação errada aí!");
    }


}


function voltarHome() {
    document.querySelector(".finalizarQuizz").classList.add("escondido");
    main.classList.remove("escondido");

    document.querySelector(".nao-tem-quizz").classList.add("escondido");
    document.querySelector(".meus-quizzes").classList.remove("escondido");
}
