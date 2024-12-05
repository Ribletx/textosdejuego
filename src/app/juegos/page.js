"use client";

import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/header';
import Footer from '../components/footer';
import Link from "next/link";

export default function Home() {
  const { translations } = useLanguage(); // Obtener las traducciones del contexto
  const [isClient, setIsClient] = useState(false);

  // Utilizamos useEffect para asegurarnos de que se ejecute solo en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Evitamos que se renderice el contenido en el servidor
  }

  return (
    <div 
      className="min-h-screen flex flex-col text-white bg-cover bg-center" 
      style={{ backgroundImage: "url('/mario.gif')" }}
    >
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-8">
        <div className="bg-gray-700 bg-opacity-90 p-8 my-5 rounded-lg shadow-xl text-center w-full max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {translations.mainGamseTitle} {/* Título traducido */}
          </h1>

          {/* Contenedor de los botones de los juegos */}
          <div className="mt-6 flex space-x-0 flex-col"> 
            {/* Botón para ir a la sección de Snake */}
            <Link href="/juegos/snake">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-md mb-5 w-full">
                {translations.playSnake}
              </button>
            </Link>

            <Link href="/juegos/space">
              <button className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-md mb-5 w-full">
                {translations.playSpace}
              </button>
            </Link>

            <Link href="/juegos/flapyBird">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-md mb-5 w-full">
                {translations.playFlapy}
              </button>
            </Link>

            <Link href="/juegos/pingPong">
              <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-md mb-5 w-full">
                {translations.playPingPong}
              </button>
            </Link>

            <Link href="/juegos/2048">
              <button className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-md mb-5 w-full">
                2048
              </button>
            </Link>

            <Link href="/juegos/memorice">
              <button className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-md mb-5 w-full">
                {translations.playMemorice}
              </button>
            </Link>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
