'use client';

import { useState } from 'react';
import styles from './MoviesContent.module.css';
import FavoriteIcon from '@/components/icons/FavoriteIcon';
import FavoriteFilledIcon from '@/components/icons/FavoriteFilledIcon';
import StarRating from '@/components/ui/StarRating';
import { MovieContentProps } from '@/app/types';

export default function MoviesContent({
  id,
  rating,
  cast,
  genreName,
  title,
  description,
  trailerUrl,
  playUrl,
  isFavorite: initialIsFavorite
}: MovieContentProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const handleFavoriteToggle = async () => {
    try {
      const url = `/api/list/${id}`;
      const method = isFavorite ? 'DELETE' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        setIsFavorite(!isFavorite);
      } else {
        console.error('Failed to toggle favorite status');
      }
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    }
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
          <button
            onClick={handleFavoriteToggle}
            className={`${styles.favoriteButton}`}
          >
            {isFavorite ? <FavoriteFilledIcon /> : <FavoriteIcon />}
          </button>
        </div>
      </div>

      <div className={styles.titleSection}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </section>
  );
}
