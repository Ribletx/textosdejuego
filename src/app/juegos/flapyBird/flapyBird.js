"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';


const FlappyBirdGame = () => {
  const { translations } = useLanguage();
  const canvasRef = useRef(null);
  const [birdY, setBirdY] = useState(200);
  const [velocity, setVelocity] = useState(0);
  const [gravity, setGravity] = useState(0.5);
  const [pipes, setPipes] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const generatePipe = () => {
    const gap = 80;
    const pipeWidth = 40;
    const pipeHeight = Math.floor(Math.random() * (canvasRef.current.height - gap));

    return {
      x: canvasRef.current.width,
      y: pipeHeight,
      gap: gap,
      width: pipeWidth,
    };
  };

  const gameLoop = () => {
    if (gameOver || !gameStarted) return;

    setVelocity((prevVelocity) => prevVelocity + gravity);
    setBirdY((prevBirdY) => prevBirdY + velocity);

    setPipes((prevPipes) => {
      const updatedPipes = prevPipes.map((pipe) => ({
        ...pipe,
        x: pipe.x - 2,
      }));

      if (updatedPipes[0].x < -updatedPipes[0].width) {
        updatedPipes.shift();
        updatedPipes.push(generatePipe());
        setScore((prevScore) => prevScore + 1);
      }

      return updatedPipes;
    });

    pipes.forEach((pipe) => {
      if (
        (birdY < pipe.y || birdY + 20 > pipe.y + pipe.gap) && 
        pipe.x < 50 &&
        pipe.x + pipe.width > 0
      ) {
        setGameOver(true);
      }
    });

    if (birdY > canvasRef.current.height || birdY < 0) {
      setGameOver(true);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "yellow";
      ctx.fillRect(50, birdY, 20, 20); // Dibuja el pájaro

      pipes.forEach((pipe) => {
        ctx.fillStyle = "green";
        // Dibuja las tuberías en forma de T
        const trunkHeight = pipe.y; // La parte vertical (tronco) de la tubería
        const baseHeight = 20; // Altura de la base de la T

        // Tronco de la tubería (parte central)
        ctx.fillRect(pipe.x, 0, pipe.width, trunkHeight); // Parte superior del tronco
        ctx.fillRect(pipe.x, pipe.y + pipe.gap, pipe.width, canvas.height - pipe.y - pipe.gap); // Parte inferior del tronco

        // Bases de la T (rectángulos horizontales)
        const baseWidth = 60; // Ancho de las bases (más anchas que el tronco)
        ctx.fillRect(pipe.x - (baseWidth - pipe.width) / 2, trunkHeight - baseHeight, baseWidth, baseHeight); // Base superior
        ctx.fillRect(pipe.x - (baseWidth - pipe.width) / 2, pipe.y + pipe.gap, baseWidth, baseHeight); // Base inferior
      });
    };

    draw();
  }, [birdY, pipes]);

  useEffect(() => {
    const gameInterval = setInterval(gameLoop, 20);

    if (pipes.length === 0) {
      setPipes([generatePipe()]);
    }

    return () => clearInterval(gameInterval);
  }, [birdY, gameOver, pipes, gameStarted]);

  const handleJump = () => {
    if (!gameOver && gameStarted) {
      setVelocity(-6);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        handleJump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, gameStarted]);

  const restartGame = () => {
    setBirdY(200);
    setVelocity(0);
    setPipes([generatePipe()]);
    setScore(0);
    setGameOver(false);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-2xl mb-2">{translations.flappyBirdTitle || "Flappy Bird"}</h1>
      <canvas ref={canvasRef} width={250} height={400} className="border border-white mb-4 bg-blue-400"></canvas>
      <div className="text-center  bg-black bg-opacity-60 p-8 rounded-xl">
        <h2 className="text-lg text-white">{translations.scoreLabel || "Puntuación:"} {score}</h2>
        {gameOver && (
          <>
            <h2 className="text-lg text-red-500 mt-2">{translations.gameOver || "Game Over"}</h2>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg mt-2 " onClick={restartGame}>
              {translations.restartButton || "Reiniciar"}
            </button>
          </>
        )}
        {!gameStarted && !gameOver && (
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg mt-2" onClick={startGame}>
            {translations.startButton || "Comenzar Juego"}
          </button>
        )}
      </div>
    </div>
  );
};

export default FlappyBirdGame;
