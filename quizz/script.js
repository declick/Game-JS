let questions = [
    {
        'id': 1,
        "question": 'HTML signifie?',
        'Reponses': [
            'Langage machine HighText',
            'Langage de balisage hypertexte et liens',
            'Langage Signalétique Hyper Text',
            'Aucun d\'eux'
        ],
        'answer': 'Langage Signalétique Hyper Text'
    },
    {
        'id': 2,
        "question": 'Quel est le plus petit en-tête en HTML par défaut?',
        'Reponses': [
            'h1',
            'h2',
            'h6',
            'h4'
        ],
        'answer': 'h6'
    },
    {
        'id': 3,
        "question": 'La séquence correcte de balises HTML pour démarrer une page Web est -',
        'Reponses': [
            'Head, Title, HTML, body',
            'HTML, Body, Title, Head',
            'HTML, Head, Body, Title',
            'HTML, Head, Title, Body'
        ],
        'answer': 'HTML, Head, Title, Body'
    },
    {
        'id': 4,
        "question": 'Lequel des attributs suivants est utilisé pour fournir un nom unique à un élément?',
        'Reponses': [
            'class',
            'id',
            'type',
            'None of the above'
        ],
        'answer': 'id'
    },
    {
        'id': 5,
        "question": 'Comment créer une liste non ordonnée en HTML?',
        'Reponses': [
            '&lt;ul&gt;',
            '&lt;ol&gt;',
            '&lt;li&gt;',
            '&lt;i&gt;'
        ],
        'answer': '&lt;ul&gt;'
    },
    {
        'id': 6,
        "question": 'Quel caractère est utilisé pour représenter la fermeture d\'une balise en HTML?',
        'Reponses': [
            '/',
            '!',
            '.',
            '&'
        ],
        'answer': '/'
    },
    {
        'id': 7,
        "question": ' Comment ajouter une couleur de fond en HTML?',
        'Reponses': [
            '&lt;marquee bg color: "red"&gt;',
            '&lt;marquee bg-color = "red"&gt;',
            '&lt;marquee bgcolor = "red"&gt;',
            '&lt;marquee color = "red"&gt;'
        ],
        'answer': '&lt;marquee bgcolor = "red"&gt;'
    },
    {
        'id': 8,
        "question": 'Comment créer une case à cocher en HTML?',
        'Reponses': [
            '&lt;input type = "checkbox"&gt;',
            '&lt;input type = "button"&gt;',
            '&lt;checkbox&gt;',
            '&lt;input type = "check"&gt;'
        ],
        'answer': '&lt;input type = "checkbox"&gt;'
    },
    {
        'id': 9,
        "question": '&lt;entrée&gt; est -',
        'Reponses': [
            'une balise de format.',
            'une balise vide.',
            'Tout ce qui précède',
            'Aucune de ces réponses'
        ],
        'answer': 'une balise vide.'
    },
    {
        'id': 10,
        "question": 'Le &lt;hr&gt; balise en HTML est utilisée pour -',
        'Reponses': [
            'nouvelle ligne',
            'règle verticale',
            'nouveau paragraphe',
            'règle horizontale'
        ],
        'answer': 'règle horizontale'
    }

]

let start_quiz = document.querySelector('#start_quiz');
let container = document.querySelector('.quiz_container');
let result_box = document.querySelector('.result_box');
let next = document.querySelector('#next');
let section_next = document.querySelector('.ques');
let previous = document.querySelector('#previous');
let replay = document.querySelector('#replay');
let reponses = document.querySelector('.reponses');
let buttons = document.querySelector('.buttons');

// événement bouton start quiz //

start_quiz.addEventListener('click', () => {
    SOUND.play();
    zombietomb.style.display = 'none';
    start_quiz.style.display = 'none';
    container.style.display = 'block';
    show_question(0);
    buttons.classList.add('disabled');
})

// événement de bouton de replay //

replay.addEventListener('click', () => {
    REPLAY.play();
    zombietomb.style.display = 'block';
    start_quiz.style.display = 'block';
    result_box.style.display = 'none';
    active = 0;
    userscore = 0;
    show_question(active);
    reponses.classList.remove('disabled');
})

// événement de bouton de previous //

previous.addEventListener('click', () => {
    PREVIOUS.play();
    active--;
    show_question(active);
    reponses.classList.remove('disabled');
    buttons.classList.add('disabled');
})

