import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Esta función POST permite añadir una película a la lista de favoritos del usuario.
export async function POST(request: Request) {
    try {
        // Se obtiene el cuerpo de la solicitud en formato JSON y se extrae el ID de la película.
        const body = await request.json();
        const { id } = body;

        // Verifica si se recibió el ID de la película. Si no, devuelve un error 400 indicando que el ID es requerido.
        if (!id) {
            return NextResponse.json({ message: 'Movie ID is required' }, { status: 400 });
        }

        // Accede a las cookies almacenadas en la solicitud.
        const cookieStore = cookies();
        // Extrae el token de autenticación de la cookie 'token'.
        const token = (await cookieStore).get('token')?.value;

        // Verifica la existencia del token de autenticación. Si no se encuentra, devuelve un error 401.
        if (!token) {
            return NextResponse.json({ message: 'Authentication token is missing' }, { status: 401 });
        }

        // Realiza una solicitud POST a la API externa para añadir la película a la lista del usuario.
        const res = await fetch('https://kata.conducerevel.com/films/user/list', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Se añade el token en la cabecera de autorización.
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }), // Se envía el ID de la película en el cuerpo de la solicitud.
        });

        // Verifica si la respuesta de la API es exitosa. Si no, devuelve un mensaje de error con el estado recibido.
        if (!res.ok) {
            return NextResponse.json({ message: `Error adding movie to list: ${res.status}` }, { status: res.status });
        }

        // Si la solicitud es exitosa, convierte la respuesta a JSON y devuelve los datos obtenidos con estado 200.
        const data = await res.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        // Captura cualquier error inesperado y muestra el error en consola.
        console.error('Error adding movie to list:', error);
        // Devuelve un mensaje de error genérico con estado 500 indicando un problema interno del servidor.
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
