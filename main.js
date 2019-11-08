let player1 = 'X';
let player2 = 'O';
let currentTurn = 1;
const square = document.querySelectorAll('.item');
let name1 = document.getElementById("player1").value;
let name2 = document.getElementById("player2").value;
// change turn

square.addEventListener('click', changeTurn);

function changeTurn (e){
    if (currentTurn === 1){
        event.target.innerHTML = player1;
        currentTurn++;
        putMessage(`It's ${name2} turn.`);
    }else{
        event.target.innerHTML = player2;
        currentTurn--;
        putMessage(`It's ${name1} turn.`);
    }
}

function putMessage(msg){
    document.getElementById('turn').innerHTML = msg;
}