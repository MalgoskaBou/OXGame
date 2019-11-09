// informs which player's turn it is; 
// 0 -> player 1 (X)
// 1 -> player 2 (O)
let currentTurn = Math.floor(Math.random() * 2);

// Get appropriate board fields from HTML, 
// variable boardFields holds a NodeList!
const boardFields = document.querySelectorAll('.item');

// Function adding the right figure in the right box depending on the current turn
const pickField = function (e) {
    e.target.classList.add(Boolean(currentTurn) ? '.icon-0' : '.icon-x');
}

// Add listening on every board field
boardFields.forEach(field => field.addEventListener('click', pickField));