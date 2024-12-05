"use client"; // Añade esta línea para marcar el archivo como cliente

// a futuro quiero agregar que la puntuación del juego se vaya guardando según el usuario que este jugando
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext'; // Importamos el contexto de idioma

const SnakeGame = () => {
  const { translations } = useLanguage(); // Obtenemos las traducciones del contexto
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [canChangeDirection, setCanChangeDirection] = useState(true);
  const [appleCount, setAppleCount] = useState(0); // Contador de manzanas

  const generateFood = (snake, canvasWidth, canvasHeight) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * (canvasWidth)),
        y: Math.floor(Math.random() * (canvasHeight)),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let snake = [{ x: 10, y: 10 }];
    let direction = { x: 1, y: 0 }; // Movimiento inicial a la derecha
    const scale = 20;
    const canvasWidth = canvas.width / scale;
    const canvasHeight = canvas.height / scale;
    let food = generateFood(snake, canvasWidth, canvasHeight);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'red';
      ctx.fillRect(food.x * scale, food.y * scale, scale, scale);
      ctx.fillStyle = 'green';
      snake.forEach((segment) => {
        ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
      });
    };

    const checkCollision = (head) => {
      return snake.some(segment => segment.x === head.x && segment.y === head.y);
    };

    const update = () => {
      if (gameOver) return;

      const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y,
      };

      if (newHead.x < 0) newHead.x = canvasWidth - 1;
      else if (newHead.x >= canvasWidth) newHead.x = 0;
      else if (newHead.y < 0) newHead.y = canvasHeight - 1;
      else if (newHead.y >= canvasHeight) newHead.y = 0;

      if (checkCollision(newHead)) {
        setGameOver(true);
        return;
      }

      if (newHead.x === food.x && newHead.y === food.y) {
        snake.unshift(newHead);
        setAppleCount(prevCount => prevCount + 1); // Aumenta el contador de manzanas
        food = generateFood(snake, canvasWidth, canvasHeight); // Genera nueva comida
      } else {
        snake.unshift(newHead);
        snake.pop(); // Elimina la última parte de la serpiente
      }

      draw();
      setCanChangeDirection(true); // Permite cambiar de dirección después de actualizar la posición
    };

    const handleKeyDown = (event) => {
      if (!canChangeDirection) return;

      switch (event.key) {
        case 'ArrowUp':
          if (direction.y === 0) direction = { x: 0, y: -1 }; // Cambia dirección hacia arriba si no va hacia abajo
          break;
        case 'ArrowDown':
          if (direction.y === 0) direction = { x: 0, y: 1 }; // Cambia dirección hacia abajo si no va hacia arriba
          break;
        case 'ArrowLeft':
          if (direction.x === 0) direction = { x: -1, y: 0 }; // Cambia dirección hacia la izquierda si no va hacia la derecha
          break;
        case 'ArrowRight':
          if (direction.x === 0) direction = { x: 1, y: 0 }; // Cambia dirección hacia la derecha si no va hacia la izquierda
          break;
      }
      setCanChangeDirection(false); // Bloquea el cambio de dirección hasta que se actualice la posición
    };

    window.addEventListener('keydown', handleKeyDown);
    const interval = setInterval(update, 100);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameOver]); // Dependencias solo del estado del juego

  const restartGame = () => {
    setGameOver(false);
    setAppleCount(0); // Reinicia el contador de manzanas
    setCanChangeDirection(true); // Permite el cambio de dirección al reiniciar
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-800 to-gray-900 text-white items-center justify-center">
      <h1 className="text-4xl mb-4">{translations.snakeGameTitle || "Juego de Snake"}</h1>
      <canvas ref={canvasRef} width={400} height={400} className="border border-white"></canvas>
      <div className="flex flex-col items-center mt-4">
        <h2 className="text-xl">{translations.appleCountLabel || "Manzanas recolectadas:"} {appleCount}</h2> {/* Muestra el contador de manzanas */}
        {gameOver && (
          <>
            <h2 className="text-2xl text-red-500 mt-4">{translations.gameOver || "Game Over"}</h2>
            <div className="flex space-x-4 mt-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={restartGame}>
                {translations.restartButton || "Reiniciar"}
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => window.history.back()}>
                {translations.backButton || "Regresar"}
              </button>
            </div>
          </>
        )}
      </div>
      {!gameOver && (
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => window.history.back()}>
          {translations.backButton || "Regresar"}
        </button>
      )}
    </div>
  );
};

export default SnakeGame;
