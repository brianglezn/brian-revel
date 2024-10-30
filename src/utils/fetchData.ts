// utils/fetchData.ts

import { Movie, Genre } from '@/app/types';
import { cookies } from 'next/headers';

const API_BASE_URL = 'https://kata.conducerevel.com/films';

// Función para obtener el token desde las cookies
async function getToken(): Promise<string | undefined> {
    const cookieStore = cookies();
    return (await cookieStore).get('token')?.value;
}

// Función para obtener la lista de películas
export async function fetchMovies(): Promise<Movie[]> {
    try {
        const token = await getToken();
        const res = await fetch(`${API_BASE_URL}/movies`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('fetchMovies response status:', res.status);
        if (!res.ok) throw new Error('Failed to fetch movies');
        const movies = await res.json();
        console.log('Fetched movies:', movies);
        return movies;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}

// Función para obtener una película por ID
export async function fetchMoviesById(id: string): Promise<Movie | null> {
    try {
        const token = await getToken();
        const res = await fetch(`${API_BASE_URL}/movies/${id}`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log(`fetchMoviesById response for ID ${id}:`, res.status);
        if (!res.ok) throw new Error(`Failed to fetch movie with ID: ${id}`);
        const movie = await res.json();
        console.log(`Fetched movie with ID ${id}:`, movie);
        return movie;
    } catch (error) {
        console.error(`Error fetching movie with ID ${id}:`, error);
        return null;
    }
}

// Función para obtener la lista de géneros
export async function fetchGenres(): Promise<Genre[]> {
    try {
        const token = await getToken();
        const res = await fetch(`${API_BASE_URL}/genres`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('fetchGenres response status:', res.status);
        if (!res.ok) throw new Error('Failed to fetch genres');
        const genres = await res.json();
        console.log('Fetched genres:', genres);
        return genres;
    } catch (error) {
        console.error('Error fetching genres:', error);
        return [];
    }
}

// Función para obtener un género por ID
export async function fetchGenresById(id: string): Promise<Genre | null> {
    try {
        const token = await getToken();
        const res = await fetch(`${API_BASE_URL}/genres/${id}`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log(`fetchGenresById response for ID ${id}:`, res.status);
        if (!res.ok) throw new Error(`Failed to fetch genre with ID: ${id}`);
        const genre = await res.json();
        console.log(`Fetched genre with ID ${id}:`, genre);
        return genre;
    } catch (error) {
        console.error(`Error fetching genre with ID ${id}:`, error);
        return null;
    }
}

// Función para obtener la lista de películas favoritas del usuario
export async function fetchFavorites(): Promise<Movie[]> {
    try {
        const token = await getToken();
        const favListRes = await fetch(`${API_BASE_URL}/user`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('fetchFavorites response status:', favListRes.status);
        if (!favListRes.ok) throw new Error('Failed to fetch favorites list');

        const favIds = await favListRes.json();
        console.log('Favorite movie IDs:', favIds);

        // Obtener detalles de cada película favorita
        const moviePromises = favIds.map((id: string) =>
            fetchMoviesById(id)
        );

        const moviesData = await Promise.all(moviePromises);
        console.log('Fetched favorite movies:', moviesData);
        return moviesData.filter((movie) => movie !== null) as Movie[];
    } catch (error) {
        console.error('Error fetching favorite movies:', error);
        return [];
    }
}
