'use client';

import styles from './HomeHero.module.css';
import MainIndicator from '@/components/ui/MainIndicator';
import { Movie } from '@/app/types';

interface HomeHeroProps {
  currentMovie: Movie | undefined;
  currentMovieIndex: number;
  highlightedMoviesLength: number;
  onIndicatorClick: (index: number) => void;
}

export default function HomeHero({
  currentMovie,
  currentMovieIndex,
  highlightedMoviesLength,
  onIndicatorClick
}: HomeHeroProps) {

  const truncateDescription = (description: string, maxLength: number) => {
    return description.length > maxLength ? description.slice(0, maxLength) + '...' : description;
  };

  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${currentMovie?.poster})` }}
    >
      <div className={styles.overlay}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{currentMovie?.title}</h1>
          <p className={styles.description}>
            {truncateDescription(currentMovie?.description || '', 150)}
          </p>
          <button className={styles.button}>Discover</button>
        </div>
      </div>
      <MainIndicator
        total={highlightedMoviesLength}
        currentIndex={currentMovieIndex}
        onIndicatorClick={onIndicatorClick}
      />
    </section>
  );
}
