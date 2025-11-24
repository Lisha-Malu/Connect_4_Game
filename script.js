var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = []; //keeps track of which row each column is at.

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    // set initial turn display
    let turnDisplay = document.getElementById("turn");
    turnDisplay.innerText = "Red's Turn";
    turnDisplay.classList.add("red-turn");

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c]; 
    if (r < 0) {
        return;
    }

    board[r][c] = currPlayer; 
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    let turnDisplay = document.getElementById("turn"); // always get element here

    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;

        // update to Yellow’s turn
        turnDisplay.innerText = "Yellow's Turn";
        turnDisplay.classList.remove("red-turn");
        turnDisplay.classList.add("yellow-turn");
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;

        // update to Red’s turn
        turnDisplay.innerText = "Red's Turn";
        turnDisplay.classList.remove("yellow-turn");
        turnDisplay.classList.add("red-turn");
    }

    r -= 1; 
    currColumns[c] = r; 

    checkWinner();
}

function checkWinner() {
    // horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // Check for draw (no spaces left in top row)
    let draw = true;
    for (let c = 0; c < columns; c++) {
        if (board[0][c] == ' ') {
            draw = false;
            break;
        }
    }

    if (draw) {
        setDraw();
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    let turnDisplay = document.getElementById("turn");

    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins";
    } else {
        winner.innerText = "Yellow Wins";
    }

    // always green for a winner
    winner.style.color = "green";

    turnDisplay.innerText = "";
    turnDisplay.classList.remove("red-turn", "yellow-turn");

    gameOver = true;
}

function setDraw() {
    let winner = document.getElementById("winner");
    let turnDisplay = document.getElementById("turn");

    winner.innerText = "Game Draw!";
    winner.style.color = "gray";

    turnDisplay.innerText = "";
    turnDisplay.classList.remove("red-turn", "yellow-turn");

    gameOver = true;
}
