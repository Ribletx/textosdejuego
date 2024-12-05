"use client";

import Game2048 from "./2048";
import Link from "next/link"; // Importar Link para navegación

export default function Page2048() {
  return (
    <div className="min-h-screen flex flex-col text-white bg-cover bg-center" style={{ backgroundImage: "url('/fondo.png')" }}>
      
      {/* Botón de regresar a la página anterior */}
      <Link href="/juegos" passHref>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-md absolute top-4 left-4">
          Regresar
        </button>
      </Link>

      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-8">
        <div className="bg-gray-700 bg-opacity-60 p-8 rounded-lg shadow-xl text-center w-full max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">2048</h1>
          <Game2048 />
        </div>
      </main>
    </div>
  );
}
