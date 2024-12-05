import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,  // Aumenta el tiempo de selección de servidor
            retryWrites: true,
            retryReads: true,
            connectTimeoutMS: 10000,  // Aumenta el tiempo máximo de conexión
        });
        console.log('Conectado a MongoDB');

        mongoose.connection.on('error', (err) => {
            console.error('Error de conexión MongoDB:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Desconectado de MongoDB');
            // Opcional: Intentar reconectar
            setTimeout(connectDB, 5000);
        });
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        // Opcional: Intentar reconectar
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;