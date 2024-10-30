import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Este endpoint GET obtiene la información de una película identificada por su ID.
export async function GET(request: Request) {
  // Se extrae la URL del request para acceder al ID de la película desde el último segmento de la ruta
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  // Si no se encuentra un ID, se retorna una respuesta con error 400 indicando que es necesario un ID de película
  if (!id) {
    return NextResponse.json({ message: 'Movie ID is required' }, { status: 400 });
  }

  try {
    // Se obtiene acceso a las cookies almacenadas en el request
    const cookieStore = cookies();
    // Se extrae el token de autenticación almacenado en la cookie 'token'
    const token = (await cookieStore).get('token')?.value;

    // Verificación de la existencia del token; si no se encuentra, se devuelve un error 401 (no autorizado)
    if (!token) {
      return NextResponse.json({ message: 'Authentication token is missing' }, { status: 401 });
    }

    // Realiza una solicitud GET a la API externa para obtener la información de la película, usando el ID y el token de autenticación
    const res = await fetch(`https://kata.conducerevel.com/films/movies/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Autenticación con el token
      },
    });

    // Si la respuesta de la API externa no es exitosa, se retorna un mensaje con el estado de error recibido
    if (!res.ok) {
      return NextResponse.json({ message: `Error fetching movie data: ${res.status}` }, { status: res.status });
    }

    // Si la solicitud es exitosa, se convierte la respuesta a JSON para obtener los datos de la película
    const data = await res.json();
    // Retorna los datos de la película con un estado 200 (OK)
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Captura cualquier error inesperado y devuelve un mensaje genérico con estado 500
    console.error('Error fetching movie data:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}