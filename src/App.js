import { useState } from "react";
import "./App.css";
import Board from "./Component/Board";
import { ScoreBoard } from "./Component/ScoreBoard";
import { Reset } from "./Component/Reset";

function App() {
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [score, setScore] = useState({ xScore: 0, oScore: 0 });
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXplaying] = useState(true);
  const [gameOver, setGameOver] = useState();
  const handleBoxClick = (boxIdx) => {
    const updatedBoard = board.map((val, idx) => {
      if (idx === boxIdx) {
        return xPlaying === true ? "x" : "o";
      } else {
        return val;
      }
    });

    const winner = checkWinner(updatedBoard);

    if (winner === "o") {
      setScore({ ...score, oScore: score.oScore + 1 });
      console.log(score);
    }
    if (winner === "x") {
      setScore({ ...score, xScore: score.xScore + 1 });
      console.log(score);
    }

    setBoard(updatedBoard);

    setXplaying(!xPlaying);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];
      //[0, 1, 2]

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };

  return (
    <div>
      <ScoreBoard score={score} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <Reset resetBoard={resetBoard} />
    </div>
  );
}

export default App;
