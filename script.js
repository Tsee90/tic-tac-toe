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
    const log = () => console.log(a + b + c);
    return {place, log}
})();