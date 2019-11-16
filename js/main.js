const web = {
  init: function () {
    // ==================== VARIABLES 
    const boardFields = document.querySelectorAll(".item");
    const avatars1 = document.querySelectorAll('#avatars1');
    const avatars2 = document.querySelectorAll('#avatars2');
    // ==================== inputs
    const p1inp = document.getElementById("player1Name");
    const p2inp = document.getElementById("player2Name");
    // ==================== buttons
    const play = document.getElementById("play");
    // ==================== text elements
    const turn = document.getElementById("turn");
    const name1 = document.querySelector(".player-1-name");
    const name2 = document.querySelector(".player-2-name");
    // ====================
    let currentTurn;
    const winCombinations = [
      ['012', '345', '678'],
      ['036', '147', '258'],
      ['048', '246']
    ];
    let winCombination;


    // ==================== FUNCTIONS 
    // ==================== validation

    // Returns true if player name is valid.
    const validName = function (name) {
      return (name && name.length >= 3 && name.length <= 10);
    };

    // Shows alert under invalid player's name.
    const showNameAlert = function (nameInput) {
      const playerBox = nameInput.parentNode.parentNode;
      if (playerBox.querySelector('.alert')) return;

      const alertBox = document.createElement('div');
      alertBox.innerHTML = '<p>Enter valid name between 3 and 10 characters.</p>';
      alertBox.className = 'alert';
      playerBox.appendChild(alertBox);
    };

    // Removes invalid name alert.
    const clearNameAlert = function (nameInput) {
      const playerBox = nameInput.parentNode.parentNode;
      const alertBox = playerBox.querySelector('.alert');
      if (alertBox) playerBox.removeChild(alertBox);
    };

    // Returns true if board field given as an argument is valid.
    const validField = function (field) {
      return (!field.classList.contains("icon-x") && !field.classList.contains("icon-o"))
    };

    // Locks game board fields after the end of the game.
    const lockBoard = function () {
      boardFields.forEach(field => field.removeEventListener("click", pickField));
    };

    // ==================== game-start

    //Sets avatar for the first player.
    const pickAvatar1 = function (e) {
      const userImg = document.getElementById('player-1-avatar');
      const lastClass = userImg.classList.item(2);
      userImg.classList.remove(lastClass);
      userImg.classList.add(e.target.classList.item(1));

      const playerImg1 = document.getElementById('playerOne');
      playerImg1.classList.remove(lastClass);
      playerImg1.classList.add(e.target.classList.item(1));
    }

    //Sets avatar for second player.
    const pickAvatar2 = function (e) {
      const userImg = document.getElementById('player-2-avatar');
      const lastClass = userImg.classList.item(2);
      userImg.classList.remove(lastClass);
      userImg.classList.add(e.target.classList.item(1));

      const playerImg2 = document.getElementById('playerTwo');
      playerImg2.classList.remove(lastClass);
      playerImg2.classList.add(e.target.classList.item(1));
    };


    // Sets players names, draws the first turn, navigates to the game board.
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

      name1.innerText = p1inp.value;
      name2.innerText = p2inp.value;

      currentTurn = Math.floor(Math.random() * 2);
      turn.innerHTML = `It's ${currentTurn?p2inp.value:p1inp.value}'s turn.`;

      window.scrollTo(0, window.innerHeight);
    };


    // ==================== game-course

    //Changes the turn and displays name of the player to play.
    const changeTurn = function (e) {
      if (currentTurn) {
        currentTurn--;
        turn.innerHTML = `It's ${p1inp.value}'s turn.`;
      } else {
        currentTurn++;
        turn.innerHTML = `It's ${p2inp.value}'s turn.`;
      }
    }

    //Draws line on the game board and shows winning combination.
    const drawLine = function (combination) {
      const combClass = `combination-${combination}`;
      const gameBoard = document.getElementById('gameGrid');
      const line = document.createElement('div');
      line.classList.add('winning-line');
      line.classList.add(combClass);
      gameBoard.appendChild(line);

      setTimeout(() => {
        gameBoard.removeChild(line);
      }, 1800)
    }

    //====================== Ievgeniia
    //Add symbols on board 
    const x = "x";
    const o = "o";
    const empty = null;

    // Create Game board array
    const arrBoard = [
      [empty, empty, empty],
      [empty, empty, empty],
      [empty, empty, empty]
    ];
    //.................................

    // If field is available adds right figure on a board field depending on the current turn.
    const pickField = function (e) {
      if (validField(e.target)) {
        e.target.classList.add(currentTurn ? "icon-o" : "icon-x");
        //============== Ievgeniia
        let indexBox = e.target.classList.item(1);
        let indexPlyerBox = e.target.classList.item(2);
        clickInformation(indexBox, indexPlyerBox);
        const result = checkBoard();
        if (result == "x winner") {
          lockBoard();
          setTimeout(drawLine(winCombination), 200);
          setTimeout(showWinnerX, 2000);
        } else if (result == "o winner") {
          lockBoard();
          setTimeout(drawLine(winCombination), 200);
          setTimeout(showWinnerO, 2000);
        } else {
          if (!emptyCellDetected()) {
            lockBoard();
            setTimeout(showDraw, 2000);
          }
        }
        //...........................
        changeTurn();
      }
    };

    //============== Ievgeniia
    function clickInformation(indexBox, indexPlyerBox) {
      let boardSymbol = empty;
      if (indexPlyerBox === 'icon-x') {
        boardSymbol = x;
      } else {
        boardSymbol = o;
      }

      switch (indexBox) {
        case 'item-11':
          arrBoard[0][0] = boardSymbol;
          break;
        case 'item-12':
          arrBoard[0][1] = boardSymbol;
          break;
        case 'item-13':
          arrBoard[0][2] = boardSymbol;
          break;
        case 'item-21':
          arrBoard[1][0] = boardSymbol;
          break;
        case 'item-22':
          arrBoard[1][1] = boardSymbol;
          break;
        case 'item-23':
          arrBoard[1][2] = boardSymbol;
          break;
        case 'item-31':
          arrBoard[2][0] = boardSymbol;
          break;
        case 'item-32':
          arrBoard[2][1] = boardSymbol;
          break;
        case 'item-33':
          arrBoard[2][2] = boardSymbol;
          break;
      }
    }

    // Find the value in the cell
    function valueCell(x, y) {
      return arrBoard[y][x];
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
      return resultDiagonalTwo;
    }

    //Find matching values
    function findWinner(results) {
      let counterX = 0;
      let counterO = 0;
      for (i = 0; i < results.length; i++) {
        if (results[i] === x) {
          counterX++;
        }
        if (results[i] === o) {
          counterO++;
        }
      }

      if (counterX == 3) {
        return x;
      }
      if (counterO == 3) {
        return o;
      }
      return empty;
    }

    // Check all board and find the winner or draw
    function checkBoard() {
      // Check rows
      for (var i = 0; i < 3; i++) {
        var result = findWinner(checkHorizontal(i));
        if (result === x) {
          winCombination = winCombinations[0][i];
          return "x winner";
        } else if (result === o) {
          winCombination = winCombinations[0][i];
          return "o winner";
        }
        //Check columns
        result = findWinner(checkVertical(i));
        if (result === x) {
          winCombination = winCombinations[1][i];
          return "x winner";
        } else if (result === o) {
          winCombination = winCombinations[1][i];
          return "o winner";
        }
      }

      //Check diagonal 1
      var diagonalOneRes = findWinner(diagonalOne());
      if (diagonalOneRes === x) {
        winCombination = winCombinations[2][0];
        return "x winner";
      } else if (diagonalOneRes === o) {
        winCombination = winCombinations[2][0];
        return "o winner";
      }

      //Check diagonal 2
      var diagonalTwoRes = findWinner(diagonalTwo());
      if (diagonalTwoRes === x) {
        winCombination = winCombinations[2][1];
        return "x winner";
      } else if (diagonalTwoRes === o) {
        winCombination = winCombinations[2][1];
        return "o winner";
      }
      return empty;
    }

    //Find combination for Draw 
    function emptyCellDetected(draw) {

      function emptyFieldMatch(element) {
        return element === empty;
      }

      for (var i = 0; i < 3; i++) {
        if (arrBoard[i].findIndex(emptyFieldMatch) !== -1) {
          return true;
        }
      }
      return false;
    }

    //<<<<<<<<<<< WINNER X SCREEN >>>>>>>>>>>

    function showWinnerX(winnerX) {
      //Make game board invisible >>
      const endScreen = document.querySelector('.grid-container');
      endScreen.style.display = 'none';
      //Create a NEW element >>
      const winnerScreen = document.createElement("div");
      winnerScreen.setAttribute('id', 'winnerScreen');
      //Replace new element >> >>
      //Find Parent element >>
      var gameGrid = document.getElementById('gameGrid');
      //Get link on a child element >>
      var theFirstChildRow = gameGrid.firstChild;
      //Put a new element before child element >>
      gameGrid.insertBefore(winnerScreen, theFirstChildRow);
      //..................................................
      //Hide Player2 and score / show only winner Player1
      const hiddenPlayer2 = document.querySelector('.player2-container');
      hiddenPlayer2.style.display = 'none';
      //Hide Score
      const hiddenScore = document.querySelector('.score-turn');
      hiddenScore.style.display = 'none';
      //Add inner text to the new 'winnerScreen' element >>
      winnerScreen.innerHTML = 'Winner!'; // X
      //Add styles to the new 'winnerScreen' element >>
      winnerScreen.style.cssText = 'width: 360px; height: 360px; background: transparent; padding-top: 36px; font-size: 64px; line-height: 75px; font-weight: bold; text-transform: uppercase; color: #FD8328';
    }

    //<<<<<<<<<<< WINNER O SCREEN >>>>>>>>>>
    function showWinnerO(winnerO) {
      const endScreen = document.querySelector('.grid-container');
      endScreen.style.display = 'none';

      const winnerScreen = document.createElement("div");
      winnerScreen.setAttribute('id', 'winnerScreen');

      var gameGrid = document.getElementById('gameGrid');
      var theFirstChildRow = gameGrid.firstChild;
      gameGrid.insertBefore(winnerScreen, theFirstChildRow);
      //..................................................
      const hiddenPlayer1 = document.querySelector('.player1-container');
      hiddenPlayer1.style.display = 'none';
      const hiddenScore = document.querySelector('.score-turn');
      hiddenScore.style.display = 'none';

      winnerScreen.innerHTML = 'Winner!';
      winnerScreen.style.cssText = 'width: 360px; height: 360px; background: transparent; padding-top: 36px; font-size: 64px; line-height: 75px; font-weight: bold; text-transform: uppercase; color:#B5EAD3';
    }

    //<<<<<<<<<<<< DRAW SCREEN >>>>>>>>>>>
    function showDraw(draw) {
      const endScreen = document.querySelector('.grid-container');
      endScreen.style.display = 'none';

      const winnerScreen = document.createElement("div");
      winnerScreen.setAttribute('id', 'winnerScreen');

      var gameGrid = document.getElementById('gameGrid');
      var theFirstChildRow = gameGrid.firstChild;
      gameGrid.insertBefore(winnerScreen, theFirstChildRow);
      //..................................................
      winnerScreen.innerHTML = 'Draw!';
      winnerScreen.style.cssText = 'width: 360px; height: 360px; background: transparent; padding-top: 36px; font-size: 64px; line-height: 75px; font-weight: bold; text-transform: uppercase; color: #FBC375';
    }


    // ==================== EVENT LISTENERS

    avatars1.forEach(avatar => avatar.addEventListener('click', pickAvatar1));
    avatars2.forEach(avatar => avatar.addEventListener('click', pickAvatar2));
    play.addEventListener("click", run);
    boardFields.forEach(field => field.addEventListener("click", pickField));

  } // <-- end of init function
}; // <-- end of web obj.

    //=======================MAGDA

    // Add variables
    let newGame = document.getElementById("newGame");
    let restartGame = document.getElementById("restartGame");

    // newGame function
      let startNew = function () {
      switchToStart();
      window.location.reload(true);
    }

    newGame.addEventListener("click", startNew);

    // restartGame function 

    function restart () {
      // Hiding Draw! or Winner!
      document.getElementById("winnerScreen").remove();
      // Unhiding score
      const score = document.querySelector(".score-turn");
      score.style.display = "inline-block";
      // New board
      let board = document.getElementsByClassName("grid-container");
      board.style.display = "grid";
      // Remove "o" squares
      let square1 = document.getElementsByClassName("icon-o");
      for (let i = 0; i < square1.length; i++){
        square1[i].classList.remove("icon-o");
    }
      // Remove "x" squares
      let square2 = document.getElementsByClassName("icon-x");
      for (let i = 0; i < square2.length; i++){
        square2[i].classList.remove("icon-x");
      }
  }
    restartGame.addEventListener("click", () => {
      restart();
    });
