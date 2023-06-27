// Obtenez une référence vers le canvas et le contexte 2D
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Définissez les dimensions du canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Charger l'image de fond d'écran
const backgroundImage = new Image();
backgroundImage.src = './img/space.png';

// Définissez les variables pour le vaisseau spatial
const shipWidth = 50;
const shipHeight = 50;
let shipX = canvas.width / 2 - shipWidth / 2;
let shipY = canvas.height / 2 - shipHeight / 2;
let shipSpeedX = 0;
let shipSpeedY = 0;
const shipSpeed = 5;

// Définissez les variables pour les obstacles
const obstacleWidth = 30;
const obstacleHeight = 30;
const obstacleSpeedMin = 1;
const obstacleSpeedMax = 5;
let obstacles = [];

// Définissez les variables pour les vies
let lives = 3;
let score = 0;
let gameStarted = false;

// Variables pour les projectiles
const bulletWidth = 5;
const bulletHeight = 10;
const bulletSpeed = 5;
let bullets = [];

// Fonction pour dessiner le vaisseau spatial
function drawShip() {
    // Charger l'image du vaisseau spatial
    const shipImage = new Image();
    shipImage.src = './img/ship.png';
  
    // Dessiner l'image du vaisseau spatial
    ctx.drawImage(shipImage, shipX, shipY, shipWidth, shipHeight);
  }

  function drawObstacles() {
    // Charger l'image de l'obstacle
    const obstacleImage = new Image();
    obstacleImage.src = './img/simon.png';
  
    for (let obstacle of obstacles) {
      // Dessiner l'image de l'obstacle
      ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
    }
  }
  

// Fonction pour dessiner les projectiles
function drawBullets() {
  ctx.fillStyle = '#00FF00';
  for (let bullet of bullets) {
    ctx.fillRect(bullet.x, bullet.y, bulletWidth, bulletHeight);
  }
}

// Fonction pour dessiner le fond d'écran
function drawBackground() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

// Fonction pour effacer le canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Fonction pour mettre à jour le jeu
function updateGame() {
  clearCanvas();
  drawBackground();
  drawShip();
  drawObstacles();
  drawBullets();
  updateShipPosition();
  moveObstacles();
  moveBullets();
  drawLives();
  drawScore();
  

  if (gameStarted) {
    requestAnimationFrame(updateGame);
  }
}

// Fonction pour générer un obstacle avec une vitesse aléatoire
function generateObstacle() {
  const obstacle = {
    x: Math.random() * (canvas.width - obstacleWidth),
    y: -obstacleHeight,
    speed: Math.random() * (obstacleSpeedMax - obstacleSpeedMin) + obstacleSpeedMin // Génère une vitesse aléatoire entre obstacleSpeedMin et obstacleSpeedMax
  };
  obstacles.push(obstacle);
}

// Fonction pour mettre à jour la position des obstacles
function moveObstacles() {
  for (let obstacle of obstacles) {
    obstacle.y += obstacle.speed; // Utiliser la propriété speed

    // Vérifiez les collisions avec le vaisseau spatial
    if (
      isCollision(
        shipX,
        shipY,
        shipWidth,
        shipHeight,
        obstacle.x,
        obstacle.y,
        obstacleWidth,
        obstacleHeight
      )
    ) {
      handleCollision(obstacle);
    }

    // Vérifiez si l'obstacle est sorti de l'écran
    if (obstacle.y > canvas.height) {
      obstacles.splice(obstacles.indexOf(obstacle), 1);
    }
  }
}

// Fonction pour mettre à jour la position des projectiles
function moveBullets() {
  for (let bullet of bullets) {
    bullet.y -= bulletSpeed;

    // Vérifier si le projectile est sorti de l'écran
    if (bullet.y + bulletHeight < 0) {
      bullets.splice(bullets.indexOf(bullet), 1);
    }

    // Vérifier les collisions avec les obstacles
    for (let obstacle of obstacles) {
      if (
        isCollision(
          bullet.x,
          bullet.y,
          bulletWidth,
          bulletHeight,
          obstacle.x,
          obstacle.y,
          obstacleWidth,
          obstacleHeight
        )
      ) {
        // Supprimer l'obstacle et le projectile
        obstacles.splice(obstacles.indexOf(obstacle), 1);
        bullets.splice(bullets.indexOf(bullet), 1);
        score++; // Augmenter le score
        break; // Sortir de la boucle pour éviter de traiter d'autres collisions
      }
    }
  }
}

// Fonction pour vérifier les collisions entre deux rectangles
function isCollision(
  x1,
  y1,
  width1,
  height1,
  x2,
  y2,
  width2,
  height2
) {
  return (
    x1 < x2 + width2 &&
    x1 + width1 > x2 &&
    y1 < y2 + height2 &&
    y1 + height1 > y2
  );
}

// Fonction pour mettre à jour la position du vaisseau spatial
function updateShipPosition() {
  shipX += shipSpeedX;
  shipY += shipSpeedY;

  // Limiter la position du vaisseau spatial à l'intérieur du canvas
  shipX = Math.max(0, Math.min(shipX, canvas.width - shipWidth));
  shipY = Math.max(0, Math.min(shipY, canvas.height - shipHeight));
}

function handleCollision(obstacle) {
  lives--; // Réduire le nombre de vies

  if (lives === 0) {
    // Game over
    gameStarted = false;
    endGame();
  } else {
    obstacles.splice(obstacles.indexOf(obstacle), 1); // Supprimer l'obstacle
    score++; // Augmenter le score
  }
}

// Fonction pour afficher le nombre de vies
function drawLives() {
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '20px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('Lives: ' + lives, 10, 30);
}

// Fonction pour afficher le score
function drawScore() {
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '20px Arial';
  ctx.textAlign = 'right';
  ctx.fillText('Score: ' + score, canvas.width - 10, 30);

  if (score >= 10) {
    // Passer au niveau suivant
    gameStarted = false;
    endGame();
    // Ajoutez ici votre logique pour passer au niveau suivant
  }
}

// Fonction pour afficher l'écran de fin de jeu
function endGame() {
  clearCanvas();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '40px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
  ctx.font = '20px Arial';
  ctx.fillText('Final Score: ' + score, canvas.width / 2, canvas.height / 2 + 50);
}

// Écouteurs d'événements pour les touches du clavier
document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowLeft') {
    shipSpeedX = -shipSpeed;
  } else if (event.code === 'ArrowRight') {
    shipSpeedX = shipSpeed;
  } else if (event.code === 'ArrowUp') {
    shipSpeedY = -shipSpeed;
  } else if (event.code === 'ArrowDown') {
    shipSpeedY = shipSpeed;
  } else if (event.code === 'Space') {
    fireBullet();
  }
});

document.addEventListener('keyup', function(event) {
  if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
    shipSpeedX = 0;
  } else if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
    shipSpeedY = 0;
  }
});

// Fonction pour tirer un projectile
function fireBullet() {
  const bullet = {
    x: shipX + shipWidth / 2 - bulletWidth / 2,
    y: shipY - bulletHeight
  };
  bullets.push(bullet);
}

// Fonction pour démarrer le jeu
function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    lives = 3;
    score = 0;
    obstacles = [];
    bullets = [];
    updateGame();
    setInterval(generateObstacle, 1000); // Générer un obstacle toutes les secondes
  }
}

// Appeler la fonction pour démarrer le jeu
startGame();
