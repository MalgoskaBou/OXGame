let player1 = 'X';
let player2 = 'O';
let currentTurn = 1;
const square = document.querySelectorAll('.item')
// change turn
square.addEventListener('click', changeTurn);
function changeTurn (e){
    if (currentTurn === 1){
        event.target.innerHTML = player1;
        currentTurn++;
    }else{
        event.target.innerHTML = player2;
        currentTurn--;
    }
}