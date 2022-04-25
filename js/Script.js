let numeroQuizzes = 0;
let basicoCerto;
let perguntaCerto;
let nivelCerto;
let quantPerguntas;
let quantNiveis;
let quizzes = [];
let quizzEscolhido;

const main = document.querySelector("main");
const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/";
let promessaLength;


/////////////////////////////UPLOAD DE LIB AXIOS QUIZZES/////////////////////////////
uploadQuizzes()

function uploadQuizzes() {
    const promise = axios.get(`${API}quizzes`);
    promise.then(carregarAxios);
    promise.catch(function () {
        console.log("Erro do upload dos Quizzes");
    });
    
    function carregarAxios (response) {
        quizzes = response.data;
        renderizarTodosQuizzes();
    }
}

//setInterval(uploadQuizzes, 30000);

///////////////////////////// RENDERIZAÇÃO DOS QUIZZES /////////////////////////////
function renderizarTodosQuizzes() {

    const quizzesCriadosJuntos = document.querySelector(".quizzes-criadosJuntos");
    quizzesCriadosJuntos.innerHTML = "";

    for(let i=0 ; i < quizzes.length ; i ++) {
        quizzesCriadosJuntos.innerHTML += `
            <div class="quizzPronto" id="${quizzes[i].id}" onclick="escolhaQuizz(this.id)">
                <div style="background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.9)),url(${quizzes[i].image});" class="imgquizz">
                <p class="tagQuizz">${quizzes[i].title}</p>
                <div>
            </div>
        `
    }

}

///////////////////////////// ESCOLHER UM QUIZZ /////////////////////////////
function escolhaQuizz(elemento) {
    main.classList.add("escondido");
    document.querySelector(".containerQuizz").classList.remove("escondido");

    //element.querySelector(".quizzPronto");
    
    const promise = axios.get(`${API}quizzes/${elemento}`);
    promise.then(carregarQuizz);
    promise.catch(function () {
        console.log("Erro do upload do Quizz");
    });
    
    function carregarQuizz (response) {
        quizzEscolhido = response.data;
        renderizarQuizz();
    }
}

function renderizarQuizz() {

    const titulozao = document.querySelector(".titulozao");

    titulozao.innerHTML = `
    <div style="background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.9)),url(${quizzEscolhido.image});" class="imgQuizz">
        <h2>${quizzEscolhido.title}</h2>
    </div>
    `;

    const divQuizz = document.querySelector(".quadrinho");

    for (let i = 0; i < (quizzEscolhido.questions).length; i++) {
        
        divQuizz.innerHTML = `
            <div style="background-color:${quizzEscolhido.questions[i].color};" class="tituloPergunta">
                <h4>${quizzEscolhido.questions[i].title}</h4>
            </div>
            <div class="opcoes-resposta">
        `;

        quizzEscolhido.questions[i].answers.sort(sorteador);
        for (let x = 0; x < (quizzEscolhido.questions[i].answers).length; x++) {
            divQuizz.innerHTML += `
                    <div id="${quizzEscolhido.questions[i].answers[x].isCorrectAnswer}" class="opcao" onclick="checaOpcao(this)">
                        <img src="${quizzEscolhido.questions[i].answers[x].image}"/>
                        <p class="checkarOpcao">${quizzEscolhido.questions[i].answers[x].text}</p>
                    </div>
                </div>    
            </div>`;
        }
                
    }           
}

function sorteador() { 
    return Math.random() - 0.5; 
}

///////////////////////////// CHECA SE A OPCAO SELECIONADA É CORRETA /////////////////////////////
//ESTAVA AQUI NESSA PARTE, MAS QUE COMBINAMOS Q VC IA FAZER AGORA.

function checaOpcao(elemento) {
    let gugu = elemento.querySelector(".checkarOpcao")    




    if (elemento.id === "true") {
        gugu.classList.add("verdinho");
        //gugu.classList.add(".verdinho");
    } else {
        gugu.classList.add("vermelhinho");
    }
}


///////////////////////////// CLICAR PARA CRIAR NOVO QUIZZ /////////////////////////////

function criarQuizz() {
    main.classList.add("escondido");
    document.querySelector(".comeceComeco").classList.remove("escondido");
}

///////////////////////////// VALIDAR INFORMAÇÃO BÁSICA DO QUIZZ /////////////////////////////

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


///////////////////////////// VALIDAR CRIAÇÃO DE PERGUNTAS DO QUIZZ /////////////////////////////

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


///////////////////////////// VALIDAR CRIAÇÃO DE NÍVEIS DO QUIZZ /////////////////////////////


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

///////////////////////////// VOLTAR PARA HOME COM QUIZZ FEITO /////////////////////////////


function voltarHome() {
    document.querySelector(".finalizarQuizz").classList.add("escondido");
    main.classList.remove("escondido");

    document.querySelector(".nao-tem-quizz").classList.add("escondido");
    document.querySelector(".meus-quizzes").classList.remove("escondido");
}

