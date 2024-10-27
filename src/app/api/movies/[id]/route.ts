import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get('token')?.value;

    console.log(`Fetching movie with ID: ${params.id}`);
    console.log(`Bearer ${token}`);

    const res = await fetch(`https://kata.conducerevel.com/films/movies/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error(`Error fetching movie: ${res.status}`);
      return NextResponse.json({ message: 'Error fetching movie' }, { status: res.status });
    }

    const data = await res.json();
    console.log('Movie data:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error during movie fetch:', error);
    return NextResponse.json({ message: 'Error fetching movie', error }, { status: 500 });
  }
}
