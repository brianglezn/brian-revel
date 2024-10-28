import styles from './HomeGenres.module.css';
import { Genre, Movie } from '@/app/types';
import Carousel from '@/components/ui/Carousel';
import Thumbnail from '@/components/ui/Thumbnail';

interface HomeGenresProps {
  genres: Genre[];
  availableMovies: Movie[];
  selectedGenre: string | null;
  onSelectGenre: (genreId: string | null) => void;
  genreMap: Record<string, string>;
}

export default function HomeGenres({
  genres,
  availableMovies,
  selectedGenre,
  onSelectGenre,
  genreMap,
}: HomeGenresProps) {
  return (
    <section className={styles.genres}>
      <Carousel>
        <ul className={styles.genreList}>
          <li
            onClick={() => onSelectGenre(null)}
            className={!selectedGenre ? styles.activeGenre : ''}
          >
            All
          </li>
          {genres.map((genre) => (
            <li
              key={genre.id}
              onClick={() => onSelectGenre(genre.id)}
              className={selectedGenre === genre.id ? styles.activeGenre : ''}
            >
              {genre.name}
            </li>
          ))}
        </ul>
      </Carousel>

      {Object.entries(
        availableMovies.reduce((acc, movie) => {
          const genreName = genreMap[movie.genre] || 'Unknown';
          if (!acc[genreName]) acc[genreName] = [];
          acc[genreName].push(movie);
          return acc;
        }, {} as Record<string, Movie[]>)
      ).map(([genreName, genreMovies]) => (
        <div key={genreName} className={styles.genre}>
          <h2>{genreName}</h2>
          <Carousel>
            {genreMovies.map((movie) => (
              <Thumbnail
                key={movie.id}
                thumbnail={movie.thumbnail}
                title={movie.title}
                rating={movie.rating}
                id={movie.id}
              />
            ))}
          </Carousel>
        </div>
      ))}
    </section>
  );
}
