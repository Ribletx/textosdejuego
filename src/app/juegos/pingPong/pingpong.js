"use client";
import React, { useRef, useEffect, useState } from "react";

const PingPongGame = ({ gameMode }) => {
  const canvasRef = useRef(null);
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Variables del juego
    const paddleWidth = 10;
    const paddleHeight = 100;
    const ballRadius = 10;

    // Haciendo la pelota más lenta y las palas más rápidas
    const paddleSpeed = 8; // Aumentamos la velocidad de las palas
    const ballSpeed = 3; // Reducimos la velocidad de la pelota

    let leftPaddleY = (canvas.height - paddleHeight) / 2;
    let rightPaddleY = (canvas.height - paddleHeight) / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballDX = ballSpeed;
    let ballDY = ballSpeed;

    // Variables para controlar las direcciones de las palas
    let leftPaddleDirection = 0; // 1: hacia abajo, -1: hacia arriba
    let rightPaddleDirection = 0; // 1: hacia abajo, -1: hacia arriba

    const draw = () => {
      // Establecer el color de fondo del juego
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dibujar palas en blanco
      ctx.fillStyle = "white";
      ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
      ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

      // Dibujar la bola
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      // Dibujar marcador
      ctx.font = "30px Arial";
      ctx.fillText(leftScore, canvas.width / 4, 30);
      ctx.fillText(rightScore, (3 * canvas.width) / 4, 30);
    };

    const update = () => {
      // Mover la bola
      ballX += ballDX;
      ballY += ballDY;

      // Rebote en las paredes superior e inferior
      if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballDY *= -1;
      }

      // Rebote en las palas
      if (
        (ballX - ballRadius < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) ||
        (ballX + ballRadius > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight)
      ) {
        ballDX *= -1;
        // Aumenta la velocidad de la bola después de cada rebote
        const speedIncreaseFactor = 1.1;
        ballDX *= speedIncreaseFactor;
        ballDY *= speedIncreaseFactor;
      }

      // Comprobar si alguien anotó
      if (ballX < 0) {
        setRightScore(rightScore + 1);
        resetBall();
      } else if (ballX > canvas.width) {
        setLeftScore(leftScore + 1);
        resetBall();
      }

      // Modo 1 jugador: IA para el jugador 2
      if (gameMode === "1-player") {
        if (ballY < rightPaddleY + paddleHeight / 2) {
          rightPaddleY -= paddleSpeed; // IA sube
        } else if (ballY > rightPaddleY + paddleHeight / 2) {
          rightPaddleY += paddleSpeed; // IA baja
        }
      }

      // Movimiento de las palas basado en las direcciones
      if (leftPaddleDirection === 1 && leftPaddleY + paddleHeight < canvas.height) {
        leftPaddleY += paddleSpeed;
      } else if (leftPaddleDirection === -1 && leftPaddleY > 0) {
        leftPaddleY -= paddleSpeed;
      }

      if (rightPaddleDirection === 1 && rightPaddleY + paddleHeight < canvas.height) {
        rightPaddleY += paddleSpeed;
      } else if (rightPaddleDirection === -1 && rightPaddleY > 0) {
        rightPaddleY -= paddleSpeed;
      }

      draw();
      requestAnimationFrame(update); // Llamada continua para animación fluida
    };

    const resetBall = () => {
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      ballDX = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
      ballDY = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
    };

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          rightPaddleDirection = -1; // Mover hacia arriba
          break;
        case "ArrowDown":
          rightPaddleDirection = 1; // Mover hacia abajo
          break;
        case "w":
          leftPaddleDirection = -1; // Mover hacia arriba
          break;
        case "s":
          leftPaddleDirection = 1; // Mover hacia abajo
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key) {
        case "ArrowUp":
        case "ArrowDown":
          rightPaddleDirection = 0; // Detener el movimiento de la pala derecha
          break;
        case "w":
        case "s":
          leftPaddleDirection = 0; // Detener el movimiento de la pala izquierda
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Iniciar el ciclo de animación
    requestAnimationFrame(update);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [rightScore, leftScore, gameMode]);

  return (
    <div className="flex flex-col items-center aspect-auto">
      <h1 className="text-2xl mb-4 text-white">Juego de Ping Pong</h1>
      <canvas ref={canvasRef} width={800} height={400} className="border border-blue-600"></canvas>
    </div>
  );
};

export default PingPongGame;
