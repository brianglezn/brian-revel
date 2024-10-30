import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import Header from '@/components/layout/Header';
import MoviesHero from '@/components/movies/MoviesHero';
import MoviesContent from '@/components/movies/MoviesContent';
import Footer from '@/components/layout/Footer';
import { fetchMoviesById, fetchGenres, fetchFavorites } from '@/utils/fetchData';

interface MoviePageProps {
  searchParams: { id?: string };
}

export default async function MoviePage({ searchParams }: MoviePageProps) {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    return <p>No authentication token found.</p>;
  }

  const movieId = searchParams?.id;
  if (!movieId) {
    return <p className={styles.error}>Movie ID not found in the query parameters.</p>;
  }

  const [movieDetails, genres, favorites] = await Promise.all([
    fetchMoviesById(movieId, token),
    fetchGenres(token),
    fetchFavorites(token),
  ]);

  if (!movieDetails || genres.length === 0) {
    return notFound();
  }

  const genreName = genres.find((genre) => genre.id === movieDetails.genre)?.name || 'Unknown';
  const isFavorite = favorites.some((movie) => movie.id === movieId);
  const currentDate = new Date();
  const availableDate = new Date(movieDetails.availableDate);
  const isAvailable = availableDate <= currentDate;

  // URLs simuladas para el tráiler y la reproducción
  const trailerUrl = 'https://example.com/trailer';
  const playUrl = 'https://example.com/play';

  return (
    <>
      <Header />
      <main className={styles.moviePageContainer}>
        <MoviesHero
          poster={movieDetails.poster}
          isAvailable={isAvailable}
          availableDate={movieDetails.availableDate}
          trailerUrl={trailerUrl}
          playUrl={isAvailable ? playUrl : null}
        />
        <MoviesContent
          id={movieDetails.id}
          rating={isAvailable ? movieDetails.rating : null}
          cast={movieDetails.cast}
          genreName={genreName}
          title={movieDetails.title}
          description={movieDetails.description}
          trailerUrl={trailerUrl}
          playUrl={isAvailable ? playUrl : null}
          isFavorite={isFavorite}
        />
      </main>
      <Footer />
    </>
  );
}
