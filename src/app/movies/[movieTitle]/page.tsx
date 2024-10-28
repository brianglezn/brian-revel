'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import Header from '@/components/layout/Header';
import MoviesHero from '@/app/_movies/MoviesHero';
import MoviesContent from '@/app/_movies/MoviesContent';
import Footer from '@/components/layout/Footer';
import { Genre, Movie } from '@/app/types';

export default function MoviePage() {
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const searchParams = useSearchParams();
  const movieId = searchParams.get('id');

  useEffect(() => {
    const fetchMovieAndGenres = async () => {
      try {
        const movieRes = await fetch(`/api/movies/${movieId}`);
        const genresRes = await fetch(`/api/genres`);
        const userRes = await fetch('/api/user');

        if (!movieRes.ok || !genresRes.ok || !userRes.ok) {
          console.error('Error fetching data:', movieRes.status, genresRes.status, userRes.status);
          return;
        }

        const movieData = await movieRes.json();
        const genresData = await genresRes.json();
        const userData = await userRes.json();

        const trailerUrl = '';
        const playUrl = movieData.availableDate <= new Date().toISOString() ? '' : null;

        setMovieDetails({ ...movieData, trailerUrl, playUrl });
        setGenres(genresData);

        if (userData?.moviesIds.includes(movieId)) {
          setIsFavorite(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieAndGenres();
    } else {
      console.error('Movie ID is missing');
      setLoading(false);
    }
  }, [movieId]);

  if (loading || !movieDetails) {
    return <div>Loading...</div>;
  }

  const genreName = genres.find((genre) => genre.id === movieDetails.genre)?.name || 'Unknown';

  const currentDate = new Date();
  const availableDate = new Date(movieDetails.availableDate);
  const isAvailable = availableDate <= currentDate;

  return (
    <>
      <Header />

      <main className={styles.moviePageContainer}>
        <MoviesHero
          poster={movieDetails.poster}
          isAvailable={isAvailable}
          availableDate={movieDetails.availableDate}
          trailerUrl={movieDetails.trailerUrl}
          playUrl={isAvailable ? movieDetails.playUrl : null}
        />

        <MoviesContent
          rating={isAvailable ? movieDetails.rating : null}
          cast={movieDetails.cast}
          genreName={genreName}
          title={movieDetails.title}
          description={movieDetails.description}
          fav={isFavorite}
        />
      </main>

      <Footer />
    </>
  );
}
