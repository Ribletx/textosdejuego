// src/app/api/score/route.js
import { NextResponse } from 'next/server';

// Datos simulados (puedes reemplazar esto con una base de datos real)
let users = [
  {
    id: 1,
    username: 'ignacio',
    flappypoints: 0,
  },
  // Puedes agregar más usuarios aquí
];

// Obtener la puntuación máxima de un usuario específico
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  const user = users.find((user) => user.username === username);

  if (user) {
    return NextResponse.json({ flappypoints: user.flappypoints });
  } else {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  }
}

// Actualizar la puntuación máxima de un usuario
export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const { newScore } = await request.json();

  const user = users.find((user) => user.username === username);

  if (user) {
    if (newScore > user.flappypoints) {
      user.flappypoints = newScore;
      return NextResponse.json({ message: 'Puntuación actualizada', flappypoints: user.flappypoints });
    } else {
      return NextResponse.json({ message: 'La puntuación no es mayor, no se actualizó' });
    }
  } else {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  }
}
