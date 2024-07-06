var perguntas_quiz = [
    {
        pergunta: "Qual é o nome da filha de Joel?",
        alternativas: ["Ellie", "Sarah", "Tess", "Maria"],
        resposta: 1
    },
    {
        pergunta: "Quem é o líder do grupo dos Vaga-lumes?",
        alternativas: ["Marlene", "Tommy", "David", "Henry"],
        resposta: 0
    },
    {
        pergunta: "Em que cidade Joel e Ellie encontram Bill?",
        alternativas: ["Pittsburgh", "Boston", "Jackson", "Lincoln"],
        resposta: 3
    },
    {
        pergunta: "Qual é o nome da amiga de Ellie que aparece em 'Left Behind'?",
        alternativas: ["Marlene", "Tess", "Riley", "Dina"],
        resposta: 2
    },
    {
        pergunta: "Qual é o nome do irmão de Joel?",
        alternativas: ["David", "Bill", "Henry", "Tommy"],
        resposta: 3
    },
    {
        pergunta:"Qual é o nome da líder dos Serafitas?",
        alternativas: ["Emily", "Nora", "Leah", "Isaac"],
        resposta: 0
    },
    {
        pergunta:"Qual personagem se torna o alvo principal da vingança de Ellie?",
        alternativas: ["Abby", "Owen", "Manny", "Jesse"],
        resposta: 0
    },
    {
        pergunta:"Qual é o nome do irmão mais novo de Yara?",
        alternativas: ["Isaac", "Manny", "Lev", "Owen"],
        resposta: 2
    },
    {
        pergunta:"Onde Ellie e Dina encontram abrigo durante a tempestade de neve?",
        alternativas: ["Em um supermercado", "Em uma livraria", "Em um teatro", "Em um shopping"],
        resposta: 0
    },
    {
        pergunta:"Qual é o nome do livro de piadas que Ellie adora?",
        alternativas: ["No Pun Intended", "Jokes for Fun", "Laugh Out Loud", "Pun Parade"],
        resposta: 0
    },
    {
        pergunta:"O que Riley planeja fazer antes de se reencontrar com Ellie?",
        alternativas: ["Se juntar aos Vaga-lumes", "Fugir para outra cidade", "Encontrar sua família", "Procurar Joel"],
        resposta: 0
    },
    {
        pergunta:"Qual é o jogo de arcade que Ellie e Riley jogam juntas?",
        alternativas: ["Mortal Kombat", "The Turning", "Street Fighter", "Pac-Man"],
        resposta: 1
    },
    {
        pergunta:"Em que lugar Ellie e Riley se escondem após serem perseguidas por infectados?",
        alternativas: ["Em uma loja de brinquedos", "Em uma loja de roupas", "Em uma farmácia", "Em uma loja de eletrônicos"],
        resposta: 1
    },
    {
        pergunta:"Qual é a música que Joel toca para Ellie no violão?",
        alternativas: ["Take On Me", "True Faith", "Through the Valley", "Future Days"],
        resposta: 3
    },
    {
        pergunta:"Quem é o líder dos Lobos(WLF)?",
        alternativas: ["Isaac", "Manny", "Owen", "Jerry"],
        resposta: 0
    }
];

var pergunta_atual = 0;
var pontos = 0;

function quiz1() {
    div_quiz1.style.display = "none";
    div_quiz2.style.display = "none";
    div_quiz3.style.display = "none";
    box_quiz.style.display = "flex";
}

function iniciar() {

    iniciar_quiz.style.display = "none";
    game.style.display = "flex";

    div_pergunta.innerHTML = `${perguntas_quiz[pergunta_atual].pergunta}`;
    resposta1.innerHTML = `${perguntas_quiz[pergunta_atual].alternativas[0]}`;
    resposta2.innerHTML = `${perguntas_quiz[pergunta_atual].alternativas[1]}`;
    resposta3.innerHTML = `${perguntas_quiz[pergunta_atual].alternativas[2]}`;
    resposta4.innerHTML = `${perguntas_quiz[pergunta_atual].alternativas[3]}`;
}

function check(selected) {

    var correta = perguntas_quiz[pergunta_atual].resposta;
    var selectedElement = document.getElementById(`resposta${selected + 1}`);
    var corretaElement = document.getElementById(`resposta${correta + 1}`);

    if (selected === correta) {
        selectedElement.classList.add('correto');
        pontos++;
    } else {
        selectedElement.classList.add('errado');
        corretaElement.classList.add('correto');
    }

    setTimeout(() => {
        pergunta_atual++;

        if (pergunta_atual < perguntas_quiz.length) {
            selectedElement.classList.remove('correto');
            selectedElement.classList.remove('errado');
            corretaElement.classList.remove('correto');
            iniciar();
        } else {
            pergunta_atual = 0;

            iniciar_quiz.style.display = "flex";
            game.style.display = "none";
            titulo.style.display = "none";
            btnInicio.style.display = "none";


            if (pontos > (perguntas_quiz.length / 2)) {
                div_pontos.innerHTML = `PARABÉNS! VOCÊ ACERTOU ${pontos} de ${perguntas_quiz.length}`
            } else {
                div_pontos.innerHTML = `VOCÊ ACERTOU APENAS ${pontos} de ${perguntas_quiz.length}, TENTE NOVAMENTE!`;
            }
            selectedElement.classList.remove('correto');
            selectedElement.classList.remove('errado');
            corretaElement.classList.remove('correto');
        }
    }, 400)

}

iniciar();



function cadastrarNota() {
    // Enviando o valor da nova input
    var id = sessionStorage.ID_USUARIO;

    fetch("/pontuacao/cadastrarNota", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            NotaServer: pontos,
            UsuarioServer: id
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na solicitação: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Nota cadastrada com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro ao cadastrar a nota:', error);
    });

    setTimeout(() => {
        window.location = "dashboard.html";
      }, "3000");
}
