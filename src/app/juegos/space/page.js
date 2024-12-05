"use client";

import { useRouter } from "next/navigation";
import SpaceInvadersGame from "./space";

export default function SpacePage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="flex flex-col items-start mr-8 max-w-md">
        {/* Contenedor para el título, botón y cuento */}
        <h1 className="text-2xl mb-4">Space Invaders</h1>
        <button
          onClick={handleBack}
          className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 mb-4"
        >
          Volver
        </button>

        {/* Cuento */}
        <div className="bg-gray-800 p-4 rounded-lg mt-4">
          <h2 className="text-lg font-semibold mb-2">El cuento del Universo</h2>
          <p className="text-sm leading-relaxed">
            Había una vez en un rincón muy lejano del universo, una pequeña nave
            espacial que exploraba galaxias. Su misión era buscar nuevos planetas 
            y descubrir civilizaciones antiguas. A bordo, un valiente astronauta 
            soñaba con hallar el planeta perfecto, donde las estrellas bailaban 
            al compás del viento solar y los planetas brillaban con una luz dorada...
            <br /><br />
            ...un día, entre cometas y nebulosas, descubrió algo increíble...
          </p>
        </div>
      </div>

      {/* Componente del juego alineado a la derecha */}
      <div className="flex justify-center">
        <SpaceInvadersGame />
      </div>
    </div>
  );
}
