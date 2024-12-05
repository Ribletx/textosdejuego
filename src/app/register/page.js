"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Nueva importación

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [language, setLanguage] = useState("es"); // Estado para manejar el idioma
    const router = useRouter(); // Instancia de useRouter

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(""); // Reseteamos el error al inicio del manejo
        setSuccess(""); // Reseteamos el mensaje de éxito

        // Validación de campos
        if (!username || !password) {
            setError("Por favor, complete todos los campos.");
            return;
        }

        const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        if (res.ok) {
            setSuccess(data.message);
            setUsername(""); // Reseteamos el campo de usuario
            setPassword(""); // Reseteamos el campo de contraseña
        } else {
            setError(data.message);
        }
    };

    // Función para cambiar de idioma
    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === "es" ? "en" : "es"));
    };

    // Cadenas de texto dependiendo del idioma
    const texts = {
        es: {
            title: "Registra tu Cuenta",
            username: "Usuario",
            password: "Contraseña",
            register: "Registrarse",
            backToHome: "Volver al inicio",
            error: error || "Por favor, complete todos los campos.",
        },
        en: {
            title: "Register your Account",
            username: "Username",
            password: "Password",
            register: "Register",
            backToHome: "Back to Home",
            error: error || "Please complete all fields.",
        }
    };

    return (
        <div className="bg-blue-100 min-h-screen flex flex-col items-center justify-center p-4 relative">
            {/* Botón de cambio de idioma */}
            <button
                onClick={toggleLanguage}
                className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                {language === "es" ? "English" : "Español"}
            </button>

            <h1 className="text-4xl font-bold mb-6">{texts[language].title}</h1>

            <div className="text-xl w-full max-w-xs">
                <form onSubmit={handleRegister} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">{texts[language].username}</label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
                            id="username"
                            type="text"
                            placeholder={texts[language].username}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">{texts[language].password}</label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
                            id="password"
                            type="password"
                            placeholder={language === "es" ? "******************" : "************"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <p className="text-red-500 text-xs italic">{error && !password ? "Por favor, elige una contraseña." : ""}</p>
                    </div>
                    <div className="flex items-center justify-center"> {/* Botón centrado */}
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            {texts[language].register}
                        </button>
                    </div>
                    {success && <p className="text-green-500 text-xs italic mt-2">{success}</p>}
                    {error && <p className="text-red-500 text-xs italic mt-2">{texts[language].error}</p>}
                </form>
            </div>

            {/* Botón Back to Home con estilo redondo */}
            <Link href="/" className="text-blue-600 hover:text-blue-800">
                <div className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 text-center">
                    {texts[language].backToHome}
                </div>
            </Link>
        </div>
    );
}
