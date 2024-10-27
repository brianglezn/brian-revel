'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './HomeClient.module.css';
import { Movie, Genre } from '@/app/types';
import Avatar from '@/components/ui/Avatar';
import Sidebar from '@/components/ui/Sidebar';
import Carousel from '@/components/ui/Carousel';
import MainIndicator from '@/components/ui/MainIndicator';
import Thumbnail from '@/components/ui/Thumbnail';
import UserIcon from '@/components/icons/UserIcon';
import SecurityIcon from '@/components/icons/SecurityIcon';
import HelpIcon from '@/components/icons/HelpIcon';
import InfoIcon from '@/components/icons/InfoIcon';
import Poster from '../ui/Poster';

export default function HomeClient() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [highlightedMovies, setHighlightedMovies] = useState<Movie[]>([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
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

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + '...';
    }
    return description;
  };

  const genreMap = genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {} as Record<string, string>);

  const currentDate = new Date();

  const availableMovies = movies.reduce((acc, movie) => {
    const availableDate = new Date(movie.availableDate);
    if (availableDate <= currentDate) {
      const genreName = genreMap[movie.genre] || 'Unknown';
      if (!acc[genreName]) {
        acc[genreName] = [];
      }
      acc[genreName].push(movie);
    }
    return acc;
  }, {} as Record<string, Movie[]>);

  const upcomingMovies = movies.filter(movie => new Date(movie.availableDate) > currentDate);

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <Avatar alt='User Avatar' size='small' onClick={handleSidebarToggle} />
      </header>

      {highlightedMovies.length > 0 && (
        <section
          key={animationKey}
          className={styles.hero}
          style={{ backgroundImage: `url(${currentMovie?.poster})` }}
        >
          <div className={styles.overlay}>
            <div className={styles.textContainer}>
              <h1 className={styles.title}>{currentMovie?.title}</h1>
              <p className={styles.description}>
                {truncateDescription(currentMovie?.description || '', 150)}
              </p>
              <button className={styles.button}>Discover</button>
            </div>
          </div>
          <MainIndicator
            total={highlightedMovies.length}
            currentIndex={currentMovieIndex}
            onIndicatorClick={(index) => setCurrentMovieIndex(index)}
          />
        </section>
      )}

      <section className={styles.genres}>
        {Object.entries(availableMovies).map(([genreName, genreMovies]) => (
          <div key={genreName} className={styles.genre}>
            <h2>{genreName}</h2>
            <Carousel>
              {genreMovies.map(movie => (
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

      <section className={styles.soon}>
        <div className={styles.soonContainer}>
          <h2>Coming Soon</h2>
          <Carousel>
            {upcomingMovies.map(movie => (
              <Poster
                key={movie.id}
                poster={movie.poster}
                title={movie.title}
                id={movie.id}
                availableDate={movie.availableDate}
              />
            ))}
          </Carousel>
        </div>
      </section>

      <section className={styles.list}></section>

      <footer className={styles.footer}></footer>

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
