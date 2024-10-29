'use client';

import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { Movie, Genre } from '@/app/types';
import Header from '@/components/layout/Header';
import HomeHero from '@/app/_home/HomeHero';
import HomeGenres from '@/app/_home/HomeGenres';
import HomeSoon from '@/app/_home/HomeSoon';
import HomeList from '@/app/_home/HomeList';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [highlightedMovies, setHighlightedMovies] = useState<Movie[]>([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoviesAndGenres = async () => {
      try {
        const moviesRes = await fetch('/api/movies');
        const moviesData: Movie[] = await moviesRes.json();
        setMovies(moviesData);

        const highlighted = moviesData.filter((movie) => movie.highlighted);
        setHighlightedMovies(highlighted);

        const genresRes = await fetch('/api/genres');
        const genresData: Genre[] = await genresRes.json();
        setGenres(genresData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesAndGenres();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % highlightedMovies.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [highlightedMovies, currentMovieIndex]);

  const handleIndicatorClick = (index: number) => {
    setCurrentMovieIndex(index);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const currentMovie = highlightedMovies[currentMovieIndex];

  const genreMap = genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {} as Record<string, string>);

  const currentDate = new Date();

  const availableMovies = movies.filter(
    (movie) =>
      (!selectedGenre || movie.genre === selectedGenre) &&
      new Date(movie.availableDate) <= currentDate
  );

  const upcomingMovies = movies.filter(
    (movie) => new Date(movie.availableDate) > currentDate && (!selectedGenre || movie.genre === selectedGenre)
  );

  if (loading) {
    return null;
  }

  return (
    <div className={styles.homeContainer}>
      <Header />

      {highlightedMovies.length > 0 && (
        <HomeHero
          key={animationKey}
          currentMovie={currentMovie}
          currentMovieIndex={currentMovieIndex}
          highlightedMoviesLength={highlightedMovies.length}
          onIndicatorClick={handleIndicatorClick}
        />
      )}

      <HomeGenres
        genres={genres}
        availableMovies={availableMovies}
        selectedGenre={selectedGenre}
        onSelectGenre={setSelectedGenre}
        genreMap={genreMap}
      />

      <HomeSoon upcomingMovies={upcomingMovies} />

      <HomeList />

      <Footer />
    </div>
  );
}
