import { NextResponse } from 'next/server';

// Función POST para manejar el inicio de sesión del usuario.
export async function POST(request: Request) {
    // Extraemos el email y la contraseña enviados en el cuerpo de la solicitud.
    const { email, password } = await request.json();

    // Enviamos una solicitud POST a la API externa para autenticar al usuario.
    const res = await fetch('https://kata.conducerevel.com/films/auth/sign-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Indica que el contenido de la solicitud es JSON.
        },
        body: JSON.stringify({ email, password }) // Convierte el email y la contraseña a JSON para enviarlo en el cuerpo de la solicitud.
    });

    // Almacenamos la respuesta de la API en formato JSON.
    const data = await res.json();

    // Creamos una respuesta JSON que contiene los datos recibidos de la API.
    const response = NextResponse.json(data);

    // Configuramos una cookie llamada 'token' con el token de autenticación recibido en la respuesta de la API.
    response.cookies.set('token', data.token, {
        httpOnly: true, // Solo accesible desde el servidor, evitando acceso desde JavaScript en el cliente.
        secure: process.env.NODE_ENV === 'production', // Solo se envía en conexiones HTTPS en producción.
        sameSite: 'lax', // Limita el envío de la cookie a solicitudes del mismo sitio (protege contra ataques CSRF).
        maxAge: 60 * 60 * 24, // Tiempo de expiración de la cookie (1 día).
        path: '/' // La cookie está disponible para toda la aplicación.
    });

    // Retornamos la respuesta, que incluye tanto los datos recibidos de la API como la cookie de autenticación.
    return response;
}
