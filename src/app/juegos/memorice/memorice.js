"use client";
import React, { useState, useEffect } from "react";

// Función para generar el tablero de cartas
function generateCards() {
  const cardValues = [
    "A", "B", "C", "D", "E", "F", "G", "H",
    "A", "B", "C", "D", "E", "F", "G", "H"
  ];
  const shuffledCards = cardValues.sort(() => Math.random() - 0.5);
  const cards = shuffledCards.map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false,
  }));
  return cards;
}

const MemoriceGame = () => {
  const [players, setPlayers] = useState(null); // Estado para el número de jugadores
  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(1);
  const [playerScores, setPlayerScores] = useState([0, 0]);
  const [gameOver, setGameOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // Controla si el juego está procesando un par

  const handleCardClick = (id) => {
    if (gameOver || isProcessing) return; // Si el juego ha terminado o estamos procesando un par, no hacer nada

    const newCards = [...cards];
    const clickedCard = newCards.find(card => card.id === id);

    // Si la carta ya está volteada o ya fue emparejada, no hacer nada
    if (clickedCard.isFlipped || clickedCard.isMatched) return;

    clickedCard.isFlipped = true;
    setFlippedCards([...flippedCards, clickedCard]);

    // Si se voltearon 2 cartas, verificar si son un par
    if (flippedCards.length === 1) {
      setIsProcessing(true); // Bloquea la selección de nuevas cartas mientras se procesa el par

      const [firstCard] = flippedCards;
      if (firstCard.value === clickedCard.value) {
        setPlayerScores(prevScores => {
          const newScores = [...prevScores];
          newScores[playerTurn - 1] += 1;
          return newScores;
        });
        setCards(newCards.map(card => card.value === firstCard.value || card.id === id ? { ...card, isMatched: true } : card));
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(newCards.map(card => card.id === firstCard.id || card.id === clickedCard.id ? { ...card, isFlipped: false } : card));
          setFlippedCards([]);
          setPlayerTurn(playerTurn === 1 ? 2 : 1); // Cambia de turno
          setIsProcessing(false); // Permite seleccionar nuevas cartas después del retraso
        }, 1000);
      }
    }

    // Verificar si el juego ha terminado
    if (newCards.every(card => card.isMatched)) {
      setGameOver(true);
    }
  };

  useEffect(() => {
    setCards(generateCards());
    setGameOver(false);
  }, [players]);

  const handleStartGame = (selectedPlayers) => {
    setPlayers(selectedPlayers);
  };

  if (players === null) {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-2xl mb-4">Choose Number of Players</h1>
        <button
          onClick={() => handleStartGame(1)}
          className="mb-4 p-2 bg-blue-500 text-white rounded"
        >
          1 Player
        </button>
        <button
          onClick={() => handleStartGame(2)}
          className="p-2 bg-blue-500 text-white rounded"
        >
          2 Players
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl mb-4">Memorice Game</h1>

      {/* Selección de jugadores y estado del juego */}
      {players === 2 && !gameOver && (
        <div className="mb-4">Player {playerTurn}'s Turn</div>
      )}
      {gameOver && (
        <div className="mb-4">
          Game Over! Player {playerScores[0] > playerScores[1] ? 1 : 2} wins!
        </div>
      )}

      {/* Mostrar las cartas */}
      <div className="grid grid-cols-4 gap-4">
        {cards.map(card => (
          <div
            key={card.id}
            className={`w-16 h-16 flex items-center justify-center border-2 cursor-pointer ${
              card.isFlipped || card.isMatched ? "bg-yellow-500 text-white" : "bg-gray-400"
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.isFlipped || card.isMatched ? card.value : ""}
          </div>
        ))}
      </div>

      {/* Botón de reinicio cuando el juego termine */}
      {gameOver && (
        <button
          onClick={() => window.location.reload()}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Restart Game
        </button>
      )}
    </div>
  );
};

export default MemoriceGame;
