import { useState, useEffect } from 'react';
import styles from './MoviesContent.module.css';
import FavoriteIcon from '@/components/icons/FavoriteIcon';
import FavoriteFilledIcon from '@/components/icons/FavoriteFilledIcon';
import StarRating from '@/components/ui/StarRating';
import { MovieContentProps } from '@/app/types';

export default function MoviesContent({ rating, cast, genreName, title, description, trailerUrl, playUrl, id }: MovieContentProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [animateFavorite, setAnimateFavorite] = useState(false);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch('/api/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const favoriteMovies = await response.json();

                    if (favoriteMovies.some((favId: string) => favId.toLowerCase() === id.toLowerCase())) {
                        setIsFavorite(true);
                    } else {
                        setIsFavorite(false);
                    }
                } else {
                    console.error('Failed to fetch favorite movies');
                }
            } catch (error) {
                console.error('Error fetching favorite movies:', error);
            }
        };

        fetchFavorites();
    }, [id]);

    const handleAddToFavorites = async () => {
        try {
            const response = await fetch('/api/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                setIsFavorite(true);
                triggerAnimation();
            } else {
                console.error('Failed to add movie to favorites');
            }
        } catch (error) {
            console.error('Error adding movie to favorites:', error);
        }
    };

    const handleRemoveFromFavorites = async () => {
        try {
            const response = await fetch(`/api/list/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setIsFavorite(false);
                triggerAnimation();
            } else {
                console.error('Failed to remove movie from favorites');
            }
        } catch (error) {
            console.error('Error removing movie from favorites:', error);
        }
    };

    // Función para activar la animación
    const triggerAnimation = () => {
        setAnimateFavorite(true);
        setTimeout(() => setAnimateFavorite(false), 300); // Duración en ms debe coincidir con la animación en CSS
    };

    return (
        <section className={styles.movieContent}>
            <div className={styles.actions}>
                {trailerUrl && (
                    <button className={styles.trailerButton} onClick={() => window.open(trailerUrl, '_blank')}>
                        Trailer
                    </button>
                )}
                {playUrl && (
                    <button className={styles.playButton} onClick={() => window.open(playUrl, '_blank')}>
                        Play
                    </button>
                )}
            </div>

            <div className={styles.movieItems}>
                <div className={styles.detailsSection}>
                    <div className={styles.starRating}>
                        <p><strong>Rating:</strong></p>
                        <StarRating rating={rating} />
                    </div>
                    <p><strong>Cast:</strong> {cast}</p>
                    <p><strong>Genre:</strong> {genreName}</p>
                </div>

                <div className={styles.favoriteContainer}>
                    <p className={styles.favoriteText}>Add to Favorites</p>
                    {isFavorite ? (
                        <button
                            onClick={handleRemoveFromFavorites}
                            className={`${styles.favoriteButton} ${animateFavorite ? styles.bounceAnimation : ''}`}
                        >
                            <FavoriteFilledIcon />
                        </button>
                    ) : (
                        <button
                            onClick={handleAddToFavorites}
                            className={`${styles.favoriteButton} ${animateFavorite ? styles.bounceAnimation : ''}`}
                        >
                            <FavoriteIcon />
                        </button>
                    )}
                </div>
            </div>

            <div className={styles.titleSection}>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </section>
    );
}
