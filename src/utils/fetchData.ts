import { Movie, Genre } from '@/app/types';

const API_BASE_URL = 'https://kata.conducerevel.com/films';

// Función para obtener la lista de películas
export async function fetchMovies(token: string): Promise<Movie[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/movies`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) throw new Error('Failed to fetch movies');
        const movies = await res.json();
        return movies;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}

// Función para obtener una película por ID
export async function fetchMoviesById(id: string, token: string): Promise<Movie | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/movies/${id}`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) throw new Error(`Failed to fetch movie with ID: ${id}`);
        const movie = await res.json();
        return movie;
    } catch (error) {
        console.error(`Error fetching movie with ID ${id}:`, error);
        return null;
    }
}

// Función para obtener la lista de géneros
export async function fetchGenres(token: string): Promise<Genre[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/genres`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) throw new Error('Failed to fetch genres');
        const genres = await res.json();
        return genres;
    } catch (error) {
        console.error('Error fetching genres:', error);
        return [];
    }
}

// Función para obtener la lista de películas favoritas del usuario
export async function fetchFavorites(token: string): Promise<Movie[]> {
    try {
        const favListRes = await fetch(`${API_BASE_URL}/user`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!favListRes.ok) throw new Error('Failed to fetch favorites list');

        const favIds = await favListRes.json();
        
        // Obtener detalles de cada película favorita
        const moviePromises = favIds.map((id: string) =>
            fetchMoviesById(id, token)
        );

        const moviesData = await Promise.all(moviePromises);
        return moviesData.filter((movie) => movie !== null) as Movie[];
    } catch (error) {
        console.error('Error fetching favorite movies:', error);
        return [];
    }
}
