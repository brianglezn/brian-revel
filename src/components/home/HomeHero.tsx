"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './HomeHero.module.css';
import MainIndicator from '@/components/ui/MainIndicator';
import { Movie } from '@/app/types';
import { slugify } from '@/utils/slugify';

// Definición de las propiedades esperadas para el componente HomeHero
interface HomeHeroProps {
    highlightedMovies: Movie[];
}

export default function HomeHero({ highlightedMovies }: HomeHeroProps) {
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [manualChangeCount, setManualChangeCount] = useState(0);
    const currentMovie = highlightedMovies[currentMovieIndex];
    const router = useRouter();

    // useEffect para manejar el cambio automático de películas
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % highlightedMovies.length);
        }, 10000);

        // Limpia el intervalo cuando el componente se desmonta o cuando hay un cambio manual
        return () => clearInterval(interval);
    }, [highlightedMovies, manualChangeCount]); // Reinicia el intervalo si hay un cambio manual

    // Función para manejar el clic en el indicador, actualiza el índice de la película y reinicia el intervalo
    const handleIndicatorClick = (index: number) => {
        setCurrentMovieIndex(index);
        setManualChangeCount((count) => count + 1); // Actualiza el contador para reiniciar el intervalo
    };

    // Función para manejar el clic en el botón de "Discover"
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
