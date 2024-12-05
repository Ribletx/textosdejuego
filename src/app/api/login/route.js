import connectDB from '../../../config/db'; // Importar la conexión a la base de datos
import User from '../../../models/User'; // Importamos el modelo User
import bcrypt from 'bcryptjs';

export async function POST(req) {
    const { username, password } = await req.json();

    if (!username || !password) {
        return new Response(
            JSON.stringify({ message: "Por favor, complete todos los campos." }),
            { status: 400 }
        );
    }

    try {
        // Conectarse a la base de datos de MongoDB
        await connectDB(); // Usamos tu función para conectar a la base de datos

        // Buscar al usuario
        const user = await User.findOne({ username });

        if (!user) {
            return new Response(
                JSON.stringify({ message: "Usuario o contraseña incorrectos." }),
                { status: 401 }
            );
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return new Response(
                JSON.stringify({ message: "Usuario o contraseña incorrectos." }),
                { status: 401 }
            );
        }

        return new Response(
            JSON.stringify({ message: "Inicio de sesión exitoso." }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return new Response(
            JSON.stringify({ message: "Error al procesar la solicitud." }),
            { status: 500 }
        );
    }
}
