// DOM Elements
const setsEl = document.querySelector("#sets");
const player1PointEl = document.querySelector(".player1 .point");
const player2PointEl = document.querySelector(".player2 .point");
const player1GameEl = document.querySelector(".player1 .game");
const player2GameEl = document.querySelector(".player2 .game");
const player1SetEl = document.querySelector(".player1 .set");
const player2SetEl = document.querySelector(".player2 .set");
const clearBtns = document.querySelectorAll(".clear");

// Game Variables
let sets = 1;
let player1Points = 0;
let player2Points = 0;
let player1Games = 0;
let player2Games = 0;
let player1Sets = 0;
let player2Sets = 0;
let isTiebreak = false;
let maxPoints = 6;
let maxGames = 6;

// Event Listeners
setsEl.addEventListener("change", handleSetsChange);
player1PointEl.addEventListener("click", handlePointClick);
player2PointEl.addEventListener("click", handlePointClick);
clearBtns.forEach((btn) => btn.addEventListener("click", handleClearClick));

// Functions
function handleSetsChange() {
  const value = setsEl.value;
  if (value === "custom") return;
  sets = parseInt(value);
  maxGames = sets === 1 ? 6 : 5;
  maxPoints = maxGames === 5 ? 7 : 6;
  resetGame();
}

function handlePointClick(e) {
  if (isTiebreak) handleTiebreakPoint(e);
  else handleRegularPoint(e);
}

function handleRegularPoint(e) {
  const player = e.target.parentElement.parentElement.classList.contains(
    "player1"
  )
    ? "player1"
    : "player2";
  if (player === "player1") {
    player1Points++;
  } else {
    player2Points++;
  }
  updatePoints();
  checkGameWinner();
}

function handleTiebreakPoint(e) {
  const player = e.target.parentElement.parentElement.classList.contains(
    "player1"
  )
    ? "player1"
    : "player2";
  if (player === "player1") {
    player1Points++;
  } else {
    player2Points++;
  }
  updatePoints();
  checkTiebreakWinner();
}

function handleClearClick(e) {
  const clearType = e.target.dataset.clear;
  switch (clearType) {
    case "point":
      clearPoint();
      break;
    case "game":
      clearGame();
      break;
    case "set":
      clearSet();
      break;
    case "match":
      resetGame();
      break;
  }
}

function updatePoints() {
  player1PointEl.textContent = player1Points;
  player2PointEl.textContent = player2Points;
}

function updateGames() {
  player1GameEl.textContent = player1Games;
  player2GameEl.textContent = player2Games;
}

function updateSets() {
    player1SetEl.textContent = player1Sets;
    player2SetEl.textContent = player2Sets;
  }
  
  function checkGameWinner() {
    if (player1Points >= maxPoints && player1Points - player2Points >= 2) {
      player1Games++;
      clearPoint();
      if (player1Games === maxGames) {
        player1Sets++;
        clearGame();
        if (player1Sets === sets) {
          handleMatchWinner("player1");
        }
      }
      updateGames();
    } else if (
      player2Points >= maxPoints &&
      player2Points - player1Points >= 2
    ) {
      player2Games++;
      clearPoint();
      if (player2Games === maxGames) {
        player2Sets++;
        clearGame();
        if (player2Sets === sets) {
          handleMatchWinner("player2");
        }
      }
      updateGames();
    } else if (player1Points === maxPoints && player2Points === maxPoints) {
      isTiebreak = true;
      clearPoint();
    }
  }
  
  function checkTiebreakWinner() {
    if (player1Points >= 7 && player1Points - player2Points >= 2) {
      player1Games++;
      clearPoint();
      isTiebreak = false;
      if (player1Games === maxGames) {
        player1Sets++;
        clearGame();
        if (player1Sets === sets) {
          handleMatchWinner("player1");
        }
      }
      updateGames();
      updatePoints();
    } else if (player2Points >= 7 && player2Points - player1Points >= 2) {
      player2Games++;
      clearPoint();
      isTiebreak = false;
      if (player2Games === maxGames) {
        player2Sets++;
        clearGame();
        if (player2Sets === sets) {
          handleMatchWinner("player2");
        }
      }
      updateGames();
      updatePoints();
    }
  }
  
  function handleTiebreakPoint(e) {
    const player = e.target.parentElement.parentElement.classList.contains(
      "player1"
    )
      ? "player1"
      : "player2";
    if (player === "player1") {
      player1Points++;
    } else {
      player2Points++;
    }
    updatePoints();
    checkTiebreakWinner();
  }
  
  function handleClearClick(e) {
    const clearType = e.target.dataset.clear;
    switch (clearType) {
      case "point":
        clearPoint();
        break;
      case "game":
        clearGame();
        break;
      case "set":
        clearSet();
        break;
      case "match":
        resetGame();
        break;
    }
  }
  
  function clearPoint() {
    player1Points = 0;
    player2Points = 0;
    updatePoints();
  }
  
  function clearGame() {
    player1Games = 0;
    player2Games = 0;
    clearPoint();
    updateGames();
  }
  
  function clearSet() {
    player1Sets = 0;
    player2Sets = 0;
    clearGame();
    updateSets();
  }
  
  function resetGame() {
    sets = 1;
    player1Points = 0;
    player2Points = 0;
    player1Games = 0;
    player2Games = 0;
    player1Sets = 0;
    player2Sets = 0;
    isTiebreak = false;
    maxPoints = 6;
    maxGames = 6;
    updatePoints();
    updateGames();
    updateSets();
  }
  
  function handleMatchWinner(player) {
    const winnerEl = document.querySelector(`.${player} .winner`);
    winnerEl.style.display = "block";
    player1PointEl.removeEventListener("click", handlePointClick);
    player2PointEl.removeEventListener("click", handlePointClick);
  }
  
  // Initial Setup
  resetGame();
  