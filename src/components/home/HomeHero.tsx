// components/home/HomeHero.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './HomeHero.module.css';
import MainIndicator from '@/components/ui/MainIndicator';
import { Movie } from '@/app/types';
import { slugify } from '@/utils/slugify';

interface HomeHeroProps {
    highlightedMovies: Movie[];
}

export default function HomeHero({ highlightedMovies }: HomeHeroProps) {
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const currentMovie = highlightedMovies[currentMovieIndex];
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % highlightedMovies.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [highlightedMovies]);

    const handleIndicatorClick = (index: number) => {
        setCurrentMovieIndex(index);
    };

    const handleDiscoverClick = () => {
        if (currentMovie) {
            const slug = slugify(currentMovie.title);
            router.push(`/movies/${slug}?id=${currentMovie.id}`);
        }
    };

    return (
        <section className={styles.hero} style={{ backgroundImage: `url(${currentMovie?.poster})` }}>
            <div className={styles.overlay}>
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>{currentMovie?.title}</h1>
                    <p className={styles.description}>
                        {currentMovie?.description.slice(0, 150)}...
                    </p>
                    <button className={styles.button} onClick={handleDiscoverClick}>
                        Discover
                    </button>
                </div>
            </div>
            <MainIndicator
                total={highlightedMovies.length}
                currentIndex={currentMovieIndex}
                onIndicatorClick={handleIndicatorClick}
            />
        </section>
    );
}
