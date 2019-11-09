// Get appropriate board fields from HTML, variable holds a NodeList!
const boardFields = document.querySelectorAll('.item');

// Function checks if board field given as an argument is already taken
const takenField = function (field) {
    return field.classList.contains('icon-x') || field.classList.contains('icon-o');
}

// Function shows a message if just clicked board field is already taken
const takenFieldAlert = function () {
    alert('This field is already taken. Choose another one.')
}

// If field is available function adds the right figure on a board field depending on the current turn
const pickField = function (e) {
    if (!takenField(e.target)) {
        e.target.classList.add(Boolean(currentTurn) ? 'icon-o' : 'icon-x');
        changeTurn();
    } else takenFieldAlert()
}


// written just to test if everything is working as expected ;)
let currentTurn = Math.floor(Math.random() * 2);
const changeTurn = function () {
    currentTurn = currentTurn ? --currentTurn : ++currentTurn;
}

// Add listening on every board field
boardFields.forEach(field => field.addEventListener('click', pickField));