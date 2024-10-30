import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Endpoint GET para obtener los datos de las peliculas favoritas del usuario
export async function GET() {
    try {
        // Obtiene el objeto para acceder a las cookies
        const cookieStore = cookies();

        // Intenta obtener el token de autenticación desde las cookies
        const token = (await cookieStore).get('token')?.value;

        // Si no existe el token, devuelve un mensaje de error con código de estado 401 (No Autorizado)
        if (!token) {
            return NextResponse.json({ message: 'Authentication token is missing' }, { status: 401 });
        }

        // Realiza una solicitud a la API externa para obtener los datos del usuario
        const userRes = await fetch('https://kata.conducerevel.com/films/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Incluye el token en el encabezado de autorización
                'Content-Type': 'application/json',
            },
        });

        // Si la respuesta de la API no es exitosa, devuelve un mensaje de error con el estado correspondiente
        if (!userRes.ok) {
            return NextResponse.json({ message: 'Failed to fetch user data' }, { status: userRes.status });
        }

        // Si la solicitud fue exitosa, convierte la respuesta a JSON para obtener los datos del usuario
        const userData = await userRes.json();

        // Devuelve los datos del usuario en formato JSON con el código de estado 200 (OK)
        return NextResponse.json(userData, { status: 200 });

    } catch (error) {
        // Si ocurre un error inesperado, registra el error en la consola para depuración
        console.error('Error fetching user data:', error);

        // Devuelve un mensaje de error genérico con código de estado 500 (Error Interno del Servidor)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
