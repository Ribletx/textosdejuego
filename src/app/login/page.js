"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Nueva importación

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [language, setLanguage] = useState("es"); // Estado para manejar el idioma
    const router = useRouter(); // Instancia de useRouter

    const handleLogin = async (e) => {
        e.preventDefault();
        setUsernameError(false);
        setPasswordError(false);
        setErrorMessage("");

        // Validación de campos vacíos
        if (!username || !password) {
            setErrorMessage(language === "es" ? "Por favor, complete todos los campos." : "Please fill in all fields.");
            return;
        }

        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            // Guardamos el nombre de usuario en el localStorage
            localStorage.setItem("username", username);
            router.push("/"); // Redirige a la página principal
        } else {
            const data = await res.json();
            setErrorMessage(data.message || (language === "es" ? 'Credenciales incorrectas.' : 'Incorrect credentials.'));
            if (data.message.includes("usuario")) {
                setUsernameError(true);
            }
            if (data.message.includes("contraseña")) {
                setPasswordError(true);
            }
        }
    };

    // Función para cambiar de idioma
    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === "es" ? "en" : "es"));
    };

    // Cadenas de texto dependiendo del idioma
    const texts = {
        es: {
            title: "Iniciar Sesión",
            username: "Usuario",
            password: "Contraseña",
            login: "Iniciar Sesión",
            errorMessage: errorMessage || 'Credenciales incorrectas.',
            backToHome: "Volver al inicio",
        },
        en: {
            title: "Login",
            username: "Username",
            password: "Password",
            login: "Login",
            errorMessage: errorMessage || 'Incorrect credentials.',
            backToHome: "Back to Home",
        }
    };

    return (
        <div className="bg-blue-100 min-h-screen flex flex-col items-center justify-center p-4 relative">
            {/* Botón de cambio de idioma */}
            <button
                onClick={toggleLanguage}
                className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                {language === "es" ? "Español" : "English"}
            </button>

            <h1 className="text-4xl font-bold mb-6">{texts[language].title}</h1>

            <div className="text-xl w-full max-w-xs">
                <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">{texts[language].username}</label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${usernameError ? 'border-red-500' : ''}`}
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
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${passwordError ? 'border-red-500' : ''}`}
                            id="password"
                            type="password"
                            placeholder={language === "es" ? "******************" : "************"}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errorMessage && <p className="text-red-500 text-xs italic">{texts[language].errorMessage}</p>}
                    </div>
                    <div className="flex items-center justify-center"> {/* Botón centrado */}
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            {texts[language].login}
                        </button>
                    </div>
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
