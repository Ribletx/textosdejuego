import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext'; // Importamos el hook del contexto

export default function Footer() {
  const { translations } = useLanguage(); // Usamos el contexto para acceder a las traducciones

  // Comprobamos si translations y translations.footerText están disponibles
  const footerText = translations?.footerText || "© {year} Nuestro Footer xd like si lees esto. Todos los derechos reservados.";

  return (
    <footer className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white py-6 flex flex-col items-center justify-center">
      <div className="flex gap-6 mb-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
          <FaFacebook size={24} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
          <FaTwitter size={24} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400">
          <FaInstagram size={24} />
        </a>
      </div>
      <p className="text-gray-400 text-sm">
        {/* Reemplazamos {year} con el año actual */}
        {footerText.replace("{year}", new Date().getFullYear())}
      </p>
    </footer>
  );
}
