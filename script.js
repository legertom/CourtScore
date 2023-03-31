let pointHistory = [];
let player1ScoreDisplay = document.getElementById('player1ScoreDisplay');
let player2ScoreDisplay = document.getElementById('player2ScoreDisplay');
let player1Button = document.getElementById('player1Button');
let player2Button = document.getElementById('player2Button');
let undoButton = document.getElementById('undoButton');
let resetButton = document.getElementById('resetButton');
let message = document.getElementById('message');
let pointsList = document.getElementById('pointsList').querySelector('ul');

const playerScoreMap = {
  player1: 0,
  player2: 0,
};

function createListItem(point, cssClass, pointNumber, player1CurrentScoreIndex, player2CurrentScoreIndex, scoreLabels) {
    const listItem = document.createElement('li');
    if (cssClass) {
      listItem.classList.add(cssClass);
    }
  
    const playerText = point.player === 'player1' ? 'Player 1' : 'Player 2';
    const player1Score = scoreLabels[player1CurrentScoreIndex];
    const player2Score = scoreLabels[player2CurrentScoreIndex];
  
    listItem.textContent = `Point ${pointNumber}: ${playerText} (${player1Score} - ${player2Score})`;
    return listItem;
  }
  
  
  

function disableButtons() {
  player1Button.disabled = true;
  player2Button.disabled = true;
  undoButton.disabled = true;
}

function updateScore(player) {
    if (playerScoreMap.player1 >= 3 && playerScoreMap.player2 >= 3) {
      updateScoreDeuceSystem(player);
    } else {
      updateScoreRegularSystem(player);
    }
  }
  
  function updateScoreRegularSystem(player) {
    const scoreLabels = ['0', '15', '30', '40', 'Ad', 'Win'];
  
    playerScoreMap[player] += 1;
  
    const player1CurrentScoreIndex = playerScoreMap.player1;
    const player2CurrentScoreIndex = playerScoreMap.player2;
  
    const point = {
      player: player,
      score1: scoreLabels[player1CurrentScoreIndex],
      score2: scoreLabels[player2CurrentScoreIndex],
    };
    pointHistory.push(point);
  
    player1ScoreDisplay.textContent = scoreLabels[player1CurrentScoreIndex];
    player2ScoreDisplay.textContent = scoreLabels[player2CurrentScoreIndex];
  
    const pointNumber = pointHistory.length;
  
    if (player1CurrentScoreIndex >= 4 || player2CurrentScoreIndex >= 4) {
      if (Math.abs(player1CurrentScoreIndex - player2CurrentScoreIndex) >= 2) {
        message.textContent = `${player}: Winner`;
        pointsList.appendChild(createListItem(point, 'winner', pointNumber, player1CurrentScoreIndex, player2CurrentScoreIndex, scoreLabels));
        disableButtons();
        return;
      }
    }
  
    pointsList.appendChild(createListItem(point, null, pointNumber, player1CurrentScoreIndex, player2CurrentScoreIndex, scoreLabels));
    player1Button.disabled = false;
    player2Button.disabled = false;
    undoButton.disabled = false;
  }
  
  function updateScoreDeuceSystem(player) {
    const scoreLabels = ['0', '15', '30', '40', 'Ad', 'Win'];
  
    if (playerScoreMap.player1 === playerScoreMap.player2) {
      message.textContent = 'Deuce';
    } else if (playerScoreMap[player] === 4) {
      message.textContent = `${player}: Advantage`;
      playerScoreMap[player] = 5;
    } else {
      playerScoreMap.player1 = 3;
      playerScoreMap.player2 = 3;
      message.textContent = 'Deuce';
    }
  
    const player1CurrentScoreIndex = playerScoreMap.player1;
    const player2CurrentScoreIndex = playerScoreMap.player2;
  
    const point = {
      player: player,
      score1: scoreLabels[player1CurrentScoreIndex],
      score2: scoreLabels[player2CurrentScoreIndex],
    };
    pointHistory.push(point);
  
    player1ScoreDisplay.textContent = scoreLabels[player1CurrentScoreIndex];
    player2ScoreDisplay.textContent = scoreLabels[player2CurrentScoreIndex];
  
    const pointNumber = pointHistory.length;
  
    if (playerScoreMap[player] === 6) {
      message.textContent = `${player}: Winner`;
      pointsList.appendChild(createListItem(point, 'winner', pointNumber, player1CurrentScoreIndex, player2CurrentScoreIndex, scoreLabels));
      disableButtons();
      return;
    }
  
    pointsList.appendChild(createListItem(point, null, pointNumber, player1CurrentScoreIndex, player2CurrentScoreIndex, scoreLabels));
    player1Button.disabled = false;
    player2Button.disabled = false;
    undoButton.disabled = false;
  }
  
  
  
  
  

function undoLastPoint() {
    if (pointHistory.length > 0) {
      const lastPoint = pointHistory.pop();
      playerScoreMap[lastPoint.player] -= 1;
      const scoreDisplay = lastPoint.player === 'player1' ? player1ScoreDisplay : player2ScoreDisplay;
      scoreDisplay.textContent = lastPoint.score;
  
      pointsList.removeChild(pointsList.lastChild);
  
      message.textContent = '';
      player1Button.disabled = false;
      player2Button.disabled = false;
      undoButton.disabled = false;
    }
  }
  
  function resetGame() {
    playerScoreMap.player1 = 0;
    playerScoreMap.player2 = 0;
    player1ScoreDisplay.textContent = '0';
    player2ScoreDisplay.textContent = '0';
    message.textContent = '';
    pointHistory = [];
  
    while (pointsList.firstChild) {
      pointsList.removeChild(pointsList.firstChild);
    }
  
    player1Button.disabled = false;
    player2Button.disabled = false;
    undoButton.disabled = false;
  }
  
  player1Button.addEventListener('click', () => updateScore('player1'));
  player2Button.addEventListener('click', () => updateScore('player2'));
  undoButton.addEventListener('click', undoLastPoint);
  resetButton.addEventListener('click', resetGame);
  