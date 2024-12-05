"use client";
import FlappyBirdGame from './flapyBird';
import { useRouter } from 'next/navigation';

const FlappyBirdPage = () => {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col bg-blue-600 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      <button
        onClick={() => router.back()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-4 left-4 z-10"
      >
        Regresar
      </button>

      <div className="flex-grow flex items-center justify-center overflow-hidden">
        <div className="w-full h-full max-w-md max-h-[75vh]">
          <FlappyBirdGame />
        </div>
      </div>
    </div>
  );
};

export default FlappyBirdPage;
