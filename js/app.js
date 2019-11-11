// Create a const variables
const x = "x";
const o = "o";
const empty = "-";

// Game board
var arrBoard = [
    [x, empty, o],
    [o, o, empty],
    [x, x, x]
];

// Find the value in the cell
function valueCell(x, y) {
    return arrBoard[y][x];
}

//Show results on consol
function startGame() {
    console.log(checkBoard());
}

//Find horizontal array value
function checkHorizontal(y) {
    var resultHorizontal = [];
    for (var x = 0; x < 3; x++) {
        resultHorizontal.push(valueCell(x, y));
    }
    return resultHorizontal;
}

//Find vertical array value
function checkVertical(x) {
    var resultVertical = [];
    for (var y = 0; y < 3; y++) {
        resultVertical.push(valueCell(x, y));
    }
    return resultVertical;
}

//Find diagonal 1 array value
function diagonalOne() {
    var resultDiagonalOne = [];
    for (var i = 0; i < 3; i++) {
        resultDiagonalOne.push(valueCell(i, i));
    }
    return resultDiagonalOne;
}

//Find diagonal 2 array value
function diagonalTwo() {
    var resultDiagonalTwo = [];
    var x = 2;
    var y = 0;
    for (y = 0; y < 3; y++) {
        resultDiagonalTwo.push(valueCell(x, y));
        x -= 1;
    }
    return diagonalTwo;
}

//Find matching values
function findWinner(results) {
    counterX = 0;
    counterO = 0;
    for (i = 0; i < results.length; i++) {
        if (results[i] === x) {
            counterX += 1;
        }
        if (results[i] === o) {
            counterO += 1;
        }
    }

    if (counterX === 3) {
        return x;
    }
    if (counterO === 3) {
        return o;
    }
    return empty;
}

// Check all board and find the winner or draw
function checkBoard(resultBoard) {
    // Check rows
    for (var i = 0; i < 3; i++) {
        var result = findWinner(checkHorizontal(i));
        if (result == x) {
            return "x winner";
        } else if (result == o) {
            return "o winner";
        }
        //Check columns
        result = findWinner(checkVertical(i));
        if (result == x) {
            return "x winner";
        } else if (result == o) {
            return "o winner";
        }
    }

    //Check diagonal 1
    var diagonalOneRes = findWinner(diagonalOne());
    if (diagonalOneRes == x) {
        return "x winner";
    } else if (firstLineRes == o) {
        return "o winner";
    }

    //Check diagonal 2
    var diagonalTwoRes = findWinner(diagonalTwo());
    if (diagonalTwoRes == x) {
        return "x winner";
    } else if (firstLineRes == o) {
        return "o winner";
    }
    return empty;
}