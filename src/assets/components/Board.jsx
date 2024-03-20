import Square from "./Square";
import "../styles/App.css";
import { useState, useEffect } from 'react'; // Importa useState e useEffect

function Board({ xIsNext, squares, onPlay, boardStyle }) {
  const [isBoardVisible, setIsBoardVisible] = useState(false); // Aggiungi stato per gestire la visibilità della griglia

  useEffect(() => {
    if (boardStyle) {
      setIsBoardVisible(true); // Imposta la visibilità della griglia su true quando boardStyle è definito
    }
  }, [boardStyle]); // Aggiorna la visibilità della griglia quando cambia boardStyle

  if (!isBoardVisible) {
    return null; // Se isBoardVisible è false, non renderizzare nulla
  }

  const isBoardFull = squares.every(square => square);

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (isBoardFull) {
    status = "It's a draw! Reset a new Game!";
  } else {
    status = "Next player: " + (xIsNext ? "❌" : "○");
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "❌";
    } else {
      nextSquares[i] = "❍";
    }
    onPlay(nextSquares);
  }

  return (
    <div className={`board ${boardStyle === "classic" ? "style-classic" : boardStyle === "modern" ? "style-modern" : "style-future"}`}>
      <div className="status text-xl mt-4 mb-8 text-white text-center">
        <span className="font-mono winner-shadow animate-pulse">{status}</span>
      </div>
      <div className="board-rows">
        {[0, 1, 2].map(row => (
          <div key={row} className="board-row">
            {[0, 1, 2].map(col => (
              <Square
                key={col}
                value={squares[row * 3 + col]}
                onSquareClick={() => handleClick(row * 3 + col)}
                className={boardStyle === "classic" ? "style-classic" : "style-modern"}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;