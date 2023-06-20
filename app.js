
    // Game logic
    let currentPlayer = "x";
    let gameEnded = false;
    let board = ["", "", "", "", "", "", "", "", ""];

    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    const boardElement = document.querySelector(".board");
    const messageElement = document.querySelector(".message");

    function renderBoard() {
      boardElement.innerHTML = "";
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        cell.textContent = board[i];
        boardElement.appendChild(cell);
      }
    }

    function handleCellClick() {
      if (gameEnded) return;

      const cellIndex = parseInt(this.dataset.index);

      if (board[cellIndex] === "") {
        board[cellIndex] = currentPlayer;
        this.textContent = currentPlayer;
        this.classList.add(currentPlayer);

        if (checkWin(currentPlayer)) {
          endGame(currentPlayer + " wins!");
        } else if (board.filter(cell => cell === "").length === 0) {
          endGame("It's a draw!");
        } else {
          currentPlayer = currentPlayer === "x" ? "o" : "x";
        }
      }
    }

    function checkWin(player) {
      return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
      });
    }

    function endGame(message) {
      gameEnded = true;
      messageElement.textContent = message;
    }

    renderBoard();
 