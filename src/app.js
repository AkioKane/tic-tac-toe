let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let playerCommand = "X"

const items = document.querySelectorAll(".item")
const btnChoice = document.querySelectorAll(".btn-choice")

function checkWin(player) {
    // Проверка по горизонтали, вертикали и диагоналям
    for (let i = 0; i < 3; i++) {
        if (
            (board[i][0] === player && board[i][1] === player && board[i][2] === player) ||
            (board[0][i] === player && board[1][i] === player && board[2][i] === player)
            ) {
                return true;
            }
    }
    if (
        (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
        (board[0][2] === player && board[1][1] === player && board[2][0] === player)
    ) {
        return true;
    }
    return false;
}

function GameStatus(status) {
    if (status) {
        setTimeout(function () {
            alert("Win this game is" + playerCommand);
        }, 100);
    }
}

function renderBoard() {
    const boardElement = document.querySelector('.container');
    boardElement.innerHTML = ''; // Очищаем игровое поле
  
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = cell;
            cellElement.onclick = () => cellClick(rowIndex, colIndex);
            boardElement.appendChild(cellElement);
        });
    });
}
  
function cellClick(row, col) {
    if (board[row][col] === '') {
        board[row][col] = playerCommand;
        // renderBoard();
        // checkGameStatus();
        // currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Переключение игрока
    }
}

function resetBoard() {
    items.forEach(item => {
        item.innerHTML = "";
    })
}

items.forEach(item => {
    item.addEventListener('click', function () {
        if (item.textContent === "") {
            item.textContent = playerCommand;
            GameStatus(checkWin(playerCommand))
        }
    })
});

btnChoice.forEach(btn => {
    btn.addEventListener("click", function () {
        playerCommand = btn.textContent;
        resetBoard();
    })
})

