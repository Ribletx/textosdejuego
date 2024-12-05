"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa el hook useRouter
import PingPongGame from './pingpong'; // Componente del juego

const PingPongPage = () => {
  const [gameMode, setGameMode] = useState(null); // null, "1-player" or "2-player"
  const router = useRouter(); // Obtén el router

  const handleGameMode = (mode) => {
    setGameMode(mode);
  };

  const handleGoBack = () => {
    if (gameMode === null) {
      // Si estamos en el selector de jugadores, regresa a la página anterior
      router.back(); // Vuelve a la página anterior en el historial
    } else {
      // Si estamos en el juego, vuelve al selector de jugadores
      setGameMode(null);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col bg-gray-800 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      <button 
        onClick={handleGoBack} 
        className="absolute top-4 left-4 bg-blue-500 p-4 text-xl rounded-lg"
      >
        Regresar
      </button>

      {gameMode === null ? (
        <div className="flex-grow flex items-center justify-center text-white">
          <div className="text-center bg-gray-700 bg-opacity-60 rounded-xl p-8">
            <h1 className="text-3xl mb-4 text-white ">Seleccione el modo de juego</h1>
            <button
              onClick={() => handleGameMode('1-player')}
              className="bg-blue-500 p-4 px-7 text-xl rounded-lg mb-4"
            >
              1 Jugador
            </button>
            <br />
            <button
              onClick={() => handleGameMode('2-player')}
              className="bg-blue-500 p-4 text-xl rounded-lg"
            >
              2 Jugadores
            </button>
          </div>
        </div>
      ) : (
        <PingPongGame gameMode={gameMode} /> // Pasa el modo de juego al componente del juego
      )}
    </div>
  );
};

export default PingPongPage;
