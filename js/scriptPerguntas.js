let basicoCerto;
let perguntaCerto;


function conferenciaBasica() {
    basicoCerto = 0;

    const tituloQuizz = document.querySelector(".tituloQuizz").value;
    const urlQuizz = document.querySelector(".urlQuizz").value;
    const quantPerguntas = document.querySelector(".quantPerguntas").value;
    const quantNiveis = document.querySelector(".quantNiveis").value;


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
        document.querySelector(".comeceComeco").classList.add("displayNone");
        document.querySelector(".criePerguntas").classList.remove("displayNone");
    } if (basicoCerto < 4) {
        alert("Tem alguma informação errada aí!");
    }
}



function conferenciaPergunta() {

    perguntaCerto = 0

    const perguntaInput = document.querySelector(".perguntaInput").value;
    const PerguntaCor = document.querySelector(".PerguntaCor").value;
    const RespostaCorreta = document.querySelector(".RespostaCorreta").value;
    const URLRespostaCorreta = document.querySelector(".URLRespostaCorreta").value;

    const RespostaIncorreta1 = document.querySelector(".RespostaIncorreta1").value;
    const URLRespostaIncorreta1 = document.querySelector(".URLRespostaIncorreta1").value;
    const RespostaIncorreta2 = document.querySelector(".RespostaIncorreta2").value;
    const URLRespostaIncorreta2 = document.querySelector(".URLRespostaIncorreta2").value;
    const RespostaIncorreta3 = document.querySelector(".RespostaIncorreta3").value;
    const URLRespostaIncorreta3 = document.querySelector(".URLRespostaIncorreta3").value;


    if ((perguntaInput.length >= 20)){
        perguntaCerto += 1;
    } if (PerguntaCor == 'string') { // AJEITAR O CÓDIGO PARA TESTAR URL.
        perguntaCerto += 1;
    } if (parseInt(quantPerguntas) >= 3) {
        perguntaCerto += 1;
    } if (parseInt(quantNiveis) >=2) {
        perguntaCerto += 1;
    }
    if (perguntaCerto == 4) {
        document.querySelector(".comeceComeco").classList.add("displayNone");
        document.querySelector(".criePerguntas").classList.remove("displayNone");
    } if (perguntaCerto < 4) {
        alert("Tem alguma informação errada aí!");
    }
}