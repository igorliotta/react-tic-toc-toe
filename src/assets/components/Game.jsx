import Board from "./Board";
import { useState } from "react";
import Image from "../images/tris-2.jpeg";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [gameStarted, setGameStarted] = useState(false);
  const [gameReset, setGameReset] = useState(false);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setGameStarted(true);
    // setXIsNext(!xIsNext);
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
    // setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <>
        <li key={move}>
          {/* <button onClick={() => jumpTo(move)}>{description}</button> */}
          <button
            onClick={() => jumpTo(move)}
            className="bg-slate-950 text-slate-400 border border-slate-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
          >
            <span className="bg-slate-400 shadow-slate-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            {description}
          </button>
        </li>
      </>
    );
  });

  return (
    <>
      <div
        className="w-screen h-screen bg-no-repeat bg-cover relative"
        style={{ backgroundImage: `url(${Image})` }}
      >
        <div className="game flex gap-5">
          <div className="game-board absolute right-96 mt-12">
            {/* Bottone play game */}
            {!gameStarted && (
              <button
                onClick={() => setGameStarted(true)} // Imposta lo stato del gioco su "true" al click
                className="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-black rounded-[16px] bg-gradient-to-t from-[#8122b0] to-[#dc98fd] active:scale-95 absolute righr-5 animate-bounce shadow-2xl shadow-zinc-300"
              >
                <span className="w-full h-full flex items-center gap-2 px-8 py-3 bg-[#B931FC] text-[#f1d5fe] rounded-[14px] bg-gradient-to-t from-[#a62ce2] to-[#c045fc]">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    className="w-5 h-5 stroke-linecap-round stroke-linecap-round stroke-linejoin-round stroke-width"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 13V9m-2 2h4m5-2v.001M18 12v.001m4-.334v5.243a3.09 3.09 0 0 1-5.854 1.382L16 18a3.618 3.618 0 0 0-3.236-2h-1.528c-1.37 0-2.623.774-3.236 2l-.146.292A3.09 3.09 0 0 1 2 16.91v-5.243A6.667 6.667 0 0 1 8.667 5h6.666A6.667 6.667 0 0 1 22 11.667Z"></path>
                  </svg>
                  Play Game
                </span>
              </button>
            )}
            {gameStarted && (
              <button
                onClick={handleReset} // Chiamata alla funzione di reset del gioco
                className="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-black rounded-[16px] bg-gradient-to-t from-[#8122b0] to-[#dc98fd] active:scale-95 absolute righr-5 animate-bounce shadow-2xl shadow-zinc-300"
              >
                <span className="w-full h-full flex items-center gap-2 px-8 py-3 bg-[#B931FC] text-[#f1d5fe] rounded-[14px] bg-gradient-to-t from-[#a62ce2] to-[#c045fc]">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    className="w-5 h-5 stroke-linecap-round stroke-linecap-round stroke-linejoin-round stroke-width"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 13V9m-2 2h4m5-2v.001M18 12v.001m4-.334v5.243a3.09 3.09 0 0 1-5.854 1.382L16 18a3.618 3.618 0 0 0-3.236-2h-1.528c-1.37 0-2.623.774-3.236 2l-.146.292A3.09 3.09 0 0 1 2 16.91v-5.243A6.667 6.667 0 0 1 8.667 5h6.666A6.667 6.667 0 0 1 22 11.667Z"></path>
                  </svg>
                  Go to Home
                </span>
              </button>
            )}
            {gameStarted && (
              <Board
                xIsNext={xIsNext}
                squares={currentSquares}
                onPlay={handlePlay}
              />
            )}
          </div>
          {gameStarted && (
            <div className="game-info absolute right-36 top-36 mt-12">
              <ol>{moves}</ol>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
