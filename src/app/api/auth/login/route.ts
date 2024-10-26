import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { email, password } = await request.json();

    const res = await fetch('https://kata.conducerevel.com/films/auth/sign-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    const response = NextResponse.json(data);
    response.cookies.set('token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
        path: '/'
    });

    return response;
}
