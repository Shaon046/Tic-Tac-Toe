import React from "react";
import "./Board.css";
import Box from "./Box";

function Board({ board, onClick }) {


  return (
    <div className="board">
      {board.map((val, idx) => {
        return <Box key={idx} value={val} onClick={() => val===null && onClick(idx)} />;
      })}
    </div>
  );
}

export default Board;
