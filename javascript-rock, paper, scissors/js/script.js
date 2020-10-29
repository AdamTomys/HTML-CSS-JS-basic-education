document.getElementById("button-rock").addEventListener("click", function () { setPlayerMove("kamień") });
document.getElementById("button-paper").addEventListener("click", function () { setPlayerMove("papier") });
document.getElementById("button-scissors").addEventListener("click", function () { setPlayerMove("nożyce") });
let playerScore = document.getElementById("player-scores");
let computerScore = document.getElementById("comp-scores");

function printMessage(msg){
    let div = document.createElement('div');
    div.innerHTML = msg;
    document.getElementById('messages').appendChild(div);
}

function clearMessages(){
    document.getElementById('messages').innerHTML = '';
}

function getComputerMove() {
    let randomNumber;
    randomNumber = Math.floor(Math.random() * 3 + 1);
    if (randomNumber == 1) {
        computerMove = "kamień";
        return printMessage("Ruch komputera: " + computerMove);
    } else if (randomNumber == 2) {
        computerMove = "papier";
        return printMessage("Ruch komputera: " + computerMove);
    } else {
        computerMove = "nożyce";
        return printMessage("Ruch komputera: " + computerMove);
    }
}

function setPlayerMove(buttonName) {
    clearMessages();
    playerMove = buttonName;
    printMessage("Twój ruch: " + playerMove);
    getComputerMove();
    displayResult();
}

function displayResult() {
    if (computerMove == "kamień" && playerMove == "papier") {
        printMessage("Wygrałeś !");
        playerScore.innerText++;
    } else if (computerMove == "papier" && playerMove == "nożyce") {
        printMessage("Wygrałeś !");
        playerScore.innerText++;
    } else if (computerMove == "nożyce" && playerMove == "kamień") {
        printMessage("Wygrałeś !");
        playerScore.innerText++;
    } else if (computerMove == playerMove) {
        printMessage("Remis !");
    } else if (playerMove == null) {
        printMessage("Wybierz ponownie swój ruch");
    } else {
        printMessage("Przegrałeś :(");
        computerScore.innerText++;
    }
}

