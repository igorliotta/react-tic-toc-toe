import Square from "./Square";
import "../styles/App.css";

function Board({ xIsNext, squares, onPlay, boardStyle }) {
  // const [xIsNext, setXIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));



  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
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
      nextSquares[i] = "○";
    }
    onPlay(nextSquares);
  }

  return (
    <div className={`board ${boardStyle === "classic" ? "style-classic" : boardStyle === "modern" ? "style-modern" : "style-future"}`}>
      <div className="status text-3xl mt-4 mb-8 text-white text-center">
        <span className="font-mono text-lime-500 winner-shadow">{status}</span>
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
