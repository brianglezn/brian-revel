'use client';

import { useEffect, useState } from 'react';
import styles from './MainMovie.module.css';
import { Movie } from '@/app/types';
import MainIndicator from '@/components/ui/MainIndicator';

export default function MainMovie() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
            const res = await fetch('/api/movies');
            const data: Movie[] = await res.json();

            const highlightedMovies = data.filter(movie => movie.highlighted === true);

            if (highlightedMovies.length > 0) {
                setMovies(highlightedMovies);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMovieIndex(prevIndex => (prevIndex + 1) % movies.length);
        }, 7000);

        return () => clearInterval(interval);
    }, [movies]);

    useEffect(() => {
        setAnimationKey(prevKey => prevKey + 1);
    }, [currentMovieIndex]);

    if (movies.length === 0) {
        return null;
    }

    const currentMovie = movies[currentMovieIndex];

    const truncateDescription = (description: string, maxLength: number) => {
        if (description.length > maxLength) {
            return description.slice(0, maxLength) + '...';
        }
        return description;
    };

    return (
        <div
            key={animationKey}
            className={`${styles.container} ${styles.animateBackgroundImage}`}
            style={{ backgroundImage: `url(${currentMovie.poster})` }}
        >
            <div className={styles.overlay}>
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>{currentMovie.title}</h1>
                    <p className={styles.description}>
                        {truncateDescription(currentMovie.description, 150)}
                    </p>
                    <button className={styles.button}>Discover</button>
                </div>
            </div>

            <MainIndicator
                total={movies.length}
                currentIndex={currentMovieIndex}
                onIndicatorClick={(index) => setCurrentMovieIndex(index)}
            />
        </div>
    );
}
