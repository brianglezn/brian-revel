import { MovieHeroProps } from '../types';
import styles from './MoviesHero.module.css';

export default function MoviesHero({ poster, isAvailable, availableDate, trailerUrl, playUrl }: MovieHeroProps) {
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
        </div>
      </div>
    </section>
  );
}
