import { useEffect, useState } from 'react';
import Carousel from '@/components/ui/Carousel';
import Thumbnail from '@/components/ui/Thumbnail';
import { Movie } from '@/app/types';
import styles from './HomeList.module.css';

export default function HomeList() {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  const fetchFavoriteMovies = async () => {
    try {
      const favListResponse = await fetch('/api/user');
      const favList = await favListResponse.json();

      const moviePromises = favList.map((id: string) =>
        fetch(`/api/movies/${id}`).then((res) => res.json())
      );
      const moviesData = await Promise.all(moviePromises);

      setFavoriteMovies(moviesData);
    } catch (error) {
      console.error('Error fetching favorite movies:', error);
    }
  };

  useEffect(() => {
    fetchFavoriteMovies();
  }, []);

  if (favoriteMovies.length === 0) return null;

  return (
    <section className={styles.list}>
      <div className={styles.listContainer}>
        <h2>Favorite List</h2>
        <Carousel>
          {favoriteMovies.map((movie) => (
            <Thumbnail
              key={movie.id}
              id={movie.id}
              title={movie.title}
              thumbnail={movie.thumbnail}
              rating={movie.rating}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
