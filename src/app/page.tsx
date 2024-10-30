import { cookies } from 'next/headers';
import styles from './Home.module.css';
import Header from '@/components/layout/Header';
import HomeHero from '@/components/home/HomeHero';
import HomeGenres from '@/components/home/HomeGenres';
import HomeSoon from '@/components/home/HomeSoon';
import HomeList from '@/components/home/HomeList';
import Footer from '@/components/layout/Footer';
import { fetchMovies, fetchGenres, fetchFavorites } from '@/utils/fetchData';

export default async function Home() {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    return <p>No authentication token found.</p>;
  }

  // Obtiene la fecha actual para comparar la disponibilidad de las películas
  const currentDate = new Date();

  // Realiza las solicitudes a la API para obtener películas, géneros y favoritos, usando el token de autenticación
  const movies = await fetchMovies(token);
  const genres = await fetchGenres(token);
  const favorites = await fetchFavorites(token);

  // Filtra las películas destacadas para mostrar en la sección de héroe de la página de inicio
  const highlightedMovies = movies.filter((movie) => movie.highlighted);

  // Filtra las películas disponibles en función de si la fecha de disponibilidad es anterior o igual a la fecha actual
  const availableMovies = movies.filter(
    (movie) => new Date(movie.availableDate) <= currentDate
  );

  // Filtra las películas próximas, aquellas cuya fecha de disponibilidad es posterior a la fecha actual
  const upcomingMovies = movies.filter(
    (movie) => new Date(movie.availableDate) > currentDate
  );

  return (
    <div className={styles.homeContainer}>
      <Header />

      <HomeHero highlightedMovies={highlightedMovies} />

      <HomeGenres genres={genres} availableMovies={availableMovies} />

      <HomeSoon upcomingMovies={upcomingMovies} />

      <HomeList favoriteMovies={favorites} />

      <Footer />
    </div>
  );
}
