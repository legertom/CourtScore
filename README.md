# CourtScore
Developed by Tom Léger

## Description
This is a scorekeeping app for a tennis game that allows the user to choose how many sets they want to play (1, 3, 5, or custom). The standard rules apply: Players win the set by winning 6 games, but they must win by two. If both players win 6 games, they play a tiebreak to 7 points, and must also win by 2.

The app UI is easy to use and has just a few large colorful buttons. The color scheme is tennis-themed, with variations on green, the color of grass. The application is designed mobile-first but also usable on the desktop.

## Files
The project includes the following files:

index.html: The HTML file that defines the structure of the app.
styles.css: The CSS file that styles the app.
script.js: The JavaScript file that provides the functionality for the app.
## Functionality
The app allows the user to:

Choose the number of sets to play.
Keep track of the points, games, and sets won by each player.
Reset the score for the point, the game, the set, or the entire match.
Play according to the standard rules.
Code Excerpts
Here are two code excerpts from the script.js file that demonstrate how the app keeps track of the points, games, and sets won by each player:

```javascript
function handlePointClick(e) {
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
```
This function is called when the user clicks on a player's point button. It determines which player's button was clicked, increments their score, updates the score display, and checks if the game has been won.

```javascript
function updateSets() {
  player1SetEl.textContent = player1Sets;
  player2SetEl.textContent = player2Sets;
}
```
This function updates the displayed set scores for both players by setting the text content of the corresponding HTML elements.

## Links
Link to the project
Link to Tom Léger's GitHub
Link to Tom Léger's portfolio



