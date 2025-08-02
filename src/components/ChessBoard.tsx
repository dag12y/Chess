import './ChessBoard.css'
import clsx from 'clsx';


const verticalAxis=['1','2','3','4','5','6','7','8']
const horizontalAxis=['a','b','c','d','e','f','g','h']

function ChessBoard() {
    let board=[];

    for(let j=verticalAxis.length-1;j>=0;j--){
        for(let i=0;i<horizontalAxis.length;i++){

            board.push(<div className={clsx((i+j)%2==0 ? 'black-tile' : 'white-tile')}></div>)
        }
    }

    return <div className='chess-board'>
            {board}
        </div>;
}

export default ChessBoard;
