import Board from './classes/board.js';
import Player from './classes/player.js';

const newGameBtn = document.getElementById("newGame");
const cells = document.querySelectorAll(".cell");
const status = document.getElementById("winMessage");
const level = document.getElementById("depth");

//Initializing an empty board when game loads for the first time
let board = new Board(["","","","","","","","",""]);

//Initializing a new player with max difficulty when game loads for the first time(Evil Laugh!!)
let player= new Player();

//Function to handle restart game 
const newGame = (startingPlayer=1, depth=-1) => {

    //Setting up a new empty board
    board = new Board(["","","","","","","","",""]);
    //Setting a new player with user defined difficulty
    player = new Player(depth);

    //Reseting all the html divs to blank and removing any aditional class added during play
    cells.forEach(cell=>{
        cell.innerHTML="";
        cell.classList.remove("notAllowed");
    });
    status.style.display="none";
    status.innerHTML="";
}

//Func. called immediately after player turn to calculate computers move based on the difficuly
const computerMove = () => {
    const index=player.getBestMove(board);
    board.insert('x', index);
    cells[index].innerHTML="x";
    cells[index].classList.add("notAllowed");
    isGameOver();
}

//Check after every for winner
const isGameOver = () => {
    const winner = board.isTerminal();
    if(winner){
        status.style.display="block";
        let message="";
        if(winner.winner==="x")
            message="Computer won!";
        else if(winner.winner==="o")
            message="You Won!";
        else message="It's a Draw!";
        status.innerHTML=message;
    }
}

//Handel player move
const playerMove = (index) => {
    if(!board.insert('o', index)) return;
    cells[index].innerHTML="o";
    cells[index].classList.add("notAllowed");
    isGameOver();
    if(board.isTerminal()) return;
    computerMove();

}


//Adding event listener to handel player input
cells.forEach((cell, index)=>{
    cell.addEventListener("click", ()=>playerMove(index));
});

//New game button
newGameBtn.addEventListener("click", ()=>newGame(1, level.value));