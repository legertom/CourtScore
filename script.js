//Part 1 - Variables
const pointHistory = [];
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

  listItem.textContent = `Point ${pointNumber}: ${playerText} (${player1Score} - ${player2Score})`;
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

function updateScoreRegularSystem(player) {
  console.log("updateScoreRegularSystem");
  const scoreLabels = ["0", "15", "30", "40", "Win"];

  playerScoreMap[player] += 1;
  // Determines the index at which the score for each player is found based on the number of points they have scored
  const player1CurrentScoreIndex = playerScoreMap.player1;
  const player2CurrentScoreIndex = playerScoreMap.player2;

  const point = {
    player: player,
    score1: scoreLabels[player1CurrentScoreIndex],
    score2: scoreLabels[player2CurrentScoreIndex],
  };
  pointHistory.push(point);
  //Displays the score on the page
  player1ScoreDisplay.textContent = scoreLabels[player1CurrentScoreIndex];
  player2ScoreDisplay.textContent = scoreLabels[player2CurrentScoreIndex];

  //Determine the number of points scored so we can display that in the list of points
  const pointNumber = pointHistory.length;

  // Check if any player has reached 4 points while the other has 2 or fewer points
  if (
    (player1CurrentScoreIndex >= 4 && player1CurrentScoreIndex - player2CurrentScoreIndex >= 2) ||
    (player2CurrentScoreIndex >= 4 && player2CurrentScoreIndex - player1CurrentScoreIndex >= 2)
  ) {
    message.textContent = `${player}: Winner`;
    pointsList.appendChild(createListItem(point, 'winner', pointNumber, player1CurrentScoreIndex, player2CurrentScoreIndex, scoreLabels));
    disableButtons();
  } else if (player1CurrentScoreIndex === 3 && player2CurrentScoreIndex === 3) {
    message.textContent = 'Deuce';
    pointsList.appendChild(createListItem(point, null, pointNumber, player1CurrentScoreIndex, player2CurrentScoreIndex, scoreLabels));
  } else {
    pointsList.appendChild(createListItem(point, null, pointNumber, player1CurrentScoreIndex, player2CurrentScoreIndex, scoreLabels));
  }

  player1Button.disabled = false;
  player2Button.disabled = false;
  undoButton.disabled = false;
}

function updateScoreDeuceSystem(player) {
  console.log("updateScoreDeuceSystem");
  const scoreLabels = ["0", "15", "30", "40", "Ad", "Win"];
  const opponent = player === "player1" ? "player2" : "player1";

  if (playerScoreMap[player] === 3 && playerScoreMap[opponent] === 3) {
    message.textContent = "Deuce";
    console.log("Deuce");
  } else if (playerScoreMap[player] === 3 && playerScoreMap[opponent] === 4) {
    playerScoreMap[player] = 4;
    playerScoreMap[opponent] = 3;
    message.textContent = "Advantage";
    console.log("Advantage", player);
  } else if (playerScoreMap[player] === 3) {
    playerScoreMap[player] = 4;
    message.textContent = `${player}: Advantage`;
    console.log("Advantage", player);
  } else {
    playerScoreMap[player] = 6;
    message.textContent = `${player}: Winner`;
    console.log("winner", player);
    disableButtons();
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
  pointsList.appendChild(
    createListItem(
      point,
      null,
      pointNumber,
      player1CurrentScoreIndex,
      player2CurrentScoreIndex,
      scoreLabels
    )
  );

  player1Button.disabled = false;
  player2Button.disabled = false;
  undoButton.disabled = false;
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

  player1Button.disabled = false;
  player2Button.disabled = false;
  undoButton.disabled = false;
}

player1Button.addEventListener("click", () => updateScore("player1"));
player2Button.addEventListener("click", () => updateScore("player2"));
undoButton.addEventListener("click", undoLastPoint);
resetButton.addEventListener("click", resetGame);
