'use client'

import { useMemo, useState } from 'react';
import styles from './HomeGenres.module.css';
import Carousel from '@/components/ui/Carousel';
import Thumbnail from '@/components/ui/Thumbnail';
import { Genre, Movie } from '@/app/types';

interface HomeGenresProps {
    genres: Genre[];
    availableMovies: Movie[];
}

export default function HomeGenres({ genres, availableMovies }: HomeGenresProps) {
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

    const genreMap = useMemo(
        () =>
            genres.reduce((acc, genre) => {
                acc[genre.id] = genre.name;
                return acc;
            }, {} as Record<string, string>),
        [genres]
    );

    const moviesByGenre = useMemo(() => {
        const filteredMovies = selectedGenre
            ? availableMovies.filter((movie) => movie.genre === selectedGenre)
            : availableMovies;

        return filteredMovies.reduce((acc, movie) => {
            const genreName = genreMap[movie.genre] || 'Unknown';
            if (!acc[genreName]) acc[genreName] = [];
            acc[genreName].push(movie);
            return acc;
        }, {} as Record<string, Movie[]>);
    }, [availableMovies, genreMap, selectedGenre]);

    return (
        <section className={styles.genres}>
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
