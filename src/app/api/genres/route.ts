import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Esta función GET obtiene la lista de géneros desde una API externa.
export async function GET() {
    try {
        // Obtiene el objeto de cookies desde la solicitud actual.
        const cookieStore = cookies();
        // Extrae el token de autenticación desde la cookie 'token' si está presente.
        const token = (await cookieStore).get('token')?.value;

        // Realiza una solicitud GET a la API externa para obtener la lista de géneros.
        const res = await fetch('https://kata.conducerevel.com/films/genres', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Incluye el token en la cabecera de autorización.
                'Content-Type': 'application/json'
            },
        });

        // Verifica si la solicitud a la API externa fue exitosa.
        if (!res.ok) {
            // Si la respuesta no es exitosa, retorna un mensaje de error con el código de estado recibido.
            return NextResponse.json({ message: 'Error fetching genres' }, { status: res.status });
        }

        // Si la solicitud es exitosa, convierte la respuesta a JSON.
        const data = await res.json();
        // Envía los datos obtenidos de la API externa como respuesta.
        return NextResponse.json(data);
    } catch (error) {
        // Si ocurre un error durante el proceso, devuelve un mensaje de error con el código de estado 500.
        return NextResponse.json({ message: 'Error fetching genres', error }, { status: 500 });
    }
}
