let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");
        if (board[index] === "" && !gameOver) {
            board[index] = currentPlayer;
            cell.innerText = currentPlayer;

            cell.classList.add("active");
            setTimeout(() => cell.classList.remove("active"), 200);

            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    });
});

function checkWinner() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    winPatterns.forEach(pattern => {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            statusText.innerText = `${board[a]} Wins!`;
        }
    });

    if (!board.includes("") && !gameOver) {
        statusText.innerText = "Draw!";
        gameOver = true;
    }
}

function resetGame() {
    board = ["","","","","","","","",""];
    gameOver = false;
    currentPlayer = "X";
    statusText.innerText = "";
    cells.forEach(c => c.innerText = "");
}
