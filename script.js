const players = (function(){
    const createPlayer = (name, number, turn) => {
        return {name, number, turn}
    }
    
    const render = () => {
        firstPlayerDisplay.textContent = firstPlayer.name;
        secondPlayerDisplay.textContent = secondPlayer.name;
    }
   
    const editButton = (event) => {
        let nearestDiv = event.target.nextElementSibling || event.target.previousElementSibling;
        if(nearestDiv.contentEditable === 'false'){
            nearestDiv.contentEditable = 'true';
            event.target.textContent = 'Save'
            nearestDiv.focus();
        }else{
            nearestDiv.contentEditable = 'false';
            event.target.textContent = 'Edit';
            let newName = nearestDiv.textContent;
            if (newName.length > 18){
                newName = newName.slice(0, 18) + '...';
            }
            if (event.target.id === 'player-one-button'){
                firstPlayer.name = newName;
            }else{
                secondPlayer.name = newName;
            }
            
            if (newName.length > 9){
                newName = newName.slice(0, 9);
            }
            nearestDiv.textContent = newName;
        }
    }

    const changeName = (newName, number) => {
        if (number === '1'){
            firstPlayer.name = newName;
        }else{
            secondPlayer.name = newName;
        }
    }

    const changeTurn = () => {
        if(firstPlayer.turn === true){
            firstPlayer.turn = false;
            secondPlayer.turn = true;
        }else{
            secondPlayer.turn = false;
            firstPlayer.turn = true;
        }
    }

    const checkTurn = () => {
        if(firstPlayer.turn === true){
            return '1';
        }else{
            return '2';
        }
    }

    const resetTurn = () => {
        firstPlayer.turn = true;
        secondPlayer.turn = false;
    }

    const getPlayerName = (number) => {
        if(number === '1'){
            return firstPlayer.name;
        }else{
            return secondPlayer.name;
        }
    }

    const getPlayers = () => [firstPlayer, secondPlayer];

    firstPlayer = createPlayer('Player 1', '1', true);
    secondPlayer = createPlayer('Player 2', '2', false);

    let firstPlayerDisplay = document.querySelector('#player-one');
    let secondPlayerDisplay = document.querySelector('#player-two');
    render();
    const editButtons = document.querySelectorAll('.edit-name');
    editButtons.forEach((button) => {
        button.addEventListener('click', (event) => {editButton(event)});
    })
    const playerDivs = document.querySelectorAll('.player-name');
    playerDivs.forEach((div) => {
        div.addEventListener('keydown', (event) => {
            if(div.contentEditable === 'true' && event.key === 'Enter'){
                let nearestButton = event.target.nextElementSibling || event.target.previousElementSibling;
                nearestButton.click();
                div.blur();
            }
        });
    });

    return {changeName, getPlayers, getPlayerName, changeTurn, checkTurn, resetTurn}
})();
const gameboard = (function(){

    const place = (index) => {
        if(players.checkTurn() === '1'){
            gameArray[index] = 'X';
        }else{
            gameArray[index] = 'O';
        }
        render();
    }

    const render = () => {
        tileList.forEach((tile, index) => {
            tile.textContent = gameArray[index];
        });
    }

    const reset = () => {
        gameArray = [
            '', '', '',
            '', '', '',
            '', '', ''
        ];
        tileList.forEach((tile) => {
            tile.textContent = '';
        });
        players.resetTurn();
    }

    const on = () => {
        tileList.forEach((tile) => {
            tile.addEventListener('click', clickTile); 
            tile.classList.remove('gray-out');
        });
        boardGrid.classList.remove('gray-out');
    }

    const off = () => {
        tileList.forEach((tile) => {
            tile.removeEventListener('click', clickTile);
            tile.classList.add('gray-out');
        });
        boardGrid.classList.add('gray-out');
    
    }

    const clickTile = (event) => {
        game.play(event.target.value);
    }

    const getGrid = () => boardGrid;

    const get = () => gameArray;

    let gameArray = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    const boardGrid = document.querySelector('#board-grid');
    for (let i = 0; i < 9; i++){
        const tile = document.createElement('div');
        tile.value = i.toString();
        tile.className = 'tile';
        boardGrid.appendChild(tile);
    }
    const tileList = boardGrid.querySelectorAll('.tile');
    on();

    return {place, get, reset, getGrid, on, off}
})();

const game = (function(){

    const checkOpen = (index) => {
        const arr = gameboard.get();
        if (arr[index] === ''){
            return true;
        }else{
            return false;
        }
    }

    const checkWin = () => {
        const arr = gameboard.get();
        if (
            arr[0] === arr[1] && arr[0] === arr[2] && arr[0] !== '' ||
            arr[3] === arr[4] && arr[3] === arr[5] && arr[3] !== '' ||
            arr[6] === arr[7] && arr[6] === arr[8] && arr[6] !== '' ||
            arr[0] === arr[3] && arr[0] === arr[6] && arr[0] !== '' ||
            arr[1] === arr[4] && arr[1] === arr[7] && arr[1] !== '' ||
            arr[2] === arr[5] && arr[2] === arr[8] && arr[2] !== '' ||
            arr[0] === arr[4] && arr[0] === arr[8] && arr[0] !== '' ||
            arr[2] === arr[4] && arr[2] === arr[6] && arr[2] !== ''
        ){
            return true;
        }else{
            return false;
        }
    }
    const checkTie = () => {
        const arr = gameboard.get();
        let tie = true;
        arr.forEach((item) => {
            if (item === ''){
                tie = false;
            }
        });
        return tie;
    }

    const play = (index) => {
        if (checkOpen(index)){
            
            gameboard.place(index);
            if (checkWin()){
                if(players.checkTurn() === '1'){
                    displayOutcome.innerHTML = players.getPlayerName('1') + '<br>Wins!'
                    boardGrid.appendChild(endScreen);
                    gameboard.off();
                }else{
                    displayOutcome.innerHTML = players.getPlayerName('2') + '<br>Wins!'
                    boardGrid.appendChild(endScreen);
                    gameboard.off();
                }
            }else if(checkTie()){
                displayOutcome.textContent = 'TIE GAME!';
                boardGrid.appendChild(endScreen);
                gameboard.off();
            }
            players.changeTurn();
        }
    }

    const endScreen = document.createElement('div');
    endScreen.id = 'end-screen';
    const displayOutcome = document.createElement('div');
    displayOutcome.id = 'display-outcome';
    const retryButton = document.createElement('button');
    retryButton.id = 'retry';
    retryButton.textContent = 'Retry';
    retryButton.addEventListener('click', () => {
        gameboard.reset();
        boardGrid.removeChild(endScreen);
        gameboard.on();
    });
    endScreen.appendChild(displayOutcome);
    endScreen.appendChild(retryButton);
    const boardGrid = gameboard.getGrid();

    return {play}
})();

