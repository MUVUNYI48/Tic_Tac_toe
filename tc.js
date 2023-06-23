// ...

// Gameboard module
const Gameboard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
  
    const getBoard = () => board;
    const updateCell = (index, player) => {
      if (board[index] === '') {
        board[index] = player.getSymbol();
        return true; // Cell updated successfully
      }
      return false; // Cell already occupied
    };
    const resetBoard = () => {
      board = ['', '', '', '', '', '', '', '', ''];
    };
  
    return { getBoard, updateCell, resetBoard };
  })();
  
  // Player factory
  const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    return { getName, getSymbol };
  };
  
  // Game controller module
  const GameController = (() => {
    let currentPlayer;
    let gameEnded = false;
  
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
  
    const cells = document.querySelectorAll('.cell');
  
    const startGame = () => {
      currentPlayer = player1;
      gameEnded = false;
      Gameboard.resetBoard();
      cells.forEach((cell) => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick);
      });
    };
  
    const handleClick = (e) => {
      const index = e.target.dataset.index;
      if (!gameEnded && Gameboard.updateCell(index, currentPlayer)) {
        e.target.textContent = currentPlayer.getSymbol();
        if (checkWin(currentPlayer.getSymbol())) {
          endGame(currentPlayer);
        } else if (checkTie()) {
          endGame(null); // Tie
        } else {
          currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
      }
    };
  
    const checkWin = (symbol) => {
      const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      return winningCombos.some((combo) => {
        return combo.every((index) => Gameboard.getBoard()[index] === symbol);
      });
    };
  
    const checkTie = () => {
      return Gameboard.getBoard().every((cell) => cell !== '');
    };
  
    const endGame = (winner) => {
      gameEnded = true;
      cells.forEach((cell) => {
        cell.removeEventListener('click', handleClick);
      });
      if (winner) {
       alert(`Congratulations, ${winner.getName()}! You won!`);
      } else {
        console.log("It's a tie!");
      }
    };
  
    return { startGame };
  })();
  
  // Start the game
  GameController.startGame();
  
  
  const startButton = document.getElementById('start-button');
  const restartButton = document.getElementById('restart-button');
  
  startButton.addEventListener('click', GameController.startGame);
  restartButton.addEventListener('click', GameController.startGame);
  
  // ...
  