// prochain événement du bouton //

let active = 0; // numéro d'index de la question //
next.addEventListener('click', () => {
    NEXT.play();
    if (active < questions.length - 1) {
        active++;
        show_question(active);
        reponses.classList.remove('disabled');
        buttons.classList.add('disabled')
    }
    else {
        result_box.style.display = 'block';
        container.style.display = 'none'
        result(); // fonction résultat //
    }
})

///////////////////////////////////////////
//           fonction                   //
/////////////////////////////////////////

// fonction show question //

let userscore = 0; // réponse correcte sélectionnée par l'utilisateur //
function show_question(index) {

    // nom de la question //

    const quiz_question = document.querySelector('.quiz_question');
    quiz_question.innerHTML = `<h1><p>${questions[index].id}. </p>${questions[index].question}</h1>`

    //  liste d'options de questions //

    reponses.innerHTML = `<div class="reponse_list">${questions[index].Reponses[0]}</div>
    <div class="reponse_list">${questions[index].Reponses[1]}</div>
    <div class="reponse_list">${questions[index].Reponses[2]}</div>
    <div class="reponse_list">${questions[index].Reponses[3]}</div>`

    // nombre actuel de questions //

    const question_numero = document.querySelector('.question_numero');
    question_numero.innerHTML = `<span class="center"><p>${questions[index].id}</p>sur<p>${questions.length}</p>Questions</span>`

    const reponses_list = document.querySelectorAll('.reponse_list');
    reponses_list.forEach((e) => {
        e.addEventListener('click', (op) => {
            if (op.target.innerHTML == questions[active].answer) {
                console.log(op.target.innerHTML);
                userscore++; // score d'utilisateurs augmenté par la bonne réponse //
                e.classList.add('correct');
                reponses.classList.add('disabled');
                buttons.classList.remove('disabled');
            }

            else {
                e.classList.add('wrong');
                reponses.classList.add('disabled');
                buttons.classList.remove('disabled');

                // si la mauvaise réponse est sélectionnée, alors la classe correcte a ajouté la bonne réponse //

                for (let i = 0; i < reponses.children.length; i++) {
                    if (reponses.children[i].innerHTML == questions[active].answer) {
                        reponses.children[i].classList.add('correct');
                    }
                }
            }
        })
    })
}


// Objet zombie //

const zombie = {
    picture: 'img/zombie.png',
    domObject: null,
    spriteSize: 100,
    numberSprite: 11
};

// Object Animation avec le nombre de frame par seconde de l'animation (ici 5) //
const animation = {
    position: 0,
    fps: 5,
    id: null
};

/** Si le DOM est chargé **/

document.addEventListener('DOMContentLoaded', function() {

    // On récupère la zone du DOM //
    zombie.domObject = document.querySelector('#zombietomb');

    // On lance l'animation //
    animation.id = requestAnimationFrame(zombieAction);

});

/** Fonction pour gérer l'animation du Zombie **/

function zombieAction() {

    // On relance l'animation uniquement si le temps écoulé est suffisant pour respecter les fps ! // 

    setTimeout(function() { animation.id = requestAnimationFrame(zombieAction); }, 1000 / animation.fps);

    // On met à jour le DOM //

    zombie.domObject.style.background = `url(${zombie.picture}) ${-zombie.spriteSize * animation.position}px 0px `;

    // On modifie la position de l'animation//

    animation.position++; // Si on a fini l'animation retour à 0 //

    if (animation.position > zombie.numberSprite)
        animation.position = 0;
}

// GESTION DES EVENEMENTS AUDIO //

const sound = document.getElementById('sound');
sound.addEventListener('click', audioManager);


function audioManager() {

    // Changer l'image //

    let imgSrc = sound.getAttribute('src');
    let SOUND_IMG = imgSrc === 'img/sound_on.png' ? 'img/mute.png' : 'img/sound_on.png';
    sound.setAttribute('src', SOUND_IMG);

    // Modification des sons en fonction des etats //

    SOUND.muted = !SOUND.muted;
    PREVIOUS.muted = !PREVIOUS.muted;
    NEXT.muted = !NEXT.muted;

}

// Relancer le jeu //

function result() {
    const score = document.querySelector('.score');
    score.innerHTML = `<h1>Ton score est de</h1><span><p>${userscore}</p>sur<p>${questions.length}</p></span>`

}
