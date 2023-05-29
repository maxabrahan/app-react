import { useEffect, useState } from "react";
import Board from "./Board";
import { WinnersBoard } from "./WinnersBoard";
import Winner from "../models/winners.model";

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), coordinates: { row: null, col: null } }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [orden, setOrden] = useState("ascendente");
  const [winner, setwinner] = useState([]);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handleSortMoves() {
    if (orden === "ascendente") {
      setOrden("descendente");
    } else {
      setOrden("ascendente");
    }
  }

  function handlePlay(nextSquares) {
    const nextHistory = history.slice(0, currentMove + 1);
    nextHistory.push(nextSquares);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      description = `Ir hacia la jugada # ${move} en la posición (${squares.coordinates.row},${squares.coordinates.col})`;
    } else {
      description = "Ir al inicio del juego";
    }

    let element = <button onClick={() => jumpTo(move)}>{description}</button>;
    if (move === currentMove) {
      element = <span>{"Estás en el movimiento # " + currentMove}</span>;
    }
    return <li key={move}>{element}</li>;
  });

  if (orden === "descendente") {
    moves.reverse();
  }
  
 
useEffect(()=>{
  Winner.findAll()
  .then((winner)=>{
    setwinner(winner)

  })
  .catch((error)=>{

    console.error("Error al obtener los ganadores",error);
  });
  

},[]);
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={handleSortMoves}>{orden === "ascendente" ? "Ordenar Descendentemente" : "Ordenar Ascendentemente"}</button>
        <ol>{moves}</ol>
      </div>
       <div>
        <WinnersBoard data={winner} />
       </div>
    </div>
  );

  



}
