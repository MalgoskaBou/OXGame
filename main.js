
let currentTurn = 0;
let name1 = document.getElementById("player1").value;
let name2 = document.getElementById("player2").value;

//turn change, puts the name of the player to play

boardFields.addEventListener('click', changeTurn);

function changeTurn (e){
    if (currentTurn === 0){
        currentTurn++;
        putMessage(`It's ${name2}'s turn.`);
    }else{
        currentTurn--;
        putMessage(`It's ${name1}'s turn.`);
    }
};

function putMessage(msg){
    document.getElementById('turn').innerHTML = msg;
};
