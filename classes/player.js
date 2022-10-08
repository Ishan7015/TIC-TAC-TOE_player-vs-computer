import Board from "./board.js";

export default class Player {
    
    //Maximum depth to adjust difficulty of game and nodesMap store best possible move
    constructor(maxDepth=1){
        this.maxDepth=maxDepth;
        this. nodesMap=new Map();
    }

    //Recursive minimax function to get the best possible move at any given instance
    getBestMove = (board, maximizing=true, callback = ()=>{}, depth=0) =>{
        if(depth===0) this.nodesMap.clear();
        //Terminating condition to end the recursive call
        if(board.isTerminal() || depth==this.maxDepth){
            if(board.isTerminal().winner==='x'){
                return 100-depth;
            }
            else if(board.isTerminal().winner==='o'){
                return -100+depth;
            }
            return 0;
        }

        if(maximizing) {
            //for maximizing player, initial best possible score is -100, as it tries to maximize the socre
            let best=-100;
            board.getAvailableMove().forEach(index=>{
                const child = new Board([...board.state]);
                child.insert('x', index);
                const nodeValue=this.getBestMove(child, false, callback, depth+1);
                best=Math.max(best, nodeValue);

                if(depth===0){
                    const move=this.nodesMap.has(nodeValue)?`${this.nodesMap.get(nodeValue)},${index}`:index;
                    this.nodesMap.set(nodeValue, move);
                }
            });
            if(depth===0){
                let ret;
                if(typeof this.nodesMap.get(best) ==="string"){
                    const arr=this.nodesMap.get(best).split(',');
                    const len=Object.keys(arr).length
                    const rand = Math.floor(Math.random()*len);
                    ret= parseInt(arr[rand]);
                }
                else ret= this.nodesMap.get(best);
                
                callback(ret);
                return ret;
            }
            return best;
        }
        if(!maximizing) {
            //for minimizing player, initial best possible score is 100, as it tries to minimize the socre
            let best=100;
            board.getAvailableMove().forEach(index=>{
                const child = new Board([...board.state]);
                child.insert('o', index);
                const nodeValue=this.getBestMove(child, true, callback, depth+1);
                best=Math.min(best, nodeValue);

                if(depth===0){
                    const move=this.nodesMap.has(nodeValue)?`${this.nodesMap.get(nodeValue)},${index}`:index;
                    this.nodesMap.set(nodeValue, move);
                }
            });
            if(depth===0){
                let ret;
                if(typeof this.nodesMap.get(best)==="string"){
                    const arr=this.nodesMap.get(best).split(',');
                    const len=Object.keys(arr).length
                    const rand = Math.floor(Math.random()*len);
                    ret= parseInt(arr[rand]);
                }
                else ret= this.nodesMap.get(best);
                console.log(2);
                callback(ret);
                return ret;
            }
            return best;
        }

    } 

}