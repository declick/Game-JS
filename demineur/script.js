const gridSize = 5;
let grid = [];
let bombs = [];
let flaggedCells = [];
let gameover = false;

// Créer la grille de jeu
function createGrid() {
  const gridContainer = document.getElementById('grid-container');
  gridContainer.innerHTML = '';

  for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = i;
      cell.dataset.col = j;

      // Gestion des clics sur les cellules
      cell.addEventListener('click', handleCellClick);
      cell.addEventListener('contextmenu', handleCellRightClick);

      gridContainer.appendChild(cell);
      grid[i][j] = cell;
    }
  }
}

// Placer les bombes aléatoirement
function placeBombs() {
  bombs = [];

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const bomb = Math.random() < 0.2; // 20% de chances d'avoir une bombe
      if (bomb) {
        bombs.push({ row: i, col: j });
      }
    }
  }
}

// Gestion du clic sur une cellule
function handleCellClick(event) {
  if (gameover) {
    return;
  }

  const cell = event.target;
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  if (bombs.some(bomb => bomb.row === row && bomb.col === col)) {
    revealBoard();
    cell.classList.add('bomb');
    gameover = true;
    alert('Boom! Vous avez perdu.');
  } else {
    const bombCount = countAdjacentBombs(row, col);
    cell.innerText = bombCount;

    if (bombCount === 0) {
      revealAdjacentCells(row, col);
    }

    cell.removeEventListener('click', handleCellClick);
  }

  checkWinCondition();
}

// Gestion du clic droit sur une cellule
function handleCellRightClick(event) {
  event.preventDefault();

  if (gameover) {
    return;
  }

  const cell = event.target;
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  if (flaggedCells.some(flaggedCell => flaggedCell.row === row && flaggedCell.col === col)) {
    cell.classList.remove('flagged');
    flaggedCells = flaggedCells.filter(flaggedCell => flaggedCell.row !== row || flaggedCell.col !== col);
  } else {
    cell.classList.add('flagged');
    flaggedCells.push({ row, col });
  }
}

// Compter le nombre de bombes adjacentes à une cellule
function countAdjacentBombs(row, col) {
  let count = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }

      const adjRow = row + i;
      const adjCol = col + j;

      if (adjRow >= 0 && adjRow < gridSize && adjCol >= 0 && adjCol < gridSize) {
        if (bombs.some(bomb => bomb.row === adjRow && bomb.col === adjCol)) {
          count++;
        }
      }
    }
  }

  return count;
}

// Révéler les cellules adjacentes vides
function revealAdjacentCells(row, col) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }

      const adjRow = row + i;
      const adjCol = col + j;

      if (adjRow >= 0 && adjRow < gridSize && adjCol >= 0 && adjCol < gridSize) {
        const adjCell = grid[adjRow][adjCol];

        if (!adjCell.innerText) {
          adjCell.click();
        }
      }
    }
  }
}

// Révéler tout le plateau en cas de défaite
function revealBoard() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = grid[i][j];

      if (bombs.some(bomb => bomb.row === i && bomb.col === j)) {
        cell.classList.add('bomb');
      } else {
        const bombCount = countAdjacentBombs(i, j);
        cell.innerText = bombCount || '';
      }

      cell.removeEventListener('click', handleCellClick);
      cell.removeEventListener('contextmenu', handleCellRightClick);
    }
  }
}

// Vérifier la condition de victoire
function checkWinCondition() {
  const revealedCount = document.querySelectorAll('.cell:not(.flagged):not(:empty)').length;
  const totalCells = gridSize * gridSize;
  const bombCount = bombs.length;

  if (revealedCount === totalCells - bombCount) {
    revealBoard();
    gameover = true;
    alert('Félicitations! Vous avez gagné.');
    gridSize++;
    startNewGame();
  }
}


// Démarrer une nouvelle partie
function startNewGame() {
  grid = [];
  bombs = [];
  flaggedCells = [];
  gameover = false;
  createGrid();
  placeBombs();
}

// Bouton pour réinitialiser le jeu
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', startNewGame);

// Démarrer le jeu
startNewGame();
