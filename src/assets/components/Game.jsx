import { useState } from "react";
import Board from "./Board";
import Icons from "../images/icons.png";
import Wallpaper from "../images/bg.jpeg";
import Tris from "../images/tris.png";
import WallpaperBlur from "../images/bg-blur.jpg";
import UpBar from "../images/upbar.png";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [gameStarted, setGameStarted] = useState(false);
  const [boardStyle, setBoardStyle] = useState("");
  const [moveMade, setMoveMade] = useState(false);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setGameStarted(true);
    setMoveMade(true);
  }

  function handleResetScreen() {
    setGameStarted(false);
  }

  function handleReset() {
    
  setCurrentMove(0);
  setMoveMade(false);
 
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description = "Go to move " + (move);

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          <span className="list-items">{description}</span>
        </button>
      </li>
    );
  });

  return (
    <>
      {/* Prova macbook */}
      <div className="flex flex-col m-auto">
        <div className="display m-auto ">
          <div
            className="screen-bg  border-solid border-2 border-orange-200 rounded-xl bg-cover"
            style={{ backgroundImage: `url(${WallpaperBlur})` }}
          >
            <div
              className={`screen border-solid border-2 border-orange-200 rounded-xl bg-cover ${
                gameStarted ? "half-width animated animatedFadeInUp fadeInUp" : "fadeOut" 
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
                    Tic Tac Toe
                  </span>
                </>
              )}
              {gameStarted && (
                <>
                  <div className="p-2 font-mono flex flex-col gap-3">
                    <p className="p-2 text-xs w-48 text-center text-imput">
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
              {gameStarted && moveMade && (
                <div className="game-info absolute top-20 right-10 m-4">
                  {/* Button reset history */}
                  <button className="btn-reset" onClick={handleReset}>Reset All</button>
                  {/* Fine Button reset history */}
                  <ol className="list-disc">{moves}</ol>
                </div>
              )}

              {gameStarted && (
                <>
                <div className="dock hidden">
                  <img src={Icons} alt="" />
                </div>
                </>
              )}
              {!gameStarted && (
                <>
                <div className="menubar">
                  <img src={UpBar} alt="" />
                </div>
                <div className="dock">
                  <img src={Icons} alt="" />
                </div>
                </>
              )}
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
