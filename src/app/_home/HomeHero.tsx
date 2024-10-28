import { useRouter } from 'next/navigation';
import styles from './HomeHero.module.css';
import MainIndicator from '@/components/ui/MainIndicator';
import { Movie } from '@/app/types';
import { slugify } from '@/utils/slugify';

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
  const router = useRouter();

  const truncateDescription = (description: string, maxLength: number) => {
    return description.length > maxLength ? description.slice(0, maxLength) + '...' : description;
  };

  const handleDiscoverClick = () => {
    if (currentMovie) {
      const slug = slugify(currentMovie.title);
      router.push(`/movies/${slug}?id=${currentMovie.id}`);
    }
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
          <button className={styles.button} onClick={handleDiscoverClick}>
            Discover
          </button>
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
