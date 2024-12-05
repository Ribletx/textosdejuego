"use client";

import React, { useState } from "react";
import MemoriceGame from "./memorice";
import Link from "next/link";

const MemoricePage = () => {
  const [players, setPlayers] = useState(1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-cover bg-center" style={{ backgroundImage: "url('/fondo.png')" }}>
      <h1 className="text-4xl mb-4">Memorice Game</h1>
      
      {/* Botón de regreso con Link */}
      <Link href="/juegos" passHref>
        <button 
          className="absolute top-4 left-4 bg-blue-500 p-4 text-xl rounded-lg"
        >
          Regresar
        </button>
      </Link>
      
      <div className="mb-4">
        <button
          onClick={() => setPlayers(1)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-md"
        >
          1 Player
        </button>
        <button
          onClick={() => setPlayers(2)}
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-md ml-4"
        >
          2 Players
        </button>
      </div>
      
      <MemoriceGame players={players} />
    </div>
  );
};

export default MemoricePage;
