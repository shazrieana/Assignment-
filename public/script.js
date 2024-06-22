const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.getAttribute('data-index');
    if (!gameState[index]) {
      gameState[index] = currentPlayer;
      cell.textContent = currentPlayer;
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      checkWinner();
    }
  });
});

restartButton.addEventListener('click', () => {
  gameState = Array(9).fill(null);
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
});

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  winningCombinations.forEach(combination => {
    const [a, b, c] = combination;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      alert(`${gameState[a]} is the winner!`);
      gameState = Array(9).fill(null);
      cells.forEach(cell => cell.textContent = '');
    }
  });
}
