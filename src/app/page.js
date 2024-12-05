"use client";

import { useLanguage } from './context/LanguageContext'; // Ajusta la ruta para importar el contexto de idioma
import Header from './components/header';
import Footer from './components/footer';
import Link from "next/link";
import { useState, useEffect } from 'react';

export default function Home() {
  const { translations } = useLanguage(); // Obtener las traducciones del contexto
  const [isMounted, setIsMounted] = useState(false); // Estado para controlar la hidratación

  // Asegurarse de que el componente solo se renderice en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // No renderizar nada hasta que se haya montado el componente en el cliente

  return (
    <div 
      className="min-h-screen flex flex-col text-white bg-cover bg-center" 
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-8">
        <div className="bg-gray-700 bg-opacity-60 p-8 rounded-lg shadow-xl text-center w-full max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {translations.mainTitle} {/* Título traducido */}
          </h1>

          {/* Contenedor de los botones usando flex */}
          <div className="mt-6 flex flex-row justify-center space-x-6">
            {/* Botón para ir a la sección de Juegos */}
            <Link href="/juegos">
              <button className="bg-blue-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-md">
                {translations.gameButton} {/* Texto del botón traducido */}
              </button>
            </Link>

            {/* Botón para ir a la sección de Textos */}
            <Link href="/textos">
              <button className="bg-red-500 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-md">
                {translations.textButton} {/* Texto del botón traducido */}
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
