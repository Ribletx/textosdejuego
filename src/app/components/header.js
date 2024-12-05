import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

export default function Header() {
  const { translations, changeLanguage } = useLanguage();
  const [username, setUsername] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para manejar el menú de idiomas
  const [selectedLanguage, setSelectedLanguage] = useState('es'); // Idioma seleccionado por defecto
  const [showCredentialCard, setShowCredentialCard] = useState(false); // Estado para la tarjeta de credencial

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Cargar el idioma desde localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
      changeLanguage(savedLanguage); // Cambiar idioma en el contexto
    }

    // Mostrar la tarjeta de credencial después de 5 segundos
    const timer = setTimeout(() => {
      setShowCredentialCard(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername(null);
    setShowCredentialCard(false); // Ocultar tarjeta al cerrar sesión
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    changeLanguage(language); // Cambia el idioma en el contexto
    localStorage.setItem('language', language); // Guardar idioma en localStorage
    setIsMenuOpen(false); // Cierra el menú después de seleccionar el idioma
  };

  return (
    <header className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white p-4 flex flex-col sm:flex-row items-center justify-between shadow-lg">
      <div className="flex items-center space-x-4">
        {/* Botón de casa para regresar a la página principal */}
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition-all duration-300">
            <FaHome className="text-xl" /> {/* Ícono de casa */}
          </button>
        </Link>

        {/* Menú desplegable con el idioma */}
        <div className="relative z-10">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center text-white px-4 py-2 rounded hover:bg-gray-800 transition-all duration-300"
          >
            {selectedLanguage === 'es' ? 'Español' : 'English'}
            <span className="ml-2">{isMenuOpen ? '▲' : '▼'}</span>
          </button>

          {/* Menú desplegable con los idiomas */}
          {isMenuOpen && (
            <div className="absolute bg-white text-black mt-2 rounded w-32 z-20">
              <button
                onClick={() => handleLanguageChange('es')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Español
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                English
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Título principal con ajuste de tamaño de fuente responsivo */}
      <h1 className="text-white text-center font-extrabold tracking-widest drop-shadow-lg text-2xl sm:text-3xl lg:text-4xl leading-tight">
        {translations.headerTitle}
      </h1>

      <div className="flex items-center space-x-4 mt-4 sm:mt-0">
        {username ? (
          <>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-lg inline-flex items-center space-x-3">
              <p className="text-base font-semibold">
                {translations.welcomeMessage.replace('{name}', username)}
              </p>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg text-sm font-semibold transition transform hover:scale-105"
              >
                {translations.logout}
              </button>
            </div>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg text-sm font-semibold transition transform hover:scale-105 whitespace-nowrap"
            >
              {translations.signIn}
            </Link>
            <Link
              href="/register"
              className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-lg text-sm font-semibold transition transform hover:scale-105 whitespace-nowrap"
            >
              {translations.register}
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
