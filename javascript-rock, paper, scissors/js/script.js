let playerMove;
let computerMove;
let playerScores = document.getElementById("player-scores");
let computerScores = document.getElementById("comp-scores");
playerScores.innerText = 0;
computerScores.innerText = 0;
document.getElementById("button-rock").addEventListener("click", function () {setPlayerMove("kamień")});
document.getElementById("button-paper").addEventListener("click", function () {setPlayerMove("papier")});
document.getElementById("button-scissors").addEventListener("click", function () {setPlayerMove("nożyce")});

function printMessage(message) {
    let div = document.createElement('div');
    div.innerHTML = message;
    document.getElementById('messages').appendChild(div);
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
        computerMove = "kamień";
    } else if (randomNumber == 2) {
        computerMove = "papier";
    } else if (randomNumber == 3) {
        computerMove = "nożyce";
    }
}

function getResultAndAssignScore() {
    if (playerMove == computerMove) {
        printMessage("Zagrałeś " + playerMove + ". Komputer zagrał " + computerMove + ".");
        printMessage("Remis!");
    } else if (playerMove == "kamień" && computerMove == "nożyce") {
        printMessage("Zagrałeś kamień. Komputer zagrał nożyce.");
        printMessage("Wygrałeś!");
        playerScores.innerText++;
    } else if (playerMove == "papier" && computerMove == "kamień") {
        printMessage("Zagrałeś papier. Komputer zagrał kamień.");
        printMessage("Wygrałeś!");
        playerScores.innerText++;
    } else if (playerMove == "nożyce" && computerMove == "papier") {
        printMessage("Zagrałeś nożyce. Komputer zagrał papier.");
        printMessage("Wygrałeś!");
        playerScores.innerText++;
    } else {
        printMessage("Zagrałeś " + playerMove + ". Komputer zagrał " + computerMove + ".");
        printMessage("Przegrałeś :(");
        computerScores.innerText++;
    }
}