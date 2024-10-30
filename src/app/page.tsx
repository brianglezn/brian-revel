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
  const movies = await fetchMovies(token);
  const genres = await fetchGenres(token);
  const favorites = await fetchFavorites(token);

  const highlightedMovies = movies.filter((movie) => movie.highlighted);
  const currentDate = new Date();

  const availableMovies = movies.filter(
    (movie) => new Date(movie.availableDate) <= currentDate
  );
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
