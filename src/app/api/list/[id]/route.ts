import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Esta función DELETE permite eliminar una película de la lista de favoritos del usuario.
export async function DELETE(request: Request) {
    // Extrae el ID de la película de la URL. Obtiene el último segmento de la URL.
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    // Verifica si el ID está presente; si falta, responde con un error 400 indicando que es necesario.
    if (!id) {
        return NextResponse.json({ message: 'Movie ID is required' }, { status: 400 });
    }

    try {
        // Accede a las cookies de la solicitud.
        const cookieStore = cookies();
        // Extrae el token de autenticación de la cookie 'token' si está disponible.
        const token = (await cookieStore).get('token')?.value;

        // Verifica si el token está presente; si no, responde con un error 401 (no autorizado).
        if (!token) {
            return NextResponse.json({ message: 'Authentication token is missing' }, { status: 401 });
        }

        // Realiza una solicitud DELETE a la API externa para eliminar la película de la lista del usuario.
        const res = await fetch(`https://kata.conducerevel.com/films/user/list/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, // Usa el token de autenticación en la cabecera.
            },
        });

        // Si la respuesta de la API externa no es exitosa, devuelve un mensaje de error con el estado recibido.
        if (!res.ok) {
            return NextResponse.json({ message: `Error removing movie from list: ${res.status}` }, { status: res.status });
        }

        // Si la eliminación fue exitosa, responde con un mensaje de confirmación y estado 200.
        return NextResponse.json({ message: 'Movie removed from list' }, { status: 200 });
    } catch (error) {
        // Captura cualquier error inesperado durante el proceso, lo registra en la consola.
        console.error('Error removing movie from list:', error);
        // Responde con un mensaje de error genérico y estado 500 indicando un problema interno del servidor.
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}