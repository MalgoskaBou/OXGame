const web = {
  init: function () {
    // Get appropriate board fields from HTML, variable holds a NodeList!
    const boardFields = document.querySelectorAll(".item");

    // Function checks if board field given as an argument is valid. Returns true if field is avaliable.
    const validField = function (field) {
      if (
        !field.classList.contains("icon-x") &&
        !field.classList.contains("icon-o")
      )
        return true;
      showAlert(`This field is already taken. Choose another one.`);
      return false;
    };


    // Function shows a message given as an argument
    const showAlert = function (message) {
      // Create new html <div> element
      const alertBox = document.createElement("div");
      // Add css class
      alertBox.className = "alert";
      // Add css rules
      alertBox.style.position = "fixed";
      alertBox.style.margin = "0";
      alertBox.style.padding = "0";
      alertBox.style.background = "rgba(181, 234, 211, 0.8)";
      alertBox.style.color = "rgb(35, 38, 55)";
      alertBox.style.fontSize = "1.8rem";
      alertBox.style.lineHeight = "1.5";
      alertBox.style.fontFamily = '"Roboto", sans-serif';
      alertBox.style.textAlign = "center";
      if (window.innerWidth < 600) {
        alertBox.style.width = "100vw";
        alertBox.style.height = "100vh";
        alertBox.style.top = "0";
        alertBox.style.left = "0";
      } else {
        alertBox.style.top = "50%";
        alertBox.style.left = "50%";
        alertBox.style.transform = "translate(-50%, -50%)";
        alertBox.style.width = "400px";
        alertBox.style.height = "400px";
      }
      //  flexbox rules
      alertBox.style.display = "flex";
      alertBox.style.justifyItems = "center";
      alertBox.style.alignItems = "center";
      // Add content
      alertBox.innerHTML = `<p>${message}</p>`;
      // Add new element to body
      document.body.appendChild(alertBox);

      // Add function
      alertBox.onclick = function () {
        document.body.removeChild(alertBox);
      };
    };


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


    // If field is available function adds the right figure on a board field depending on the current turn
    const pickField = function (e) {
      if (validField(e.target)) {
        e.target.classList.add(Boolean(currentTurn) ? "icon-o" : "icon-x");
        //============== Ievgeniia
        let indexBox = e.target.classList.item(1);
        let indexPlyerBox = e.target.classList.item(2);
        clickInformation(indexBox, indexPlyerBox);
        const result = checkBoard();
        if (result == "x winner") {
          setTimeout(showWinnerX, 2000);
        } else if (result == "o winner") {
          setTimeout(showWinnerO, 2000);
        } else {
          if (!emptyCellDetected()) {
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
    function checkBoard(resultBoard) {
      // Check rows
      for (var i = 0; i < 3; i++) {
        var result = findWinner(checkHorizontal(i));
        if (result === x) {
          return "x winner";
        } else if (result === o) {
          return "o winner";
        }
        //Check columns
        result = findWinner(checkVertical(i));
        if (result === x) {
          return "x winner";
        } else if (result === o) {
          return "o winner";
        }
      }

      //Check diagonal 1
      var diagonalOneRes = findWinner(diagonalOne());
      if (diagonalOneRes === x) {
        return "x winner";
      } else if (diagonalOneRes === o) {
        return "o winner";
      }

      //Check diagonal 2
      var diagonalTwoRes = findWinner(diagonalTwo());
      if (diagonalTwoRes === x) {
        return "x winner";
      } else if (diagonalOneRes === o) {
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
    //.........................................

    // written to test if everything is working as expected
    let currentTurn = Math.floor(Math.random() * 2);

    currentTurn = currentTurn ? --currentTurn : ++currentTurn;
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

    let p1inp = document.getElementById("player1Name");
    let p2inp = document.getElementById("player2Name");
    let play = document.getElementById("play");
    let turn = document.getElementById("turn");
    let p1 = document.getElementsByClassName("player-1-name")[0];
    let p2 = document.getElementsByClassName("player-2-name")[0];
    let run = function () {
      p1.innerText = p1inp.value;
      p2.innerText = p2inp.value;
      let tab = [p1.innerText, p2.innerText];
      let who = tab[Math.floor(Math.random() * 2)];
      turn.innerText = who;
      window.scrollTo(0, window.innerHeight);
    };
    play.addEventListener("click", run);

    //============================ IWONA / Ievgeniia 

    //Pick avatar
    const avatar1 = document.querySelectorAll('#avatars1')
    const avatar2 = document.querySelectorAll('#avatars2');
    avatar1.forEach(avatar => avatar.addEventListener('click', pickAvatars1));
    avatar2.forEach(avatar => avatar.addEventListener('click', pickAvatars2));
  } // <-- end of init function
}; // <-- end of web obj.

//Add user avatar
function pickAvatars1(e) {

  let img1 = document.getElementById('avatars1').getElementsByClassName('avatar-1');
  let img2 = document.getElementById('avatars1').getElementsByClassName('avatar-2');
  let img3 = document.getElementById('avatars1').getElementsByClassName('avatar-3');

  let userImg = document.getElementById('avatarOne');
  let lastClass = userImg.classList.item(2);
  userImg.classList.remove(lastClass);
  userImg.classList.add(e.target.classList.item(1));

  let playerImg1 = document.getElementById('playerOne');
  playerImg1.classList.remove(lastClass);
  playerImg1.classList.add(e.target.classList.item(1));
}

function pickAvatars2(e) {
  let img4 = document.getElementById('avatars2').getElementsByClassName('avatar-4');
  let img5 = document.getElementById('avatars2').getElementsByClassName('avatar-5');
  let img6 = document.getElementById('avatars2').getElementsByClassName('avatar-6');

  let userImg = document.getElementById('avatarTwo');
  let lastClass = userImg.classList.item(2);
  userImg.classList.remove(lastClass);
  userImg.classList.add(e.target.classList.item(1));

  let playerImg2 = document.getElementById('playerTwo');
  playerImg2.classList.remove(lastClass);
  playerImg2.classList.add(e.target.classList.item(1));
}
//............................
//============================ Ievgeniia 
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
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>