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
        alert(event.target.id)
        let currentName = nearestDiv.textContent;
        if(nearestDiv.contentEditable === 'false'){
            nearestDiv.contentEditable = 'true';
            event.target.textContent = 'Save'
        }else{
            nearestDiv.contentEditable = 'false';
            event.target.textContent = 'Edit';
            if (event.target.id === 'player-one-button'){
                firstPlayer.name = nearestDiv.textContent;
            }else{
                secondPlayer.name = nearestDiv.textContent;
            }
        }
    }
    firstPlayer = createPlayer('Player 1', '1', true);
    secondPlayer = createPlayer('Player 2', '2', false);

    let firstPlayerDisplay = document.querySelector('#player-one');
    let secondPlayerDisplay = document.querySelector('#player-two');
    render();
    const editPlayerOne = document.querySelector('#player-one-button');
    const editPlayerTwo = document.querySelector('#player-two-button');
    editPlayerOne.addEventListener('click', (event) => {editButton(event)});
    editPlayerTwo.addEventListener('click', (event) => {editButton(event)});

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

    return {changeName, getPlayers, getPlayerName, changeTurn, checkTurn, resetTurn}
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
                    alert(players.getPlayerName('1') + ' Wins!');
                }else{
                    alert(players.getPlayerName('2') +  'Wins!');
                }
                gameboard.reset();
            }else if(checkTie()){
                console.log('TIE!');
            }
            players.changeTurn();
            console.log(gameboard.get());
        }
    }
    return {play}
})();

const gameboard = (function(){
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
        tile.addEventListener('click', (event) => {
            game.play(event.target.value);
        });
        boardGrid.appendChild(tile);
    }
    const tileList = boardGrid.querySelectorAll('.tile');

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

    const get = () => gameArray;
    return {place, get, reset}
})();