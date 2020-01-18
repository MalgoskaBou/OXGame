const web = {
	init: function() {
		const startScreen = document.getElementById('startScreen');
		const boardScreen = document.getElementById('gameBoard');
		const boardContainer = document.getElementById('gameGrid');
		const board = document.querySelector('.grid-container');
		const boardFields = document.querySelectorAll('.item');
		const avatars1 = document.querySelectorAll('#avatars1');
		const avatars2 = document.querySelectorAll('#avatars2');
		const player1OnBoard = document.querySelector('.player1-container');
		const player2OnBoard = document.querySelector('.player2-container');
		const scoreOnBoard = document.querySelector('.score-turn');

		const soundPlayer1 = document.querySelector('audio.whoomp');
		const soundPlayer2 = document.querySelector('audio.wheemp');
		const soundEnd = document.querySelector('audio.tada');

		const p1inp = document.getElementById('player1Name');
		const p2inp = document.getElementById('player2Name');

		const play = document.getElementById('play');
		const newGameBtn = document.getElementById('newGame');
		const restartGameBtn = document.getElementById('restartGame');

		const turn = document.getElementById('turn');
		const name1 = document.querySelector('.player-1-name');
		const name2 = document.querySelector('.player-2-name');
		const player1scoreTxt = document.getElementById('player-1-score');
		const player2scoreTxt = document.getElementById('player-2-score');

		let currentTurn;
		let player1score = 0;
		let player2score = 0;


		const validName = function(name) {
			return name && name.length >= 3 && name.length <= 10;
		};


		const showNameAlert = function(nameInput) {
			const playerBox = nameInput.parentNode.parentNode;
			if (playerBox.querySelector('.alert')) return;

			const alertBox = document.createElement('div');
			alertBox.innerHTML = '<p>Enter valid name between 3 and 10 characters.</p>';
			alertBox.className = 'alert';
			playerBox.appendChild(alertBox);
		};


		const clearNameAlert = function(nameInput) {
			const playerBox = nameInput.parentNode.parentNode;
			const alertBox = playerBox.querySelector('.alert');
			if (alertBox) playerBox.removeChild(alertBox);
		};


		const validField = function(field) {
			return (
				!field.classList.contains('icon-x') &&
				!field.classList.contains('icon-o')
			);
		};


		const lockBoard = function() {
			boardFields.forEach(field => field.removeEventListener('click', pickField));
			boardFields.forEach(field => field.classList.remove('unlocked'));
		};


		const restartBoard = function() {
			board.style.display = 'grid';
			boardFields.forEach(field => {
				field.classList.remove('icon-o');
				field.classList.remove('icon-x');
			});
		}


		const unlockBoard = function() {
			boardFields.forEach(field => field.addEventListener('click', pickField));
			boardFields.forEach(field => field.classList.add('unlocked'));
		};


		const switchToBoard = function() {
			startScreen.style.display = 'none';
			boardScreen.style.display = 'flex';
		};


		const drawTurn = function() {
			currentTurn = Boolean(Math.floor(Math.random() * 2));
			turn.innerHTML = `${currentTurn ? p2inp.value : p1inp.value}'s turn.`;
		};


		const changeTurn = function() {
			currentTurn = !currentTurn;
			turn.innerHTML = `${currentTurn ? p2inp.value : p1inp.value}'s turn.`;
		};

		// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
		const pickAvatar1 = function(e) {
			const userImg = document.getElementById('player-1-avatar');
			const lastClass = userImg.classList.item(2);
			userImg.classList.remove(lastClass);
			userImg.classList.add(e.target.classList.item(1));

			const playerImg1 = document.getElementById('playerOne');
			playerImg1.classList.remove(lastClass);
			playerImg1.classList.add(e.target.classList.item(1));
		};

		//Sets avatar for second player.
		const pickAvatar2 = function(e) {
			const userImg = document.getElementById('player-2-avatar');
			const lastClass = userImg.classList.item(2);
			userImg.classList.remove(lastClass);
			userImg.classList.add(e.target.classList.item(1));

			const playerImg2 = document.getElementById('playerTwo');
			playerImg2.classList.remove(lastClass);
			playerImg2.classList.add(e.target.classList.item(1));
		};
		// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

		const run = function() {
			if (!validName(p1inp.value)) {
				showNameAlert(p1inp);
				return;
			}
			clearNameAlert(p1inp);

			if (!validName(p2inp.value)) {
				showNameAlert(p2inp);
				return;
			}
			clearNameAlert(p2inp);

			name1.innerText = p1inp.value;
			name2.innerText = p2inp.value;
			drawTurn();
			player1scoreTxt.innerText = player1score;
			player2scoreTxt.innerText = player2score;
			switchToBoard();
			unlockBoard();
		};


		const drawLine = function(combination) {
			const combClass = `combination-${combination}`;
			const line = document.createElement('div');
			line.classList.add('winning-line');
			line.classList.add(combClass);
			boardContainer.appendChild(line);

			setTimeout(() => {
				boardContainer.removeChild(line);
			}, 2000);
        };
        

        const winOrDraw = function() {
			const winningCombinations = [[0, 1, 2],	[3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8],  [2, 4, 6]];
			const xMoves = [];
			const oMoves = [];
			let result = null;

			boardFields.forEach((field, index) => {
				if (field.classList.contains('icon-x')) {
					xMoves.push(index);
				} else if (field.classList.contains('icon-o')) {
					oMoves.push(index);
                }
			});

			winningCombinations.map(combination => {
				if (combination.every(index => 
					xMoves.includes(index))) {
						result = ['win-X', combination.join('')];
				} else if (combination.every(index => 
					oMoves.includes(index))) {
						result = ['win-O', combination.join('')];
				}
			});
			if (xMoves.length + oMoves.length == boardFields.length) {
				result = 'draw';
			}
			return result;
        };

        
		function showWinner(winner) {
			board.style.display = 'none';
			scoreOnBoard.style.display = 'none';
			winner === 'win-X' ? player2OnBoard.style.display = 'none' : player1OnBoard.style.display = 'none';

			const winnerScreen = document.createElement('div');
			winnerScreen.className = 'winnerScreen';
			winnerScreen.innerHTML = 'Winner!';
			boardContainer.insertBefore(winnerScreen, boardContainer.firstChild);
		}


		function showDraw() {
			board.style.display = 'none';
			const drawScreen = document.createElement('div');
			drawScreen.className = 'winnerScreen';
			drawScreen.innerHTML = 'Draw!';
			boardContainer.insertBefore(drawScreen, boardContainer.firstChild);
		}


		const newGame = function() {
			window.location.reload(true);
		};

		
		const restartGame = function() {
			player1OnBoard.style.display = 'grid';
			player2OnBoard.style.display = 'grid';
			scoreOnBoard.style.display = 'flex';
			const winAlert = document.querySelector('.winnerScreen');
			if (winAlert) winAlert.remove();
			const drawAlert = document.querySelector('.drawScreen');
			if (drawAlert) drawAlert.remove();
			drawTurn();
			restartBoard();
			unlockBoard();
        };
        

		const pickField = function(e) {
            if (!validField(e.target)) return;
            currentTurn ? soundPlayer2.play() : soundPlayer1.play();
			soundPlayer1.currentTime = 0;
			soundPlayer2.currentTime = 0;
			e.target.classList.add(currentTurn ? 'icon-o' : 'icon-x');
			e.target.classList.remove('unlocked');

			const result = winOrDraw();
            if (Array.isArray(result)) {
				lockBoard();
				drawLine(result[1]);
				soundEnd.play();
				result[0]==='win-X' ? player1score++ : player2score++;
				player1scoreTxt.innerText = player1score;
				player2scoreTxt.innerText = player2score;
				setTimeout(() => {
					showWinner(result[0]);
				}, 2000);
            } else if  (result) {
				lockBoard();
				setTimeout(() => {
					showDraw();
				}, 1000);
            }
            changeTurn();    
		};


		avatars1.forEach(avatar => avatar.addEventListener('click', pickAvatar1));
		avatars2.forEach(avatar => avatar.addEventListener('click', pickAvatar2));
		play.addEventListener('click', run);
		newGameBtn.addEventListener('click', newGame);
		restartGameBtn.addEventListener('click', restartGame);
	}, 
};