let numeroQuizzes = 0;
let basicoCerto;
let perguntaCerto;
let nivelCerto;
let tituloQuizz;
let urlQuizz;
let quantPerguntas;
let quantNiveis;
let quizzes = [];
let quizzEscolhido;
let quizzFazendo = [];
let promessaLength;
let questaoAcertada;
let questaoFeita = 0;
let numeroQuestoes;

//variáveis das perguntas//

let perguntaInput;
let perguntaCor;
let respostaCorreta
let URLrespostaCorreta;
let respostaIncorreta1;
let URLrespostaIncorreta1;
let respostaIncorreta2;
let URLrespostaIncorreta2;
let respostaIncorreta3;
let URLrespostaIncorreta3;

//variáveis dos níveis//

let tituloNivel;
let acerto;
let urlimg;
let descricaoNivel;




const main = document.querySelector("main");
const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/";




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

    const divQuizz = document.querySelector(".containerQuizz");

    /////////////////////////////////////////////////////// PARA AJUDAR A RESOLVER O QUIZZ ////////////////////////////////////////////////////////////////////////
    numeroQuestoes = (quizzEscolhido.questions).length;

    for (let i = 0; i < (quizzEscolhido.questions).length; i++) {
        if(i === 0){
            divQuizz.innerHTML += `
            <div class="perguntaDiv">
                <div class="quadrinho">
                    <div style="background-color:${quizzEscolhido.questions[i].color};" class="tituloPergunta">
                        <h4>${quizzEscolhido.questions[i].title}</h4>
                    </div>
                    <div class="opcoes-resposta temporaria"></div>
                </div>
            </div>
        `;
        } else {
            divQuizz.innerHTML += `
            <div class="perguntaDiv escondido">
                <div class="quadrinho">
                    <div style="background-color:${quizzEscolhido.questions[i].color};" class="tituloPergunta">
                        <h4>${quizzEscolhido.questions[i].title}</h4>
                    </div>
                    <div class="opcoes-resposta temporaria"></div>
                </div>
            </div>
        `;
        }

        renderizarOpcoes(i) 
    }           
}

function renderizarOpcoes(i) {
    
    let opcoes = document.querySelector(".opcoes-resposta.temporaria")

    quizzEscolhido.questions[i].answers.sort(sorteador);
    for (let x = 0; x < (quizzEscolhido.questions[i].answers).length; x++) {
        opcoes.innerHTML += `
            <div id="${quizzEscolhido.questions[i].answers[x].isCorrectAnswer}" class="opcao unclicked" onclick="checaOpcao(this)">
                <img src="${quizzEscolhido.questions[i].answers[x].image}"/>
                <p class="checkarOpcao">${quizzEscolhido.questions[i].answers[x].text}</p>
            </div>  
        `;
    }
    
    opcoes.classList.remove("temporaria")
}

function sorteador() { 
    return Math.random() - 0.5; 
}
///////////////////////////// CHECA SE A OPCAO SELECIONADA É CORRETA /////////////////////////////
//ESTAVA AQUI NESSA PARTE, MAS QUE COMBINAMOS Q VC IA FAZER AGORA.

function checaOpcao(elemento) {
    const clicado = elemento.querySelector(".checkarOpcao");
    clicado.classList.add("clicado")    
    
    const esbranquicar = elemento.parentNode;

    for (let i = 0; i < esbranquicar.children.length; i++) {
        let item = esbranquicar.querySelector(".opcao.unclicked");
        let itemEscolhido = item.querySelector(".clicado");
        item.classList.remove("unclicked");
        item.removeAttribute("onclick");

        if (item.id === "true") {
            item.classList.add("verdinho");
        } else {
            item.classList.add("vermelhinho");
        }

        if (itemEscolhido === null){
            item.classList.add("esbranquicado")
        }
    }

    if (elemento.id === "true") {
        questaoAcertada++;
    }
    questaoFeita++;

    if(questaoFeita === numeroQuestoes) {
        mostrarNivel()
    }else {
        proximaQuestao()
    }
}
function proximaQuestao() {
    const proximo = document.querySelector(".proximo");
    proximo.classList.remove("proximo", "escondido")
    proximo.querySelector(".opcoes-resposta").scrollIntoView();
}


///////////////////////////// CLICAR PARA CRIAR NOVO QUIZZ /////////////////////////////

