import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get('token')?.value;

        const res = await fetch('https://kata.conducerevel.com/films/genres', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!res.ok) {
            return NextResponse.json({ message: 'Error fetching genres' }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching genres', error }, { status: 500 });
    }
}
