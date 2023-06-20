function onSignIn(googleUser) {
  // Récupérez les informations de l'utilisateur connecté
  const profile = googleUser.getBasicProfile();
  const idToken = googleUser.getAuthResponse().id_token;

  // Utilisez les informations et le jeton d'identification pour gérer l'authentification dans votre jeu
  // Envoyez le jeton d'identification au serveur pour vérification, en utilisant une API backend par exemple
}


const questions = [
  {
    question: "Quelle est la capitale de l'Australie ?",
    answer: "Canberra"
  },
  {
    question: "Quelle est la capitale du Brésil ?",
    answer: "Brasilia"
  },
  // Ajoutez d'autres questions ici
];


let currentQuestionIndex = 0;
let score = 0;
let starsCount = 3;
let gameStarted = false;
const STAR_RECHARGE_TIME = 12 * 60 * 60 * 1000; // 12 heures en millisecondes
let starRechargeInterval;

function displayQuestion() {
  if (gameStarted && starsCount < 1) {
    displayResult("Vous n'avez pas assez d'étoiles pour jouer !");
    displayStarRechargeTime();
    document.getElementById("submitButton").disabled = true; // Désactiver le bouton "Valider"
    document.getElementById("restartButton").disabled = true; // Désactiver le bouton "Recommencer"
    return;
  }

  if (!gameStarted) {
    gameStarted = true;
    updateStars();
  }

  const questionElement = document.getElementById("question");
  questionElement.textContent = questions[currentQuestionIndex].question;

  const answerElement = document.getElementById("answer");
  answerElement.value = "";

  const resultElement = document.getElementById("result");
  resultElement.textContent = "";

  const submitButton = document.getElementById("submitButton");
  submitButton.style.display = "block";
  submitButton.disabled = false; // Activer le bouton "Valider"

  const restartButton = document.getElementById("restartButton");
  restartButton.style.display = "none";
}

function checkAnswer() {
  const answerElement = document.getElementById("answer");
  const userAnswer = answerElement.value.trim();

  if (userAnswer === questions[currentQuestionIndex].answer) {
    score++;
    displayResult("Correct !");
  } else {
    displayResult("Incorrect. La bonne réponse est " + questions[currentQuestionIndex].answer + ".");
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
    starsCount--; // Déduire une étoile à la fin du quiz
    updateStars();
  }
}

function displayResult(message) {
  const resultElement = document.getElementById("result");
  resultElement.textContent = message;
}

function endQuiz() {
  const questionElement = document.getElementById("question");
  const answerElement = document.getElementById("answer");
  const resultElement = document.getElementById("result");
  const submitButton = document.getElementById("submitButton");
  const restartButton = document.getElementById("restartButton");

  questionElement.style.display = "none";
  answerElement.style.display = "none";
  submitButton.style.display = "none";
  resultElement.textContent = "Quiz terminé ! Votre score est de " + score + "/" + questions.length + ".";
  restartButton.style.display = "block";

  gameStarted = false;

}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  const questionElement = document.getElementById("question");
  const answerElement = document.getElementById("answer");
  const resultElement = document.getElementById("result");
  const submitButton = document.getElementById("submitButton");
  const restartButton = document.getElementById("restartButton");

  questionElement.style.display = "block";
  answerElement.style.display = "block";
  resultElement.textContent = "";

  displayQuestion();

  restartButton.style.display = "none";

  updateStars();

}

function updateStars() {
  const starsElement = document.getElementById("stars");
  starsElement.innerHTML = "";

  for (let i = 0; i < starsCount; i++) {
    const starElement = document.createElement("span");
    starElement.classList.add("star");
    starElement.textContent = "★"; // Unicode character for star symbol
    starsElement.appendChild(starElement);
  }

  displayStarRechargeTime();

  if (starsCount === 0) {
    document.getElementById("restartButton").disabled = true; // Désactiver le bouton "Recommencer"
    startStarRechargeTimer();
  } else {
    document.getElementById("restartButton").disabled = false; // Activer le bouton "Recommencer"
    clearInterval(starRechargeInterval);
  }
}

function displayStarRechargeTime() {
  const rechargeTimeElement = document.getElementById("rechargeTime");

  if (starsCount === 0) {
    const currentTime = new Date().getTime();
    const nextRechargeTime = currentTime + STAR_RECHARGE_TIME;
    const remainingTime = nextRechargeTime - currentTime;
    const remainingHours = Math.floor(remainingTime / (60 * 60 * 1000));
    const remainingMinutes = Math.ceil((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
    rechargeTimeElement.textContent = `Attendez ${remainingHours} heures et ${remainingMinutes} minutes pour la prochaine étoile.`;
  } else {
    rechargeTimeElement.textContent = "";
  }
}

function startStarRechargeTimer() {
  starRechargeInterval = setInterval(() => {
    starsCount++;
    updateStars();
  }, STAR_RECHARGE_TIME);
}

displayQuestion();