function criarQuizz() {
    main.classList.add("escondido");
    document.querySelector(".comeceComeco").classList.remove("escondido");


    ///////////////////////////// CRIAÇÃO DO QUIZZ /////////////////////////////
    
    /*document.getElementById("mensagem").value = "";
    const promise = axios.post(`${API}`, quizzFazendo);
    promise.then(carregarAxios);

    promise.catch(function () {
        console.log("Erro do upload dos Quizzes");
    });
        
    function carregarAxios (response) {
        quizzes = response.data;
        renderizarTodosQuizzes();
    }*/
    


}

///////////////////////////// VALIDAR INFORMAÇÃO BÁSICA DO QUIZZ /////////////////////////////

function conferenciaBasica() {
    basicoCerto = 0;

    tituloQuizz = document.querySelector(".tituloQuizz").value;
    urlQuizz = document.querySelector(".urlQuizz").value;
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
        quizzFazendo = ({
            title: `${tituloQuizz}`,
            image: `${urlQuizz}`,
            questions: [],
            levels: []
        });
        console.log(quizzFazendo.questions);
        document.querySelector(".comeceComeco").classList.add("escondido");
        document.querySelector(".criePerguntas").classList.remove("escondido");
        CarregarPerguntas ();
    } if (basicoCerto < 4) {
        alert("Tem alguma informação errada aí! Favor preencher corretamente os campos");
    }
}

///////////////////////////// CRIAR OS INPUTS DE PERGUNTAS DO QUIZZ /////////////////////////////
function CarregarPerguntas () {
const quadradoPerguntas = document.querySelector(".quadradoPerguntas");
quadradoPerguntas.innerHTML = "";

    for (let n = 1; n <= parseInt(quantPerguntas); n++) {
            
        quadradoPerguntas.innerHTML += `
            <div class="perguntasInputs">
                <div class="pergunta">
                <p>Pergunta ${n}</p>

                <input type="text" class="pergunta-inputs perguntaInput" placeholder="Texto da pergunta">
                <input type="text" class="pergunta-inputs perguntaCor" placeholder="Cor de fundo da pergunta">
            </div>
            <div class="respostas">
                    <p>Resposta correta</p>

                    <input type="text" class="pergunta-inputs respostaCorreta" placeholder="Resposta correta">
                    <input type="text" class="pergunta-inputs URLrespostaCorreta" placeholder="URL da imagem">
                </div>
                <div class="respostas">
                    <p>Resposta incorretas</p>
                    <div class="respostasErro">
                        <input type="text" class="pergunta-inputs respostaIncorreta1" placeholder="Resposta incorreta 1">
                        <input type="text" class="pergunta-inputs URLrespostaIncorreta1" placeholder="URL da imagem 1">
                    </div>
                    <div class="respostasErro">
                        <input type="text" class="pergunta-inputs respostaIncorreta2" placeholder="Resposta incorreta 2">
                        <input type="text" class="pergunta-inputs URLrespostaIncorreta2" placeholder="URL da imagem 2">
                    </div>
                    <div class="respostasErro">
                        <input type="text" class="pergunta-inputs respostaIncorreta3" placeholder="Resposta incorreta 3">
                        <input type="text" class="pergunta-inputs URLrespostaIncorreta3" placeholder="URL da imagem 3">
                    </div>
                </div>
            </div>
        
            <!-- <div class="perguntadobrada">
                <p>Pergunta ${n}</p>
                <button onclick="perguntaDesdobrada(this)">
                    <ion-icon name="create-outline"></ion-icon>
                </button>
            </div> -->
        `;
    }           
}
/*function perguntaDesdobrada(elemento) {
    elemento.parentNode.classList.toggle("escondido");
    document.querySelector(".perguntasInputs").classList.toggle("escondido")
}*/


///////////////////////////// VALIDAR CRIAÇÃO DE PERGUNTAS DO QUIZZ /////////////////////////////

function conferenciaPergunta() {

    perguntaCerto = 0;


    perguntaInput = document.querySelector(".perguntaInput").value;
    perguntaCor = document.querySelector(".perguntaCor").value;
    respostaCorreta = document.querySelector(".respostaCorreta").value;
    URLrespostaCorreta = document.querySelector(".URLrespostaCorreta").value;

    respostaIncorreta1 = document.querySelector(".respostaIncorreta1").value;
    URLrespostaIncorreta1 = document.querySelector(".URLrespostaIncorreta1").value;
    respostaIncorreta2 = document.querySelector(".respostaIncorreta2").value;
    URLrespostaIncorreta2 = document.querySelector(".URLrespostaIncorreta2").value;
    respostaIncorreta3 = document.querySelector(".respostaIncorreta3").value;
    URLrespostaIncorreta3 = document.querySelector(".URLrespostaIncorreta3").value;
    
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
        salvarPerguntasUsuario();
        document.querySelector(".criePerguntas").classList.add("escondido");
        document.querySelector(".decidaNiveis").classList.remove("escondido");
        carregarNiveis();
    } if (perguntaCerto < 18) {
        alert("Tem alguma informação errada aí! Favor preencher corretamente os campos");
    }
}

