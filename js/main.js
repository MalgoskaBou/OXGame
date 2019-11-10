// Get appropriate board fields from HTML, variable holds a NodeList!
const boardFields = document.querySelectorAll('.item');

// Function checks if given names are valid. If both are, it returns true. If at least one is't, it returns false.
const validNames = function (name1, name2) {
    if (name1.length >= 3 && name1.length <= 10) {
        if (name2.length >= 3 && name2.length <= 10) return true;
        showAlert(`Second player's name is incorrect. Enter name between 3 and 10 letters long.`);
        return false;
    }
    showAlert(`First player's name is incorrect. Enter name between 3 and 10 letters long.`);
    return false;
}

// Function checks if board field given as an argument is valid. Returns true if field is avaliable.
const validField = function (field) {
    if (!field.classList.contains('icon-x') && !field.classList.contains('icon-o')) return true;
    showAlert(`This field is already taken. Choose another one.`);
    return false;
}

// Function shows a message given as an argument
const showAlert = function (message) {
    alert(message)
}

// If field is available function adds the right figure on a board field depending on the current turn
const pickField = function (e) {
    if (validField(e.target)) {
        e.target.classList.add(Boolean(currentTurn) ? 'icon-o' : 'icon-x');
        changeTurn();
    }
}


// written to test if everything is working as expected 
let currentTurn = Math.floor(Math.random() * 2);
const changeTurn = function () {
    currentTurn = currentTurn ? --currentTurn : ++currentTurn;
}

// Add listening on every board field
boardFields.forEach(field => field.addEventListener('click', pickField));