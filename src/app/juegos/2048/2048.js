"use client";
import React, { useState, useEffect } from "react";

// Generar un tablero vacío
function generateEmptyBoard() {
  const board = [];
  for (let i = 0; i < 4; i++) {
    board.push([0, 0, 0, 0]);
  }
  return board;
}

// Generar una ficha aleatoria
function generateRandomTile(board) {
  const emptyTiles = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === 0) {
        emptyTiles.push([row, col]);
      }
    }
  }
  if (emptyTiles.length > 0) {
    const [row, col] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    board[row][col] = Math.random() < 0.9 ? 2 : 4; // Elige entre 2 o 4
  }
  return board;
}

const Game2048 = () => {
  const [board, setBoard] = useState(generateEmptyBoard());
  const [gameOver, setGameOver] = useState(false);

  // Función para mover las fichas hacia arriba, abajo, izquierda o derecha
  const slide = (line) => {
    let newLine = line.filter((tile) => tile !== 0); // Comprimir las fichas
    for (let i = 0; i < newLine.length - 1; i++) {
      if (newLine[i] === newLine[i + 1]) {
        newLine[i] *= 2; // Fusionar las fichas
        newLine.splice(i + 1, 1);
      }
    }
    while (newLine.length < 4) {
      newLine.push(0); // Llenar con ceros
    }
    return newLine;
  };

  const move = (direction) => {
    const newBoard = [...board];
    let moved = false;

    // Mover hacia arriba o abajo (columnas)
    if (direction === "up" || direction === "down") {
      for (let col = 0; col < 4; col++) {
        let column = [board[0][col], board[1][col], board[2][col], board[3][col]];
        column = direction === "up" ? slide(column) : slide(column.reverse()).reverse();
        for (let row = 0; row < 4; row++) {
          if (newBoard[row][col] !== column[row]) {
            moved = true;
          }
          newBoard[row][col] = column[row];
        }
      }
    }

    // Mover hacia la izquierda o derecha (filas)
    else if (direction === "left" || direction === "right") {
      for (let row = 0; row < 4; row++) {
        let rowData = board[row];
        rowData = direction === "left" ? slide(rowData) : slide(rowData.reverse()).reverse();
        if (JSON.stringify(newBoard[row]) !== JSON.stringify(rowData)) {
          moved = true;
        }
        newBoard[row] = rowData;
      }
    }

    if (moved) {
      const newBoardWithTile = generateRandomTile(newBoard);
      setBoard(newBoardWithTile);
    }
  };

  const handleKeyDown = (e) => {
    if (gameOver) return;

    // Mostrar alerta para verificar si la tecla es detectada
    console.log(`Tecla presionada: ${e.key}`);

    switch (e.key) {
      case "ArrowUp":
        move("up");
        break;
      case "ArrowDown":
        move("down");
        break;
      case "ArrowLeft":
        move("left");
        break;
      case "ArrowRight":
        move("right");
        break;
      default:
        break;
    }
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="flex">
        {row.map((tile, colIndex) => (
          <div
            key={colIndex}
            className={`w-16 h-16 flex items-center justify-center border-2 ${
              tile !== 0 ? "bg-yellow-500 text-white" : "bg-gray-300"
            }`}
          >
            {tile !== 0 ? tile : ""}
          </div>
        ))}
      </div>
    ));
  };

  useEffect(() => {
    // Asegúrate de agregar las dos primeras fichas aleatorias al iniciar el juego
    setBoard(generateRandomTile(generateRandomTile(generateEmptyBoard())));

    // Asegúrate de capturar las teclas de dirección
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Este efecto solo se ejecuta una vez al montar el componente

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl mb-4 text-white">Juego 2048</h1>
      <div className="mb-4">{renderBoard()}</div>
      <button
        className="bg-red-500 text-white p-2 rounded"
        onClick={() => setBoard(generateRandomTile(generateRandomTile(generateEmptyBoard())))}
      >
        Reiniciar Juego
      </button>
    </div>
  );
};

export default Game2048;
