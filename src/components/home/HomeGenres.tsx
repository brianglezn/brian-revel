'use client'

import { useMemo, useState } from 'react';
import styles from './HomeGenres.module.css';
import Carousel from '@/components/ui/Carousel';
import Thumbnail from '@/components/ui/Thumbnail';
import { Genre, Movie } from '@/app/types';

// Tipos de propiedades esperadas para el componente HomeGenres
interface HomeGenresProps {
    genres: Genre[];
    availableMovies: Movie[];
}

export default function HomeGenres({ genres, availableMovies }: HomeGenresProps) {
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

    // useMemo para crear un mapa de género donde cada ID se asocia con su nombre
    const genreMap = useMemo(
        () =>
            genres.reduce((acc, genre) => {
                // Acumula cada género con su ID como clave y nombre como valor
                acc[genre.id] = genre.name;
                return acc;
            }, {} as Record<string, string>),
        [genres]
    );

    // useMemo para obtener un listado de películas organizadas por género
    const moviesByGenre = useMemo(() => {
        // Filtra las películas según el género seleccionado, o muestra todas si no hay género seleccionado
        const filteredMovies = selectedGenre
            ? availableMovies.filter((movie) => movie.genre === selectedGenre)
            : availableMovies;

        // Organiza las películas filtradas en un objeto agrupado por el nombre del género
        return filteredMovies.reduce((acc, movie) => {
            // Obtiene el nombre del género correspondiente a la película
            const genreName = genreMap[movie.genre] || 'Unknown'; // Si no encuentra el género, usa 'Unknown' como nombre
            if (!acc[genreName]) acc[genreName] = []; // Si no existe el género en el acumulador, lo inicializa como array vacío
            acc[genreName].push(movie); // Agrega la película en el array correspondiente al género
            return acc;
        }, {} as Record<string, Movie[]>); // El acumulador es un objeto que organiza películas por género
    }, [availableMovies, genreMap, selectedGenre]);

    return (
        <section className={styles.genres} id='genres'>
            <Carousel>
                <ul className={styles.genreList}>
                    <li
                        onClick={() => setSelectedGenre(null)}
                        className={!selectedGenre ? styles.activeGenre : ''}
                    >
                        All
                    </li>
                    {genres.map((genre) => (
                        <li
                            key={genre.id}
                            onClick={() => setSelectedGenre(genre.id)}
                            className={selectedGenre === genre.id ? styles.activeGenre : ''}
                        >
                            {genre.name}
                        </li>
                    ))}
                </ul>
            </Carousel>

            {Object.keys(moviesByGenre).length > 0 ? (
                Object.entries(moviesByGenre).map(([genreName, genreMovies]) => (
                    <div key={genreName} className={styles.genre}>
                        <h2>{genreName}</h2>
                        <Carousel>
                            {genreMovies.map((movie) => (
                                <Thumbnail
                                    key={movie.id}
                                    thumbnail={movie.thumbnail}
                                    title={movie.title}
                                    rating={movie.rating}
                                    id={movie.id}
                                />
                            ))}
                        </Carousel>
                    </div>
                ))
            ) : (
                <></>
            )}
        </section>
    );
}
