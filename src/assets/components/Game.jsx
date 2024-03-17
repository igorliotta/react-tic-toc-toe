import { useState } from "react";
import Board from "./Board";
import Image from "../images/tris-2.jpeg";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [gameStarted, setGameStarted] = useState(false);
  const [gameReset, setGameReset] = useState(false);
  const [boardStyle, setBoardStyle] = useState("classic"); // Stile predefinito

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setGameStarted(true);
  }

  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setGameStarted(false);
    setGameReset(true);
    setGameReset(false);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Restart";
    }
    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          className="bg-slate-950 border border-lime-700 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group text-lime-300 mb-2"
        >
          <span className="bg-slate-400 shadow-lime-700 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)] text-lime-300"></span>
          {description}
        </button>
      </li>
    );
  });

  return (
    <div
      className="w-screen h-screen bg-no-repeat bg-cover relative"
      style={{ backgroundImage: `url(${Image})` }}
    >
      <div className="game flex gap-5 text-center">
        <div className="game-board absolute right-96 mt-12 flex gap-4">

          {/* Bottone play game */}
          {!gameStarted && (
            <button
              onClick={() => setGameStarted(true)}
              className="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-black rounded-[16px] bg-gradient-to-t from-[#8122b0] to-[#dc98fd] active:scale-95 absolute righr-5 animate-bounce shadow-2xl shadow-zinc-300 h-10"
            >
              <span className="w-full h-full flex items-center gap-2 px-8 py-3 bg-[#B931FC] text-[#f1d5fe] rounded-[14px] bg-gradient-to-t from-[#a62ce2] to-[#c045fc]">
              <i className="fa-solid fa-gamepad"></i>
                Play Game
              </span>
            </button>
          )}
          {gameStarted && (
            <>
            {/* Selettore di stile */}

          <div className="mb-4 font-mono">
           <p className="mb-2">Choose Board Style</p>
            <div className="mb-4 radio-input">
              <input
                value="classic"
                name="board-style"
                id="classic"
                type="radio"
                checked={boardStyle === "classic"}
                onChange={(e) => setBoardStyle(e.target.value)}
              />
              <label htmlFor="classic">Classic</label>
              <input
                value="modern"
                name="board-style"
                id="modern"
                type="radio"
                checked={boardStyle === "modern"}
                onChange={(e) => setBoardStyle(e.target.value)}
              />
              <label htmlFor="modern">Modern</label>
              <input
                value="future"
                name="board-style"
                id="future"
                type="radio"
                checked={boardStyle === "future"}
                onChange={(e) => setBoardStyle(e.target.value)}
              />
              <label htmlFor="future">Future</label>
            </div>
          </div>
          <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
              boardStyle={boardStyle}
            />
            </>
          )}
        </div>
        {gameStarted && (
          <>
          <div className="game-info absolute right-36 top-0 mt-12">
            <ol>{moves}</ol>
          </div>
          </>
        )}
      </div>
    </div>
  );
}
