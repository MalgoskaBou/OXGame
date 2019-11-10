const web = {
  init: function() {
    // Get appropriate board fields from HTML, variable holds a NodeList!
    const boardFields = document.querySelectorAll(".item");

    // Function checks if board field given as an argument is valid. Returns true if field is avaliable.
    const validField = function(field) {
      if (
        !field.classList.contains("icon-x") &&
        !field.classList.contains("icon-o")
      )
        return true;
      showAlert(`This field is already taken. Choose another one.`);
      return false;
    };

    // Function shows a message given as an argument
    const showAlert = function(message) {
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
      alertBox.onclick = function() {
        document.body.removeChild(alertBox);
      };
    };

    // If field is available function adds the right figure on a board field depending on the current turn
    const pickField = function(e) {
      if (validField(e.target)) {
        e.target.classList.add(Boolean(currentTurn) ? "icon-o" : "icon-x");
        changeTurn();
      }
    };

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
    let run = function() {
      p1.innerText = p1inp.value;
      p2.innerText = p2inp.value;
      let tab = [p1.innerText, p2.innerText];
      let who = tab[Math.floor(Math.random() * 2)];
      turn.innerText = who;
      window.scrollTo(0, window.innerHeight);
    };
    play.addEventListener("click", run);
  } // <-- end of init function
}; // <-- end of web obj.
