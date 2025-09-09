let playerScore = 0;
let computerScore = 0;

async function play(playerChoice) {
  const playerHand = document.getElementById("player-hand");
  const computerHand = document.getElementById("computer-hand");
  const statusDiv = document.getElementById("status");
  const resultDiv = document.getElementById("result");
  const buttons = document.querySelectorAll(".choices button");

  const choices = ["rock", "paper", "scissors"];
  const emojis = { rock: "✊", paper: "✋", scissors: "✌" };

  // Disable buttons during play
  buttons.forEach(btn => btn.disabled = true);

  // Reset hands and status
  playerHand.textContent = "✊";
  computerHand.textContent = "✊";
  statusDiv.textContent = "Choosing...";

  // Add shake animation
  playerHand.classList.add("shake");
  computerHand.classList.add("shake");

  await new Promise(resolve => setTimeout(resolve, 1200));

  playerHand.classList.remove("shake");
  computerHand.classList.remove("shake");

  // Computer choice
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  // Show hands
  playerHand.textContent = emojis[playerChoice];
  computerHand.textContent = emojis[computerChoice];

  // Update aria-pressed
  buttons.forEach(btn => {
    btn.setAttribute("aria-pressed", btn.textContent.toLowerCase().includes(playerChoice));
  });

  // Decide result
  let result;
  if (playerChoice === computerChoice) {
    result = "It's a Draw!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "🎉 You Win!";
    playerScore++;
  } else {
    result = "💀 You Lose!";
    computerScore++;
  }

  // Update status and result
  statusDiv.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}.`;
  resultDiv.textContent = result;

  // Update scoreboard
  document.getElementById("player-score").textContent = playerScore;
  document.getElementById("computer-score").textContent = computerScore;

  // Re-enable buttons
  buttons.forEach(btn => btn.disabled = false);
}

// Reset game handler
document.getElementById("reset-btn").addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  document.getElementById("player-score").textContent = 0;
  document.getElementById("computer-score").textContent = 0;
  document.getElementById("status").textContent = "Let's Play!!";
  document.getElementById("result").textContent = "";
  document.getElementById("player-hand").textContent = "✊";
  document.getElementById("computer-hand").textContent = "✊";

  // Reset aria-pressed on buttons
  const buttons = document.querySelectorAll(".choices button");
  buttons.forEach(btn => btn.setAttribute("aria-pressed", "false"));
});