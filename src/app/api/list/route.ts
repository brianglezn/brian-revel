import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id } = body;

        console.log("Received id:", id);

        if (!id) {
            return NextResponse.json({ message: 'Movie ID is required' }, { status: 400 });
        }

        const cookieStore = cookies();
        const token = (await cookieStore).get('token')?.value;

        if (!token) {
            return NextResponse.json({ message: 'Authentication token is missing' }, { status: 401 });
        }

        const res = await fetch('https://kata.conducerevel.com/films/user/list', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        if (!res.ok) {
            return NextResponse.json({ message: `Error adding movie to list: ${res.status}` }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error adding movie to list:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
