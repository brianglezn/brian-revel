import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get('token')?.value;

        if (!token) {
            return NextResponse.json({ message: 'Authentication token is missing' }, { status: 401 });
        }

        const userRes = await fetch('https://kata.conducerevel.com/films/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!userRes.ok) {
            return NextResponse.json({ message: 'Failed to fetch user data' }, { status: userRes.status });
        }

        const userData = await userRes.json();

        return NextResponse.json(userData, { status: 200 });

    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
