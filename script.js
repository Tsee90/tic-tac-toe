const gameboard = (function(){
    let gameArray = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    const place = (index, symbol) => {
        gameArray[index] = symbol;
    }
    const get = () => gameArray;
    return {place, get}
})();

function createPlayer(name, number) {
    const changeName = (newName) => {name = newName}
    const getName = () => name;
    const getNumber = () => number;
    return {changeName, getName, getNumber}
}

const game = (function (){
    let turn = '1';
    
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

    const getTurn = () => {
        return turn;
    }

    const play = (index) => {
        let piece = '';
        if (turn === '1') {
            piece = 'X';
        }else{
            piece = 'O';
        }
    
        if (checkOpen(index)){
            gameboard.place(index, piece);
            if (checkWin()){
                console.log(turn + ' Wins!');
            }else if(checkTie()){
                console.log('TIE!');
            }
            console.log(gameboard.get());
            if (turn === '1'){
                turn = '2';
            }else{
                turn = '1';
            }
        }
    }
    return {play, checkOpen, getTurn}
})();

const initialize = (function(){
    const player1 = createPlayer('Player 1', '1');
    const player2 = createPlayer('Player 2', '2');
    const boardGrid = document.querySelector('#board-grid');

    const createTiles = () => {
        for (let i = 0; i < 9; i++){
            const tile = document.createElement('div');
            tile.value = i.toString();
            tile.className = 'tile';
            tile.addEventListener('click', (event) => {
                const index = event.target.value;  
                game.play(index);                  
            });
            boardGrid.appendChild(tile);
        }
        
    }
    createTiles();
})();

