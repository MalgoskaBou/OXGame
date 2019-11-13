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

        // Locks game board fields after the end of game.
        const lockBoard = function () {
            boardFields.forEach(field => field.removeEventListener("click", pickField));
        };

        // ==================== game-start

        //Sets avatar for the first player.
        const pickAvatar1 = function (e) {
            const img1 = document.getElementById('avatars1').getElementsByClassName('avatar-1');
            const img2 = document.getElementById('avatars1').getElementsByClassName('avatar-2');
            const img3 = document.getElementById('avatars1').getElementsByClassName('avatar-3');

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
            const img1 = document.getElementById('avatars2').getElementsByClassName('avatar-4');
            const img2 = document.getElementById('avatars2').getElementsByClassName('avatar-5');
            const img3 = document.getElementById('avatars2').getElementsByClassName('avatar-6');

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

        // If field is available adds right figure on board field depending on the current turn.
        const pickField = function (e) {
            if (validField(e.target)) {
                e.target.classList.add(Boolean(currentTurn) ? "icon-x" : "icon-o");
                changeTurn();
                winOrDraw();
            }
        };


        // ==================== EVENT LISTENERS

        avatars1.forEach(avatar => avatar.addEventListener('click', pickAvatar1));
        avatars2.forEach(avatar => avatar.addEventListener('click', pickAvatar2));
        play.addEventListener("click", run);
        boardFields.forEach(field => field.addEventListener("click", pickField));

    } // <-- end of init function
} // <-- end of web object