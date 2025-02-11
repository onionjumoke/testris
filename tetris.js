// Basic Game Setup
const boardWidth = 10;
const boardHeight = 20;
let board = Array(boardHeight).fill().map(() => Array(boardWidth).fill(0));

let currentPiece = null;
let gameInterval = null;
let gamePaused = false;

const gameBoard = document.getElementById('game-board');
const moveLeftButton = document.getElementById('move-left');
const moveRightButton = document.getElementById('move-right');
const rotateButton = document.getElementById('rotate');
const moveDownButton = document.getElementById('move-down');
const pauseButton = document.getElementById('pause');

// Function to generate a new piece
function newPiece() {
    const pieces = [
        [[1, 1, 1, 1]], // I piece
        [[1, 1], [1, 1]], // O piece
        [[1, 1, 0], [0, 1, 1]], // S piece
        [[0, 1, 1], [1, 1, 0]], // Z piece
        [[1, 1, 1], [0, 1, 0]], // T piece
        [[1, 1, 0], [1, 0, 0]], // L piece
        [[0, 1, 1], [0, 0, 1]]  // J piece
    ];
    const piece = pieces[Math.floor(Math.random() * pieces.length)];
    return { shape: piece, x: 3, y: 0 }; // Start at the top of the board
}

// Render the game board
function renderBoard() {
    gameBoard.innerHTML = '';
    for (let y = 0; y < boardHeight; y++) {
        for (let x = 0; x < boardWidth; x++) {
            const block = document.createElement('div');
            block.classList.add('block');
            if (board[y][x] === 1) {
                block.style.backgroundColor = 'cyan'; // Just for I-piece, can be expanded
            }
            gameBoard.appendChild(block);
        }
    }
}

// Move current piece
function movePiece(dx, dy) {
    const piece = currentPiece.shape;
    const newX = currentPiece.x + dx;
    const newY = currentPiece.y + dy;

    if (isValidMove(piece, newX, newY)) {
        currentPiece.x = newX;
        currentPiece.y = newY;
        renderBoard();
    }
}

// Check if the move is valid
function isValidMove(piece, newX, newY) {
    for (let y = 0; y < piece.length; y++) {
        for (let x = 0; x < piece[y].length; x++) {
            if (piece[y][x] && (board[newY + y] && board[newY + y][newX + x]) !== 0) {
                return false;
            }
        }
    }
    return true;
}

// Start the game
function startGame() {
    board = Array(boardHeight).fill().map(() => Array(boardWidth).fill(0));
    currentPiece = newPiece();
    gameInterval = setInterval(() => {
        if (!gamePaused) {
            movePiece(0, 1);
        }
    }, 1000);
}

// Pause or resume the game
function togglePause() {
    gamePaused = !gamePaused;
    pauseButton.textContent = gamePaused ? 'Resume' : 'Pause';
}

// Button actions
moveLeftButton.addEventListener('click', () => movePiece(-1, 0));
moveRightButton.addEventListener('click', () => movePiece(1, 0));
rotateButton.addEventListener('click', () => {});  // Rotation logic can be added
moveDownButton.addEventListener('click', () => movePiece(0, 1));
pauseButton.addEventListener('click', togglePause);

startGame();
