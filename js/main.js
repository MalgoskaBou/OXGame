const web = {
  init: function () {
    /*
    //=======================WIN-OR-DRAW
    const winOrDraw = function () {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ]
      // Both arrays holds indexes of board fields on which players clicked.
      const xMoves = [];
      const oMoves = [];
      // Search through boardField. If we find field with X-sign or O-sign we take it's index and push it to array with player moves.
      boardFields.forEach((field, index) => {
        if (field.classList.contains('icon-x')) {
          xMoves.push(index);
        } else if (field.classList.contains('icon-o')) {
          oMoves.push(index);
        }
      });
      // Check if any array with players moves holds any winning combination.
      winningCombinations.forEach(combination => {
        if (combination.every(index => xMoves.includes(index))) {
          lockBoard();
          alert('Player X wins!');
        } else if (combination.every(index => oMoves.includes(index))) {
          lockBoard();
          alert('Player O wins!');
        }
      })
      // Check if all fields are taken. If so, it"s a draw.
      if (xMoves.length + oMoves.length == boardFields.length) {
        lockBoard();
        alert('It\'s a draw!');
      }
    }
    */

    //======================= DARIA
    // VARIABLES
    const boardFields = document.querySelectorAll(".item");
    let currentTurn = Math.floor(Math.random() * 2);

    // FUNCTIONS

    // Returns true if board field given as an argument is valid.
    const validField = function (field) {
      return (!field.classList.contains("icon-x") && !field.classList.contains("icon-o"))
    };

    // If field is available function adds the right figure on a board field depending on the current turn.
    const pickField = function (e) {
      if (validField(e.target)) {
        e.target.classList.add(Boolean(currentTurn) ? "icon-o" : "icon-x");
        // winOrDraw();
        changeTurn();
      }
    };

    // Returns true if player name is valid.
    const validName = function (name) {
      return (name && name.length >= 3 && name.length <= 10);
    };

    // Shows alert under invalid player's name.
    const showNameAlert = function (nameInput) {
      let playerBox = nameInput.parentNode.parentNode;
      if (playerBox.querySelector('.alert')) return;

      const alertBox = document.createElement('div');
      alertBox.innerHTML = '<p>Enter valid name between 3 and 10 characters.</p>';
      alertBox.className = 'alert';
      playerBox.appendChild(alertBox);
    };

    // Removes invalid name alert.
    const clearNameAlert = function (nameInput) {
      let playerBox = nameInput.parentNode.parentNode;
      let alertBox = playerBox.querySelector('.alert');
      if (alertBox) playerBox.removeChild(alertBox);
    };

    // Locks game board fields after win or draw.
    const lockBoard = function () {
      boardFields.forEach(field => field.removeEventListener("click", pickField));
    };


    // EVENT LISTENERS
    // Add listening on every board field
    boardFields.forEach(field => field.addEventListener("click", pickField));

    //=======================IWONA

    //let currentTurn = 0;
    let name1 = document.getElementById("player1").value;
    let name2 = document.getElementById("player2").value;

    //turn change, puts the name of the player to play
    function changeTurn(e) {
      if (currentTurn === 0) {
        currentTurn++;
        putMessage(`It's ${name2}'s turn.`);
      } else {
        currentTurn--;
        putMessage(`It's ${name1}'s turn.`);
      }
    }

    function putMessage(msg) {
      document.getElementById("turn").innerHTML = msg;
    }

    //=======================PIOTREK

    const p1inp = document.getElementById("player1Name");
    const p2inp = document.getElementById("player2Name");
    const play = document.getElementById("play");
    const turn = document.getElementById("turn");
    const p1 = document.getElementsByClassName("player-1-name")[0];
    const p2 = document.getElementsByClassName("player-2-name")[0];
    const run = function () {
      if (!validName(p1inp.value)) {
        showNameAlert(p1inp);
        return;
      };
      clearNameAlert(p1inp);

      if (!validName(p2inp.value)) {
        showNameAlert(p2inp);
        return;
      };
      clearNameAlert(p2inp);

      p1.innerText = p1inp.value;
      p2.innerText = p2inp.value;
      let tab = [p1.innerText, p2.innerText];
      let who = tab[Math.floor(Math.random() * 2)];
      turn.innerText = who;
      window.scrollTo(0, window.innerHeight);
    };

    play.addEventListener("click", run);

    //=======================IWONA & ŻENIA
    //pick avatar
    const avatar1 = document.querySelectorAll('#avatars1');
    const avatar2 = document.querySelectorAll('#avatars2');
    avatar1.forEach(avatar => avatar.addEventListener('click', pickAvatar1));
    avatar2.forEach(avatar => avatar.addEventListener('click', pickAvatar2));

    function pickAvatar1(e) {
      let img1 = document.getElementById('avatars1').getElementsByClassName('avatar-1');
      let img2 = document.getElementById('avatars1').getElementsByClassName('avatar-2');
      let img3 = document.getElementById('avatars1').getElementsByClassName('avatar-3');

      let userImg = document.getElementById('player-1-avatar');
      let lastClass = userImg.classList.item(2);
      userImg.classList.remove(lastClass);
      userImg.classList.add(e.target.classList.item(1));

      let playerImg1 = document.getElementById('playerOne');
      playerImg1.classList.remove(lastClass);
      playerImg1.classList.add(e.target.classList.item(1));
    }

    function pickAvatar2(e) {
      let img1 = document.getElementById('avatars2').getElementsByClassName('avatar-4');
      let img2 = document.getElementById('avatars2').getElementsByClassName('avatar-5');
      let img3 = document.getElementById('avatars2').getElementsByClassName('avatar-6');

      let userImg = document.getElementById('player-2-avatar');
      let lastClass = userImg.classList.item(2);
      userImg.classList.remove(lastClass);
      userImg.classList.add(e.target.classList.item(1));

      let playerImg2 = document.getElementById('playerTwo');
      playerImg2.classList.remove(lastClass);
      playerImg2.classList.add(e.target.classList.item(1));
    };
  } // <-- end of init function
}; // <-- end of web obj.