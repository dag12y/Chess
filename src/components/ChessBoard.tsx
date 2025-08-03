import "./ChessBoard.css";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
    image: string;
    x: number;
    y: number;
}

const initialPieces: Piece[] = [];

// Add major pieces
for (let p = 0; p < 2; p++) {
    const type = p === 0 ? "b" : "w";
    const y = p === 0 ? 7 : 0;

    initialPieces.push({ image: `/assets/images/rook_${type}.png`, x: 0, y });
    initialPieces.push({ image: `/assets/images/rook_${type}.png`, x: 7, y });
    initialPieces.push({ image: `/assets/images/knight_${type}.png`, x: 1, y });
    initialPieces.push({ image: `/assets/images/knight_${type}.png`, x: 6, y });
    initialPieces.push({ image: `/assets/images/bishop_${type}.png`, x: 2, y });
    initialPieces.push({ image: `/assets/images/bishop_${type}.png`, x: 5, y });
    initialPieces.push({ image: `/assets/images/queen_${type}.png`, x: 3, y });
    initialPieces.push({ image: `/assets/images/king_${type}.png`, x: 4, y });
}

// Add pawns
for (let i = 0; i < 8; i++) {
    initialPieces.push({ image: "/assets/images/pawn_b.png", x: i, y: 6 });
    initialPieces.push({ image: "/assets/images/pawn_w.png", x: i, y: 1 });
}

function ChessBoard() {
    const [pieces, setPieces] = useState<Piece[]>(initialPieces);
    const [draggedPiece, setDraggedPiece] = useState<Piece | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

    const boardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging && boardRef.current) {
                const boardRect = boardRef.current.getBoundingClientRect();
                setDragPosition({
                    x: e.clientX - boardRect.left - dragOffset.x,
                    y: e.clientY - boardRect.top - dragOffset.y,
                });
            }
        };

        const handleMouseUp = (e: MouseEvent) => {
            if (isDragging && draggedPiece && boardRef.current) {
                const boardRect = boardRef.current.getBoundingClientRect();
                const x = Math.floor((e.clientX - boardRect.left) / (boardRect.width / 8));
                const y = 7 - Math.floor((e.clientY - boardRect.top) / (boardRect.height / 8));

                if (x >= 0 && x < 8 && y >= 0 && y < 8) {
                    setPieces(prev =>
                        prev.map(p => (p === draggedPiece ? { ...p, x, y } : p))
                    );
                }

                setDraggedPiece(null);
                setIsDragging(false);
                setDragOffset({ x: 0, y: 0 });
                setDragPosition({ x: 0, y: 0 });
            }
        };

        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, draggedPiece, dragOffset]);

    const handleMouseDown = (e: React.MouseEvent, piece: Piece) => {
        e.preventDefault();

        const element = e.currentTarget as HTMLElement;
        const pieceRect = element.getBoundingClientRect();
        const boardRect = boardRef.current?.getBoundingClientRect();

        if (boardRect) {
            const offsetX = e.clientX - pieceRect.left;
            const offsetY = e.clientY - pieceRect.top;

            setDragOffset({ x: offsetX, y: offsetY });
            setDraggedPiece(piece);
            setIsDragging(true);

            setDragPosition({
                x: e.clientX - boardRect.left - offsetX,
                y: e.clientY - boardRect.top - offsetY,
            });
        }
    };

    const board = [];

    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            const piece = pieces.find((p) => p.x === i && p.y === j);
            const tileColor = (i + j) % 2 === 0 ? "white-tile" : "black-tile";

            const isBeingDragged = draggedPiece === piece && isDragging;

            board.push(
                <div key={`${i}-${j}`} className={clsx("tile", tileColor)}>
                    {piece && !isBeingDragged && (
                        <div
                            className="chess-piece"
                            style={{ backgroundImage: `url(${piece.image})` }}
                            onMouseDown={(e) => handleMouseDown(e, piece)}
                        ></div>
                    )}
                </div>
            );
        }
    }

    return (
        <div ref={boardRef} className="chess-board">
            {board}

            {isDragging && draggedPiece && (
                <div
                    className="chess-piece dragging-piece"
                    style={{
                        backgroundImage: `url(${draggedPiece.image})`,
                        left: dragPosition.x,
                        top: dragPosition.y,
                    }}
                />
            )}
        </div>
    );
}

export default ChessBoard;
