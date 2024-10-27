'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from './HomeClient.module.css';

import { Movie, Genre } from '@/app/types';
import HomeHeader from '@/components/home/HomeHeader';
import HomeHero from '@/components/home/HomeHero';
import HomeGenres from '@/components/home/HomeGenres';
import HomeSoon from '@/components/home/HomeSoon';
import HomeFooter from '@/components/home/HomeFooter';
import Sidebar from '@/components/ui/Sidebar';
import UserIcon from '@/components/icons/UserIcon';
import SecurityIcon from '@/components/icons/SecurityIcon';
import HelpIcon from '@/components/icons/HelpIcon';
import InfoIcon from '@/components/icons/InfoIcon';

export default function HomeClient() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [highlightedMovies, setHighlightedMovies] = useState<Movie[]>([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const router = useRouter();

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'GET',
    });
    router.push('/login');
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch('/api/movies');
      const data: Movie[] = await res.json();
      setMovies(data);

      const highlighted = data.filter(movie => movie.highlighted);
      setHighlightedMovies(highlighted);
    };

    const fetchGenres = async () => {
      const res = await fetch('/api/genres');
      const data: Genre[] = await res.json();
      setGenres(data);
    };

    fetchMovies();
    fetchGenres();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovieIndex(prevIndex => (prevIndex + 1) % highlightedMovies.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [highlightedMovies]);

  useEffect(() => {
    setAnimationKey(prevKey => prevKey + 1);
  }, [currentMovieIndex]);

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

  return (
    <div className={styles.homeContainer}>

      <HomeHeader handleSidebarToggle={handleSidebarToggle} />

      {highlightedMovies.length > 0 && (
        <HomeHero
          key={animationKey}
          currentMovie={currentMovie}
          currentMovieIndex={currentMovieIndex}
          highlightedMoviesLength={highlightedMovies.length}
          onIndicatorClick={(index) => setCurrentMovieIndex(index)}
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

      <HomeFooter />

      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarToggle}>
        <div className={styles.sidebarContent}>
          <h2>Profile Settings</h2>
          <div className={styles.sidebarGroup}>
            <a>
              <UserIcon />
              <p>Profile Settings</p>
            </a>
            <a>
              <SecurityIcon />
              <p>Security and Privacy</p>
            </a>
          </div>
          <div className={styles.sidebarGroup}>
            <a>
              <HelpIcon />
              <p>Help</p>
            </a>
            <a>
              <InfoIcon />
              <p>About Us</p>
            </a>
          </div>
        </div>
        <button className={styles.sidebarButton} onClick={handleLogout}>
          Sign out
        </button>
      </Sidebar>
    </div>
  );
}
