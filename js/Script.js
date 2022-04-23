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
    } if (URL(urlQuizz) === true) {
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

    perguntaCerto = 0;

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


    if (perguntaInput.length >= 20) {
        perguntaCerto += 2;
    } if (hexadecimal(perguntaCor) === true) {
        perguntaCerto += 2;
    } if ((respostaCorreta).length !== 0) {
        perguntaCerto += 3;
    } if (URL(URLrespostaCorreta) === true) {
        perguntaCerto += 3;
    } if ((respostaIncorreta1).length !== 0) {
        perguntaCerto += 4;
    } if (URL(URLrespostaIncorreta1) === true) {
        perguntaCerto += 4;
    } if ((respostaIncorreta2).length !== 0) {
        perguntaCerto += 0.25;
    } if (URL(URLrespostaIncorreta2) === true) {
        perguntaCerto += 0.25;
    } if ((respostaIncorreta3).length !== 0) {
        perguntaCerto += 0.25;
    } if (URL(URLrespostaIncorreta3) === true) {
        perguntaCerto += 0.25;
    };

    console.log(perguntaCerto);

    function hexadecimal(teste) {

        regexp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/g;
        if (regexp.test(teste)) {
            return true;
        } else {
            return false;
        }
    }
    


    if (perguntaCerto >= 18) {
        document.querySelector(".criePerguntas").classList.add("escondido");
        document.querySelector(".decidaNiveis").classList.remove("escondido");
    } if (perguntaCerto < 18) {
        alert("Tem alguma informação errada aí!");
    }
}



function URL(testeURL) {

    regexp = (/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/);
    if (regexp.test(testeURL)) {
        return true;
    } else {
        return false;
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
    } if (URL(urlimg) === true) {
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
