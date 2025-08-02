import "./ChessBoard.css";
import clsx from "clsx";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
    image: string;
    x: number;
    y: number;
}

const pieces: Piece[] = [];

for (let p = 0; p < 2; p++) {
    const type = p === 0 ? "b" : "w";
    const y = p === 0 ? 7 : 0;

    pieces.push({ image: `/assets/images/rook_${type}.png`, x: 0, y });
    pieces.push({ image: `/assets/images/rook_${type}.png`, x: 7, y });
    pieces.push({ image: `/assets/images/knight_${type}.png`, x: 1, y });
    pieces.push({ image: `/assets/images/knight_${type}.png`, x: 6, y });
    pieces.push({ image: `/assets/images/bishop_${type}.png`, x: 2, y });
    pieces.push({ image: `/assets/images/bishop_${type}.png`, x: 5, y });
    pieces.push({ image: `/assets/images/queen_${type}.png`, x: 3, y });
    pieces.push({ image: `/assets/images/king_${type}.png`, x: 4, y });
}

for (let i = 0; i < 8; i++) {
    pieces.push({
        image: "/assets/images/pawn_b.png", 
        x: i,
        y: 6,
    });
}

for (let i = 0; i < 8; i++) {
    pieces.push({
        image: "/assets/images/pawn_w.png", 
        x: i,
        y: 1,
    });
}

function ChessBoard() {
    const board = [];

    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            const piece = pieces.find((p) => p.x === i && p.y === j);
            const tileColor = (i + j) % 2 === 0 ? "white-tile" : "black-tile";

            board.push(
                <div key={`${i}-${j}`} className={clsx("tile", tileColor)}>
                    {piece && <img src={piece.image} alt="chess piece" />}
                </div>
            );
        }
    }

    return <div className="chess-board">{board}</div>;
}

export default ChessBoard;
