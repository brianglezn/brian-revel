import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Endpoint GET para obtener la lista de películas
export async function GET() {
    try {
        // Obtiene el objeto para manipular cookies en la solicitud
        const cookieStore = cookies();

        // Extrae el token de autenticación almacenado en las cookies
        const token = (await cookieStore).get('token')?.value;

        // Realiza una petición GET a la API externa para obtener las películas
        const res = await fetch('https://kata.conducerevel.com/films/movies', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Incluye el token en el encabezado de autorización
                'Content-Type': 'application/json',
            },
        });

        // Verifica si la respuesta de la API no es exitosa
        if (!res.ok) {
            // Si no es exitosa, responde con un mensaje de error y el estado de la respuesta
            return NextResponse.json({ message: 'Error fetching movies' }, { status: res.status });
        }

        // Convierte la respuesta a formato JSON para extraer los datos de las películas
        const data = await res.json();

        // Devuelve los datos de las películas en formato JSON con un estado 200 (OK)
        return NextResponse.json(data);
    } catch (error) {
        // En caso de un error inesperado, devuelve un mensaje de error genérico con estado 500
        return NextResponse.json({ message: 'Error fetching movies', error }, { status: 500 });
    }
}