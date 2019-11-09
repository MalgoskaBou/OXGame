// VARIABLES
// informs which player's turn it is; takes the Boolean values
// if true it's the first player's turn, if false it's second player's turn
let turn;

// FUNCTIONS
// Function drawing a random value, true or false
const drawTurn = function () {
    return Boolean(Math.floor(Math.random() * 2));
}

// Function changing the current turn after each move
const changeTurn = function () {
    turn = !turn;
}

// Function adding the right figure in the right box depending on the current turn
const pickField = function (e) {
    e.target.innerHTML = turn ? 'O' : 'X';
}

// Get appropriate board fields from HTML and put them in a NodeList
const boardFields = document.querySelectorAll('.item');

// THE GAME
turn = drawTurn();

// LISTENING
// Add listening on every board field
boardFields.forEach(field => field.addEventListener('click', pickField));
// Add listening on every board field
boardFields.forEach(field => field.addEventListener('click', changeTurn));