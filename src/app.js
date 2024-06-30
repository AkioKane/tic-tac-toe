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

function GameStatus(status, command) {
    if (status) {
        setTimeout(function () {
            alert("Win this game is " + command);
            resetBoard();
        }, 200);
    }
}
  
function renderBoard() {
    const boardElement = document.querySelector('.container');
    boardElement.innerHTML = ''; // Очищаем игровое поле
  
    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('item');
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

        GameStatus(checkWin(playerCommand), playerCommand)

        makeBotMove()

    }
}

function makeBotMove() {
    // Простейшая реализация бота: выбираем первую пустую клетку слева направо, сверху вниз
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === '') {
                if (playerCommand == "X") {
                    AIPlayerCommand = "O"
                }
                else {
                    AIPlayerCommand = "X"
                }
                board[row][col] = AIPlayerCommand;
                setTimeout(renderBoard, 100)
                GameStatus(checkWin(AIPlayerCommand), AIPlayerCommand)
                return;
            }
        }
    }
}

function resetBoard() {
    items.forEach(item => {
        item.innerHTML = "";
    })
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
}

items.forEach(item => {
    item.addEventListener('click', function () {
        if (item.textContent === "") {
            item.textContent = playerCommand;
        }
    })
});

btnChoice.forEach(btn => {
    btn.addEventListener("click", function () {
        playerCommand = btn.textContent;
        resetBoard();
    })
})

