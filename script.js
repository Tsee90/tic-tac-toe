const gameboard = (function(){
    let a = [null, null, null];
    let b = [null, null, null];
    let c = [null, null, null];

    const place = (x, y, player) => {
        if(isOpen(x, y)){
            let piece = '';
            if(player === '1'){
                piece = 'X';
            }else{
                piece = 'O';
            }
            switch (x){
                case 'a':
                    a[y] = piece;
                    break;
                case 'b':
                    b[y] = piece;
                    break;
                case 'c':
                    c[y] = piece;
                    break;
            }
        }
        if(isWinner()){
            console.log('Player ' + player + ' wins!');
        }
    }

    const isOpen = (x, y) => {
        switch (x){
            case 'a':
                if(a[y] === null){
                    return true;
                }else{
                    return false;
                }
            case 'b':
                if(b[y] === null){
                    return true;
                }else{
                    return false;
                }
            case 'c':
                if(c[y] === null){
                    return true;
                }else{
                    return false
                }
        }
    }

    const isWinner = () => {
        if(
            a[0] === a[1] && a[0] === a[2] && a[0] !== null ||
            b[0] === b[1] && b[0] === b[2] && b[0] !== null ||
            c[0] === c[1] && c[0] === c[2] && c[0] !== null ||
            a[0] === b[0] && a[0] === c[0] && a[0] !== null ||
            a[1] === b[1] && a[1] === c[1] && a[1] !== null ||
            a[2] === b[2] && a[2] === c[2] && a[2] !== null ||
            a[0] === b[1] && a[0] === c[2] && a[0] !== null ||
            a[2] === b[1] && a[2] === c[0] && a[2] !== null 
        ){
            return true;
        }else{
            return false;
        }
    }

    const log = () => console.log(a + b + c);

    return {place, log}
})();