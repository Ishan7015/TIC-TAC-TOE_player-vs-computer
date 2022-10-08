export default class Board {
    constructor (state=["","","","","","","","",""]){
        this.state=state;
    }

    //Placeholder board print in console
    printFormattedBoard = () => {
        let formattedString = '';
        this.state.forEach((cell, index) => {
            formattedString += cell ? ` ${cell} |` : '   |';
            if((index + 1) % 3 === 0)  {
                formattedString = formattedString.slice(0,-1);
                if(index < 8) formattedString += '\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n';
            }
        });
        console.log('%c' + formattedString, 'color: #c11dd4;font-size:16px');
    }

    //Check if the board is empty
    isEmpty = () =>{
       return this.state.every(cell=>!cell);
    }
    //Check if the board is full
    isFull = () =>{
        return this.state.every(cell=>cell);
    }

    //Game terminal check
    isTerminal = () =>{
        if(this.isEmpty()) return false;

        //Checcking Horizontal win condition
        if(this.state[0]===this.state[1] && this.state[1]===this.state[2] && this.state[0]){
            return {
                winner: this.state[0],
                direction: 'H',
                row: 1
            }
        }
        if(this.state[3]===this.state[4] && this.state[4]===this.state[5] && this.state[3]){
            return {
                winner: this.state[3],
                direction: 'H',
                row: 2
            }
        }
        if(this.state[6]===this.state[7] && this.state[6]===this.state[8] && this.state[6]){
            return {
                winner: this.state[6],
                direction: 'H',
                row: 3
            }
        }

        //Checking for Vertical win condition
        if(this.state[0]===this.state[3] && this.state[3]===this.state[6] && this.state[0]){
            return {
                winner: this.state[0],
                direction: 'V',
                column: 1
            }
        }
        if(this.state[1]===this.state[4] && this.state[4]===this.state[7] && this.state[1]){
            return {
                winner: this.state[1],
                direction: 'V',
                column: 2
            }
        }
        if(this.state[2]===this.state[5] && this.state[5]===this.state[8] && this.state[2]){
            return {
                winner: this.state[2],
                direction: 'V',
                column: 3
            }
        }

        //Checking for Diagonal win condition
        if(this.state[0]===this.state[4] && this.state[4]===this.state[8] &&this.state[0]){
            return {
                winner: this.state[0],
                direction: 'D',
                diagonal: 'main'
            }
        }
        if(this.state[2]===this.state[4] && this.state[4]===this.state[6] &&this.state[2]){
            return {
                winner: this.state[2],
                direction: 'D',
                diagonal: 'counter'
            }
        }

        //Checking for Draw condition
        if(this.isFull()) return {winner: 'Draw'}
        return false;
    }

    //Insert Sumbols 
    insert = (symbol, position) =>{
        if(![0,1,2,3,4,5,6,7,8].includes(position)) {
            throw new Error("Cell index does not exist");
        }
        if(!['x','o'].includes(symbol)){
            throw new Error("Symbols can only be 'x' and 'o'");
        }
        if(this.state[position]) return false;
        this.state[position]=symbol;
        return true;
    }

    //Get all the available empty cell location
    getAvailableMove = () =>{
        const moves = [];
        this.state.forEach((cell, i)=>{
            if(!cell) moves.push(i);
        });
        return moves;
    }
}