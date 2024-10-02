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

function game(index, player){
    let piece = '';
    if (player.getNumber() === '1') {
        piece = 'X';
    }else{
        piece = 'O';
    }

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

    if (checkOpen(index)){
        gameboard.place(index, piece);
        if (checkWin()){
            console.log(player.getName() + ' Wins!');
        }else if(checkTie()){
            console.log('TIE!');
        }
    }

}

const player1 = createPlayer('Player 1', '1');
const player2 = createPlayer('Player 2', '2');