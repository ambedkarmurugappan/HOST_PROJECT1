// DOM Elements
const startScreen = document.getElementById("start-screen");
const gameArea = document.getElementById("game-area");
const scoreScreen = document.getElementById("score-screen");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const paddleLeft = document.getElementById("paddle-left");
const paddleRight = document.getElementById("paddle-right");
const ball = document.getElementById("ball");
const scoreLeftEl = document.getElementById("score-left");
const scoreRightEl = document.getElementById("score-right");
const finalScoreLeft = document.getElementById("final-score-left");
const finalScoreRight = document.getElementById("final-score-right");

// Game Variables
let ballX = 50, ballY = 50; // Ball position (%)
let ballDX = 1, ballDY = 1; // Ball direction
let ballSpeed = 2;          // Initial ball speed
let paddleLeftY = 50, paddleRightY = 50; // Paddle positions (%)
let paddleSpeed = 5;        // Paddle movement speed
let scoreLeft = 0, scoreRight = 0; // Scores
let gameInterval;           // Interval for game loop

// Start Game
function startGame() {
  // Hide start and score screens, show game area
  startScreen.style.display = "none";
  scoreScreen.style.display = "none";
  gameArea.style.display = "block";

  // Reset variables
  ballX = 50; 
  ballY = 50; 
  ballDX = 1; 
  ballDY = 1;
  ballSpeed = 2; // Reset speed
  paddleLeftY = 50; 
  paddleRightY = 50;
  scoreLeft = 0; 
  scoreRight = 0;

  // Update scores
  scoreLeftEl.textContent = scoreLeft;
  scoreRightEl.textContent = scoreRight;

  // Start the game loop
  clearInterval(gameInterval);
  gameInterval = setInterval(updateGame, 16); // ~60 FPS
}

// End Game
function endGame() {
  // Stop game loop
  clearInterval(gameInterval);

  // Show score screen
  gameArea.style.display = "none";
  scoreScreen.style.display = "flex";

  // Display final scores
  finalScoreLeft.textContent = scoreLeft;
  finalScoreRight.textContent = scoreRight;
}

// Update Game Logic
function updateGame() {
  // Ball Movement
  ballX += ballDX * ballSpeed;
  ballY += ballDY * ballSpeed;

  // Bounce ball off top and bottom walls
  if (ballY <= 0 || ballY >= 100) ballDY *= -1;

  // Ball hits left paddle
  if (ballX <= 5 && ballY >= paddleLeftY && ballY <= paddleLeftY + 20) {
    ballDX *= -1; // Reverse direction
    ballSpeed += 0.2; // Optional: Increase speed
  }

  // Ball hits right paddle
  if (ballX >= 95 && ballY >= paddleRightY && ballY <= paddleRightY + 20) {
    ballDX *= -1; // Reverse direction
    ballSpeed += 0.2; // Optional: Increase speed
  }

  // Ball goes out of bounds
  if (ballX < 0) {
    scoreRight++; // Right player scores
    resetBall();
  }
  if (ballX > 100) {
    scoreLeft++; // Left player scores
    resetBall();
  }

  // Update ball and paddle positions
  ball.style.left = ballX + "%";
  ball.style.top = ballY + "%";
  paddleLeft.style.top = paddleLeftY + "%";
  paddleRight.style.top = paddleRightY + "%";

  // Update scores
  scoreLeftEl.textContent = scoreLeft;
  scoreRightEl.textContent = scoreRight;

  // End game if a player reaches 10 points
  if (scoreLeft >= 10 || scoreRight >= 10) {
    endGame();
  }
}

// Reset Ball Position
function resetBall() {
  ballX = 50; 
  ballY = 50;
  ballDX *= -1; // Reverse direction
  ballSpeed = 2; // Reset speed
}

// Paddle Controls
document.addEventListener("keydown", (e) => {
  if (e.key === "w" && paddleLeftY > 0) paddleLeftY -= paddleSpeed; // Move left paddle up
  if (e.key === "s" && paddleLeftY < 80) paddleLeftY += paddleSpeed; // Move left paddle down
  if (e.key === "ArrowUp" && paddleRightY > 0) paddleRightY -= paddleSpeed; // Move right paddle up
  if (e.key === "ArrowDown" && paddleRightY < 80) paddleRightY += paddleSpeed; // Move right paddle down
});

// Event Listeners
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
