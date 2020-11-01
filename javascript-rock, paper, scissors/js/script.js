let playerMove;
let computerMove;
let playerScores = document.getElementById("player-scores");
let computerScores = document.getElementById("comp-scores");
playerScores.innerText = 0;
computerScores.innerText = 0;

document.getElementById("button-rock").addEventListener("click", function () {setPlayerMove("rock")});
document.getElementById("button-paper").addEventListener("click", function () {setPlayerMove("paper")});
document.getElementById("button-scissors").addEventListener("click", function () {setPlayerMove("scissors")});

$(document).ready(function () {
    setInterval(updateBgcolorDynamically, 200);
    setInterval(blindingCursor, 400);
});

function printMessage(message) {
    let h2 = document.createElement('h2');
    h2.classList.add("manual");
    h2.innerText = message;
    document.getElementById('messages').appendChild(h2);
}

function clearMessage() {
    document.getElementById("messages").innerText = "";
}

function setPlayerMove(move) {
    playerMove = move;
    clearMessage();
    setComputerMove();
    getResultAndAssignScore();
}

function setComputerMove() {
    let randomNumber = Math.floor(Math.random() * 3 + 1);
    if (randomNumber == 1) {
        computerMove = "rock";
    } else if (randomNumber == 2) {
        computerMove = "paper";
    } else if (randomNumber == 3) {
        computerMove = "scissors";
    }
}

function getResultAndAssignScore() {

    document.getElementById("manual-cursor").classList.remove("cursor");
    document.getElementById("manual-cursor").style.color = "#23b80e";
    document.getElementById("message-cursor").classList.add("cursor");

    if (playerMove == computerMove) {
        printMessage("Player move: " + playerMove + ".");
        printMessage("Computer move: " + computerMove + ".");
        printMessage("Draw!");
    } else if (playerMove == "rock" && computerMove == "scissors") {
        printMessage("Player move: " + playerMove + ".");
        printMessage("Computer move: " + computerMove + ".");
        printMessage("YOU WIN!");
        playerScores.innerText++;
    } else if (playerMove == "paper" && computerMove == "rock") {
        printMessage("Player move: " + playerMove + ".");
        printMessage("Computer move: " + computerMove + ".");
        printMessage("YOU WIN!");
        playerScores.innerText++;
    } else if (playerMove == "scissors" && computerMove == "paper") {
        printMessage("Player move: " + playerMove + ".");
        printMessage("Computer move: " + computerMove + ".");
        printMessage("YOU WIN!");
        playerScores.innerText++;
    } else {
        printMessage("Player move: " + playerMove + ".");
        printMessage("Computer move: " + computerMove + ".");
        printMessage("You lost :(");
        computerScores.innerText++;
    }
}

function updateBgcolorDynamically() {
    let rgb1 = Math.floor(Math.random() * 250 + 1);
    let rgb2 = Math.floor(Math.random() * 250 + 1);
    let rgb3 = Math.floor(Math.random() * 250 + 1);
    document.getElementById("dynamicDiv").style.color = "rgb(" + rgb1 + "," + rgb2 + "," + rgb3 + ")";

    rgb1 = Math.floor(Math.random() * 250 + 1);
    rgb2 = Math.floor(Math.random() * 250 + 1);
    rgb3 = Math.floor(Math.random() * 250 + 1);
    document.getElementById("dynamicDiv2").style.color = "rgb(" + rgb1 + "," + rgb2 + "," + rgb3 + ")";

    rgb1 = Math.floor(Math.random() * 250 + 1);
    rgb2 = Math.floor(Math.random() * 250 + 1);
    rgb3 = Math.floor(Math.random() * 250 + 1);
    document.getElementById("dynamicDiv3").style.color = "rgb(" + rgb1 + "," + rgb2 + "," + rgb3 + ")";
}

function blindingCursor() {
    let i = document.querySelectorAll(".cursor");
    for (let eachIcon of i) {
        if (eachIcon.style.color == "white") {
            eachIcon.style.color = "black";
            return;
        }
        if (eachIcon.style.color == "black") {
            eachIcon.style.color = "white";
        }
    }
}