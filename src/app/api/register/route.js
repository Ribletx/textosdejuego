// src/app/api/register/route.js
import bcrypt from 'bcryptjs';
import User from '../../../models/User'; // Importamos el modelo User
import connectDB from '../../../config/db'; // Importamos la función para conectar con la base de datos

// Conectar a la base de datos al iniciar la petición
connectDB();

export async function POST(req) {
    const { username, password } = await req.json();

    // Validación
    if (!username || !password) {
        return new Response(JSON.stringify({ message: 'Por favor, complete todos los campos.' }), {
            status: 400,
        });
    }

    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return new Response(JSON.stringify({ message: 'El usuario ya existe.' }), {
            status: 400,
        });
    }

    // Crear un nuevo usuario con el hash de la contraseña
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        password: hashPass,
    });

    try {
        // Guardamos el nuevo usuario en la base de datos
        await newUser.save();
        return new Response(JSON.stringify({ message: 'Usuario creado con éxito.' }), {
            status: 200,
        });
    } catch (error) {
        console.error('Error al guardar el usuario:', error);
        return new Response(JSON.stringify({ message: 'Error al guardar el usuario.' }), {
            status: 500,
        });
    }
}
