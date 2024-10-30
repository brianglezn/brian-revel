import { NextResponse } from 'next/server';

// Función GET para manejar el cierre de sesión del usuario.
export async function GET() {
    // Creamos una respuesta JSON que indica que la operación fue exitosa.
    const response = NextResponse.json({ success: true });

    // Eliminamos la cookie 'token' del navegador, lo cual equivale a cerrar la sesión del usuario.
    response.cookies.delete('token');

    // Retornamos la respuesta al cliente.
    return response;
}
