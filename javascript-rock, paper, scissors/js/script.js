document.getElementById("button-rock").addEventListener("click", function () { setPlayerMove("kamień") });
document.getElementById("button-paper").addEventListener("click", function () { setPlayerMove("papier") });
document.getElementById("button-scissors").addEventListener("click", function () { setPlayerMove("nożyce") });
let playerScore = document.getElementById("player-scores");
let computerScore = document.getElementById("comp-scores");