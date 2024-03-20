import { useState } from "react";
import Board from "./Board";
import Icons from "../images/icons.png";
import Wallpaper from "../images/bg.jpeg";
import Tris from "../images/tris.png";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [gameStarted, setGameStarted] = useState(false);
  const [gameReset, setGameReset] = useState(false);
  const [boardStyle, setBoardStyle] = useState(""); // Stile predefinito

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setGameStarted(true);
  }

  function handleResetScreen() {
    setGameStarted(false);
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
          className="text-xs bg-slate-950 border border-lime-700 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group text-lime-300 mb-2"
        >
          <span className="bg-slate-400 shadow-lime-700 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)] text-lime-300"></span>
          {description}
        </button>
      </li>
    );
  });

  return (
    <>
      

      {/* Prova macbook */}
      <div className="flex flex-col m-auto">
        <div className="display m-auto">
          <div
            className={`screen border-solid border-4 border-orange-200 rounded-xl p-5 bg-cover ${
              gameStarted ? "half-width" : ""
            }`}
            style={{
              backgroundImage: gameStarted ? "none" : `url(${Wallpaper})`,
              backgroundColor: gameStarted ? "white" : "transparent",
            }}
          >
            {!gameStarted && (
              <>
                <div className="">
                  <button
                    className="button"
                    onClick={() => setGameStarted(true)}
                  >
                    <img src={Tris} alt="" className="icon" />
                  </button>
                  <span className="backdrop"></span>
                </div>
                <span className="text-white absolute tris-text text-xs">
                  Tris
                </span>
              </>
            )}
            {gameStarted && (
              <>
                <div className="p-2 font-mono flex flex-col gap-3">
                  <p className="p-2 text-xs w-48 text-center">
                    Choose Board Style:
                  </p>
                  <div className="mx-2 radio-input">
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

                    <div className="card">
                      <div className="tools">
                        <div className="circle" onClick={handleResetScreen}>
                          <span className="red box"></span>
                        </div>
                        <div className="circle">
                          <span className="yellow box"></span>
                        </div>
                        <div className="circle">
                          <span className="green box"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                    boardStyle={boardStyle}
                  />
                </div>
              </>
            )}
            {gameStarted && (
              <>
                <div className="game-info absolute bottom-10 right-10 m-4">
                  <ol>{moves}</ol>
                </div>
              </>
            )}

            <div className="dock">
              <img src={Icons} alt="" />
            </div>
          </div>
          <span className="label">
            MacBook Pro <i className="fa-brands fa-apple"></i>
          </span>
        </div>
        <div className="keys m-auto">
          <div className="boarD"></div>
          <div className="touchpad"></div>
        </div>
        <div className="comp m-auto">
          <div className="notch"></div>
        </div>
        <div className="compBottom m-auto"></div>
      </div>
    </>
  );
}
