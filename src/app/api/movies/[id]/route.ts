import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ message: 'Movie ID is required' }, { status: 400 });
  }

  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Authentication token is missing' }, { status: 401 });
    }

    const res = await fetch(`https://kata.conducerevel.com/films/movies/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ message: `Error fetching movie data: ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
