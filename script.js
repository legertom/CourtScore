let pointHistory = [];
let player1ScoreDisplay = document.getElementById('player1ScoreDisplay');
let player2ScoreDisplay = document.getElementById('player2ScoreDisplay');
let player1Button = document.getElementById('player1Button');
let player2Button = document.getElementById('player2Button');
let undoButton = document.getElementById('undoButton');
let message = document.getElementById('message');
let pointsList = document.getElementById('pointsList').querySelector('ul');

const playerScoreMap = {
  player1: 0,
  player2: 0,
};

function createListItem(point, className) {
  let listItem = document.createElement('li');
  listItem.textContent = `${point.player}: ${point.score}`;
  if (className) {
    listItem.classList.add(className);
  }
  return listItem;
}

function disableButtons() {
  player1Button.disabled = true;
  player2Button.disabled = true;
  undoButton.disabled = true;
}

function updateScore(player) {
  // Define score labels
  const scoreLabels = ['0', '15', '30', '40'];

  // Add point to point history
  const point = { player: player, score: scoreLabels[playerScoreMap[player]] };
  pointHistory.push(point);

  // Update player score and display
  playerScoreMap[player] += 1;
  const score = playerScoreMap[player];
  const scoreDisplay = player === 'player1' ? player1ScoreDisplay : player2ScoreDisplay;

  if (score < scoreLabels.length) {
    scoreDisplay.textContent = scoreLabels[score];
  }

  // Disable buttons and update message
  player1Button.disabled = true;
  player2Button.disabled = true;
  undoButton.disabled = true;

  // Check if score is deuce or advantage and update message if necessary
  if (playerScoreMap.player1 === 3 && playerScoreMap.player2 === 3) {
    // Deuce
    message.textContent = 'Deuce';
  } else if (playerScoreMap.player1 === playerScoreMap.player2 + 1) {
    // Advantage player 1
    message.textContent = 'Player 1: Advantage';
  } else if (playerScoreMap.player2 === playerScoreMap.player1 + 1) {
    // Advantage player 2
    message.textContent = 'Player 2: Advantage';
  } else if (score === 4 && Math.abs(playerScoreMap.player1 - playerScoreMap.player2) >= 2) {
    // Player wins game
    message.textContent = `${player}: Winner`;
    pointsList.appendChild(createListItem(point, 'winner'));
    disableButtons();
  } else {
    // Add point to point history list and enable buttons
    pointsList.appendChild(createListItem(point));
    player1Button.disabled = false;
    player2Button.disabled = false;
    undoButton.disabled = false;
  }
}

player1Button.addEventListener('click', () => updateScore('player1'));
player2Button.addEventListener('click', () => updateScore('player2'));
