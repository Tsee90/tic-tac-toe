//Creates two players with editable names
//Can return information on players
//Self Contained, receives no outside variables from other functions
const players = (function(){
    //Player constructor
    const createPlayer = (name, number, turn) => {
        return {name, number, turn}
    }
    //Displays player names in container
    const render = () => {
        firstPlayerDisplay.textContent = firstPlayer.name;
        secondPlayerDisplay.textContent = secondPlayer.name;
    }
    //Handles click event for edit button
    const editButton = (event) => {
        let nearestDiv = event.target.nextElementSibling || event.target.previousElementSibling;//Selects nearest sibling div, which is the div which displays player name
        //Checks editable state of player name div and toggles
        if(nearestDiv.contentEditable === 'false'){
            nearestDiv.contentEditable = 'true';//Toggle
            event.target.textContent = 'Save';//Change button text
            nearestDiv.focus();
            //Block of code below highlights the now editable player name text
            let range = document.createRange();
            let selection = window.getSelection();
            range.selectNodeContents(nearestDiv); 
            selection.removeAllRanges(); 
            selection.addRange(range);
        }else{
            nearestDiv.contentEditable = 'false';//Toggle
            event.target.textContent = 'Edit';//Change button text
            let newName = nearestDiv.textContent;//Store user input
            //Check length and trim if too long
            if (newName.length > 18){
                newName = newName.slice(0, 18) + '...';
            }
            //Check which player changed name and apply name change
            if (event.target.id === 'player-one-button'){
                firstPlayer.name = newName;
            }else{
                secondPlayer.name = newName;
            }
            //Checks name length again to trim for display
            if (newName.length > 9){
                newName = newName.slice(0, 9);
            }
            nearestDiv.textContent = newName;//Display new name
            //Block of code below removes any highlight on selected text
            let selection = window.getSelection();
            selection.removeAllRanges();
        }
    }
    //Handles 'Enter' keydown event while player name div is editable. Clicks edit button
    const keydownEnter = (event) => {
        if(event.target.contentEditable === 'true' && event.key === 'Enter'){
            let nearestButton = event.target.nextElementSibling || event.target.previousElementSibling;
            nearestButton.click();
        }
    }
    //Toggles turns
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
    //Declare scoped variables
    let firstPlayer = null;
    let secondPlayer = null;
    let firstPlayerDisplay = null;
    let secondPlayerDisplay = null;
    //Initialize variables and event handlers
    const init = (function (){
        firstPlayer = createPlayer('Player 1', '1', true);
        secondPlayer = createPlayer('Player 2', '2', false);

        firstPlayerDisplay = document.querySelector('#player-one');
        secondPlayerDisplay = document.querySelector('#player-two');

        const editButtons = document.querySelectorAll('.edit-name');
        editButtons.forEach((button) => {
            button.addEventListener('click', editButton);
        })

        const playerDivs = document.querySelectorAll('.player-name');
        playerDivs.forEach((div) => {
            div.addEventListener('keydown', keydownEnter);
        });

        render();
    })();

    return {getPlayers, getPlayerName, changeTurn, checkTurn, resetTurn}
})();

//Creates gameboard and has functions to manipulate game
//Can return information about gameboard
//Self-contained, does not recieve any variables from outside functions
const gameboard = (function(){
    //Places a piece of the board
    const place = (index, piece) => {
        gameArray[index] = piece;
        render();
    }
    //Display gameArray state
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
    //Activates board
    const on = () => {
        tileList.forEach((tile) => {
            tile.addEventListener('click', clickTile); 
            tile.classList.remove('gray-out');
        });
        boardGrid.classList.remove('gray-out');
    }
    //Deactivates board, grays out
    const off = () => {
        tileList.forEach((tile) => {
            tile.removeEventListener('click', clickTile);
            tile.classList.add('gray-out');
        });
        boardGrid.classList.add('gray-out');
    }
    //Triggers play on click
    const clickTile = (event) => {
        game.play(event.target.value);
    }

    const getGrid = () => boardGrid;

    const get = () => gameArray;
    //Declare scoped variables
    let gameArray = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    let boardGrid = null;
    let tileList = null;
    //Initialize variables
    const init = (function() {
        boardGrid = document.querySelector('#board-grid');
        for (let i = 0; i < 9; i++){
            const tile = document.createElement('div');
            tile.value = i.toString();
            tile.className = 'tile';
            boardGrid.appendChild(tile);
        }
        tileList = boardGrid.querySelectorAll('.tile');
        on();
    })();
    return {place, get, reset, getGrid, on, off}
})();

//Applies functional logic to the game by calling variables from both players and gameboard
const game = (function(){
    //Checks if a tile is open
    const checkOpen = (index) => {
        const arr = gameboard.get();
        if (arr[index] === ''){
            return true;
        }else{
            return false;
        }
    }
    //Checks for a winning arrangement
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
    //Tie if board is full with no winner
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
    //Called each instance a tile is clicked
    const play = (index) => {
        //First checks if open
        if (checkOpen(index)){
            //Check turn to determine which piece to place
            if(players.checkTurn() === '1'){
                gameboard.place(index, 'X');   
            }else{
                gameboard.place(index, 'O'); 
            }
            //Check for a winner or tie after each piece is placed
            //If true, board deactivated and outcome displayed
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
            players.changeTurn();//If no winner or tie
        }
    }
    //Eventhandler for retry button
    const retry = (event) => {
        gameboard.reset();
        boardGrid.removeChild(endScreen);
        gameboard.on();
    }
    //Declare scoped variables
    let endScreen = null;
    let displayOutcome = null;
    let boardGrid = null;
    //Initialize variables
    const init = (function(){
        endScreen = document.createElement('div');
        endScreen.id = 'end-screen';
        displayOutcome = document.createElement('div');
        displayOutcome.id = 'display-outcome';
        const retryButton = document.createElement('button');
        retryButton.id = 'retry';
        retryButton.textContent = 'Retry';
        retryButton.addEventListener('click', retry);
        endScreen.appendChild(displayOutcome);
        endScreen.appendChild(retryButton);
        boardGrid = gameboard.getGrid();
    })();

    return {play}
})();