//(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)apenas url
//&& testeURL.test(/\.(jpeg|jpg|gif|png)$/apenas imagem(independente de url)
function URL(testeURL) {

    regexp = (/\.(jpeg|jpg|gif|png)$/);
    if (regexp.test(testeURL)) {
        return true;
    } else {
        return false;
    }
}


function salvarPerguntasUsuario() {

    for (let y = 0; y < parseInt(quantPerguntas); y++) {

        quizzFazendo.questions.push({
            title: `${perguntaInput}`,
            color: `${perguntaCor}`,
            answers: []
        });
        quizzFazendo.questions[y].answers.push({
            text: `${respostaCorreta}`,
            image: `${URLrespostaCorreta}`,
            isCorrectAnswer: true
            },
            {
            text: `${respostaIncorreta1}`,
            image: `${URLrespostaIncorreta1}`,
            isCorrectAnswer: false
            });
        if ((respostaIncorreta2).length !== 0) {
            quizzFazendo.questions[y].answers.push({
            text: `${respostaIncorreta2}`,
            image: `${URLrespostaIncorreta2}`,
            isCorrectAnswer: false
            });
        } if ((respostaIncorreta3).length !== 0) {
            quizzFazendo.questions[y].answers.push({
            text: `${respostaIncorreta3}`,
            image: `${URLrespostaIncorreta3}`,
            isCorrectAnswer: false
            });
        }
        console.log(quizzFazendo);
    }
}


function carregarNiveis () {

    const quadradoNiveis = document.querySelector(".quadradoNiveis");
    quadradoNiveis.innerHTML = "";
    
    for (let n = 1; n <= parseInt(quantNiveis); n++) {
                
        quadradoNiveis.innerHTML += `
            <div class="niveisInputs">
                <div class="nivel">
                    <p>Nível ${n}</p>
                    <input type="text" class="comeco-inputs tituloNivel" placeholder="Título do nível">
                    <input type="text" class="comeco-inputs acerto" placeholder="% de acerto mínima">
                    <input type="text" class="comeco-inputs urlimg" placeholder="URL da imagem do nível">
                    <input type="text" class="comeco-inputs descricaoNivel" placeholder="Descrição do nível">
                </div>
            </div>
        `;
    }        
}




///////////////////////////// VALIDAR CRIAÇÃO DE NÍVEIS DO QUIZZ /////////////////////////////


function conferenciaNiveis() {
    nivelCerto = 0;

    tituloNivel = document.querySelector(".tituloNivel").value;
    acerto = document.querySelector(".acerto").value;
    urlimg = document.querySelector(".urlimg").value;
    descricaoNivel = document.querySelector(".descricaoNivel").value;


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
        salvarNiveisUsuario();
        document.querySelector(".decidaNiveis").classList.add("escondido");
        document.querySelector(".finalizarQuizz").classList.remove("escondido");
        carregarTelaFinalizado();
    } if (nivelCerto < 4) {
        alert("Tem alguma informação errada aí! Favor preencher corretamente os campos");
    }
}

function salvarNiveisUsuario() {
    
    for (let z = 0; z < parseInt(quantNiveis); z++) {

        quizzFazendo.levels.push({
            title: `${tituloNivel}`,
            image: `${urlimg}`,
            text: `${descricaoNivel}`,
            minValue: `${acerto}`
        });
    }
    console.log(quizzFazendo);
}



function carregarTelaFinalizado() {

    const quizzPronto = document.querySelector(".finalizarQuizz");
    quizzPronto.innerHTML =`

        <h3>Seu quizz está pronto!</h3>

        <div style="background: linear-gradient(to bottom, rgba(150, 150, 150, 0), rgba(0, 0, 0, 0.9)),url(${urlQuizz});" class="img-quizz-pronto">
            <p class="tituloPronto">${tituloQuizz}</p>
        </div>

        <button class="btn">Finalizar Quizz</button>

        <button class="voltarbtn" onclick="voltarHome()">Voltar para Home</button>
    `
}

///////////////////////////// VOLTAR PARA HOME COM QUIZZ FEITO /////////////////////////////


function voltarHome() {
    document.querySelector(".finalizarQuizz").classList.add("escondido");
    main.classList.remove("escondido");

    document.querySelector(".nao-tem-quizz").classList.add("escondido");
    document.querySelector(".meus-quizzes").classList.remove("escondido");
}

