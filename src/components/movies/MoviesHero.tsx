'use client';

import { MovieHeroProps } from '@/app/types';
import styles from './MoviesHero.module.css';

export default function MoviesHero({ poster, isAvailable, availableDate, trailerUrl, playUrl }: MovieHeroProps) {
  const handleTrailerClick = () => {
    if (trailerUrl) {
      window.open(trailerUrl, '_blank');
    }
  };

  const handlePlayClick = () => {
    if (playUrl) {
      window.open(playUrl, '_blank');
    }
  };

  return (
    <section className={styles.movieHero}>
      <div
        className={styles.heroImage}
        style={{ backgroundImage: `url(${poster})` }}
      >
        <div className={styles.overlay}>
          {!isAvailable && availableDate && (
            <div className={styles.releaseDate}>
              <p>Coming on: {new Date(availableDate).toLocaleDateString()}</p>
            </div>
          )}
          <div className={styles.actions}>
            {trailerUrl && (
              <button className={styles.trailerButton} onClick={handleTrailerClick}>
                Trailer
              </button>
            )}
            {playUrl && (
              <button className={styles.playButton} onClick={handlePlayClick}>
                Play
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
