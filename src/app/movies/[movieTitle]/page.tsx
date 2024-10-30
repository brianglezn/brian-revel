import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import Header from '@/components/layout/Header';
import MoviesHero from '@/components/movies/MoviesHero';
import MoviesContent from '@/components/movies/MoviesContent';
import Footer from '@/components/layout/Footer';
import { fetchMoviesById, fetchGenres, fetchFavorites } from '@/utils/fetchData';

// Define la interfaz para los props de la página de película, especificando `searchParams` como una Promesa de un objeto que puede contener un ID de película opcional
interface MoviePageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function MoviePage({ searchParams }: MoviePageProps) {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    return <p>No authentication token found.</p>;
  }

  // Espera a que se resuelva `searchParams` y extrae el ID de la película
  const { id: movieId } = await searchParams;

  // Si no hay un ID de película en los parámetros de búsqueda, muestra un mensaje de error
  if (!movieId) {
    return <p className={styles.error}>Movie ID not found in the query parameters.</p>;
  }

  // Llama a varias funciones de `fetchData` en paralelo para obtener los detalles de la película, los géneros, y la lista de favoritos del usuario
  const [movieDetails, genres, favorites] = await Promise.all([
    fetchMoviesById(movieId, token),
    fetchGenres(token),
    fetchFavorites(token),
  ]);

  // Si no se encontraron detalles de la película o la lista de géneros está vacía, devuelve un error 404
  if (!movieDetails || genres.length === 0) {
    return notFound();
  }

  // Busca el nombre del género de la película usando el ID del género; si no encuentra el género, asigna 'Unknown'
  const genreName = genres.find((genre) => genre.id === movieDetails.genre)?.name || 'Unknown';

  // Verifica si la película actual está en la lista de favoritos del usuario
  const isFavorite = favorites.some((movie) => movie.id === movieId);

  // Calcula la disponibilidad de la película comparando la fecha de disponibilidad con la fecha actual
  const currentDate = new Date();
  const availableDate = new Date(movieDetails.availableDate);
  const isAvailable = availableDate <= currentDate;

  // URLs simuladas para el tráiler y la reproducción de la película
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
