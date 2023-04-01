//Part 1 - Variables
let pointHistory = []; //must be let so it can be changed later
const player1ScoreDisplay = document.getElementById("player1ScoreDisplay");
const player2ScoreDisplay = document.getElementById("player2ScoreDisplay");
const player1Button = document.getElementById("player1Button");
const player2Button = document.getElementById("player2Button");
const undoButton = document.getElementById("undoButton");
const resetButton = document.getElementById("resetButton");
const message = document.getElementById("message");
const pointsList = document.getElementById("pointsList").querySelector("ul");

const playerScoreMap = {
  player1: 0,
  player2: 0,
};
// Part 2 - Functions

//Create a list item for each point --this appears in the <ul> in the HTML at the bottom of the page
function createListItem(
  point,
  cssClass,
  pointNumber,
  player1CurrentScoreIndex,
  player2CurrentScoreIndex,
  scoreLabels
) {
  const listItem = document.createElement("li");
  if (cssClass) {
    listItem.classList.add(cssClass);
  }

  const playerText = point.player === "player1" ? "Player 1" : "Player 2";
  const player1Score = scoreLabels[player1CurrentScoreIndex];
  const player2Score = scoreLabels[player2CurrentScoreIndex];

  listItem.textContent = `CLI Point ${pointNumber}: ${playerText} (${player1Score} - ${player2Score})`;
  return listItem;
}

//Disable the buttons when the game is over
function disableButtons() {
  player1Button.disabled = true;
  player2Button.disabled = true;
}

function updateScore(player) {
  console.log("updateScore");
  if (playerScoreMap.player1 >= 3 && playerScoreMap.player2 >= 3) {
    updateScoreDeuceSystem(player);
  } else {
    updateScoreRegularSystem(player);
  }
}

function updatePlayerScore(player, playerScoreMap) {
    playerScoreMap[player] += 1;
  }

  function getPlayerScores(playerScoreMap, scoreLabels) {
    return {
      score1: scoreLabels[playerScoreMap.player1],
      score2: scoreLabels[playerScoreMap.player2]
    };
  }

  function updateMessage(player, playerScores, message) {
    if (playerScores.score1 === "Win") {
      message.textContent = "Player 1: Winner";
    } else if (playerScores.score2 === "Win") {
      message.textContent = "Player 2: Winner";
    } else if (playerScores.score1 === "40" && playerScores.score2 === "40") {
      message.textContent = "Deuce";
    } else if (playerScores.score1 === "A") {
      message.textContent = "Player 1: Advantage";
    } else if (playerScores.score2 === "A") {
      message.textContent = "Player 2: Advantage";
    } else {
      message.textContent = "";
    }
  }
  
  function disableScoreButtons(button1, button2) {
    button1.disabled = true;
    button2.disabled = true;
  }
  
  function updateScoreList(point, playerScores, pointNumber, scoreLabels, pointsList) {
    const playerText = point.player === "player1" ? "Player 1" : "Player 2";
    const listItem = document.createElement("li");
    const playerScoreText = `${playerScores.score1} - ${playerScores.score2}`;
    listItem.textContent = `Point ${pointNumber}: ${playerText} (${playerScoreText})`;
    pointsList.appendChild(listItem);
  }
  
  function enableUndoButton(undoButton) {
    undoButton.disabled = false;
  }

  
  function createPoint(player, playerScores, pointNumber) {
    return {
      player: player,
      score1: playerScores.score1,
      score2: playerScores.score2,
      pointNumber: pointNumber
    };
  }
  
  function displayScore(player, scoreLabels) {
    player1ScoreDisplay.textContent = scoreLabels[playerScoreMap.player1];
    player2ScoreDisplay.textContent = scoreLabels[playerScoreMap.player2];
  }
  
  function updateScoreRegularSystem(player) {
    console.log("updateScoreRegularSystem");
    
    updatePlayerScore(player, playerScoreMap);
  
    const scoreLabels = ["0", "15", "30", "40", "Win"];
    
    const playerScores = getPlayerScores(playerScoreMap, scoreLabels);
    const pointNumber = pointHistory.length + 1;
    const point = createPoint(player, playerScores, pointNumber);
    
    displayScore(player, scoreLabels);
    
    updateMessage(player, playerScores, message);
    updateScoreList(point, playerScores, pointNumber, scoreLabels, pointsList);
    pointHistory.push(point);
  
    if (playerScores.score1 === "Win" || playerScores.score2 === "Win") {
      disableScoreButtons(player1Button, player2Button);
    }
    
    enableUndoButton(undoButton);
  }
  
  

  function updateScoreDeuceSystem(player) {
    console.log("updateScoreDeuceSystem");
  
    const scoreLabels = ["0", "15", "30", "40", "A", "Win"];
    const opponent = player === "player1" ? "player2" : "player1";
  
    const playerState = `${playerScoreMap[player]},${playerScoreMap[opponent]}`;
  
    switch (playerState) {
      case '3,3':
        playerScoreMap[player] += 1;
        message.textContent = `${player}: Advantage`;
        break;
      case '4,4':
        playerScoreMap[player] = 3;
        playerScoreMap[opponent] = 3;
        message.textContent = "Deuce";
        break;
      case '4,3':
      case '3,4':
        if (playerScoreMap[opponent] === 4) {
          playerScoreMap[opponent] = 3;
          message.textContent = "Deuce";
        } else {
          playerScoreMap[player] += 1;
          message.textContent = `${player}: Winner`;
          disableScoreButtons(player1Button, player2Button);
        }
        break;
      default:
        playerScoreMap[player] += 1;
        message.textContent = `${player}: Advantage`;
        break;
    }
  
    const playerScores = getPlayerScores(playerScoreMap, scoreLabels);
    const pointNumber = pointHistory.length + 1;
    const point = createPoint(player, playerScores, pointNumber);
  
    displayScore(player, scoreLabels);
  
    updateMessage(player, playerScores, message);
    updateScoreList(point, playerScores, pointNumber, scoreLabels, pointsList);
    pointHistory.push(point);
  
    if (playerScores.score1 === "Win" || playerScores.score2 === "Win") {
      disableScoreButtons(player1Button, player2Button);
    }
  
    enableUndoButton(undoButton);
  }
  
  

// Part 3 - On Click Events

function undoLastPoint() {
  if (pointHistory.length > 0) {
    const lastPoint = pointHistory.pop();
    playerScoreMap[lastPoint.player] -= 1;
    const scoreDisplay =
      lastPoint.player === "player1"
        ? player1ScoreDisplay
        : player2ScoreDisplay;
    scoreDisplay.textContent = lastPoint.score;

    pointsList.removeChild(pointsList.lastChild);

    message.textContent = "";
    player1Button.disabled = false;
    player2Button.disabled = false;
    undoButton.disabled = false;
  }
}

function enableButtons() {
  player1Button.disabled = false;
  player2Button.disabled = false;
}

function resetGame() {
  playerScoreMap.player1 = 0;
  playerScoreMap.player2 = 0;
  player1ScoreDisplay.textContent = "0";
  player2ScoreDisplay.textContent = "0";
  message.textContent = "";
  pointHistory = [];

  while (pointsList.firstChild) {
    pointsList.removeChild(pointsList.firstChild);
  }

  // Call enableButtons to enable both player buttons
  enableButtons();
  undoButton.disabled = true;
}


player1Button.addEventListener("click", () => updateScore("player1"));
player2Button.addEventListener("click", () => updateScore("player2"));
undoButton.addEventListener("click", undoLastPoint);
resetButton.addEventListener("click", resetGame);
