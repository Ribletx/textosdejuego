"use client";
import SnakeGame from './snake'; // El componente del juego

const SnakePage = () => {
  return (
    <div 
      className="min-h-screen flex flex-col bg-gray-800 overflow-hidden bg-cover bg-center bg-no-repeat" // Evita que la pantalla se desplace
      style={{ backgroundImage: "url('/fondo.png')" }} // Fondo personalizado
    >

      {/* Contenedor del juego */}
      <div className="flex-grow flex items-center justify-center overflow-hidden">
        <div className="w-full h-full max-w-4xl max-h-[80vh]">
          <SnakeGame /> {/* El componente de SnakeGame ahora está debajo del Header */}
        </div>
      </div>
    </div>
  );
};

export default SnakePage;
