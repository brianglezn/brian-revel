'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './HomeClient.module.css';
import { Movie } from '@/app/types';
import Avatar from '@/components/ui/Avatar';
import Sidebar from '@/components/ui/Sidebar';
import MainIndicator from '@/components/ui/MainIndicator';
import UserIcon from '@/components/icons/UserIcon';
import SecurityIcon from '@/components/icons/SecurityIcon';
import HelpIcon from '@/components/icons/HelpIcon';
import InfoIcon from '@/components/icons/InfoIcon';

export default function HomeClient() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
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
      const highlightedMovies = data.filter(movie => movie.highlighted === true);
      if (highlightedMovies.length > 0) {
        setMovies(highlightedMovies);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovieIndex(prevIndex => (prevIndex + 1) % movies.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [movies]);

  useEffect(() => {
    setAnimationKey(prevKey => prevKey + 1);
  }, [currentMovieIndex]);

  const currentMovie = movies[currentMovieIndex];

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + '...';
    }
    return description;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Avatar alt="User Avatar" size="small" onClick={handleSidebarToggle} />
      </header>

      {movies.length > 0 && (
        <section
          key={animationKey}
          className={styles.hero}
          style={{ backgroundImage: `url(${currentMovie.poster})` }}
        >
          <div className={styles.overlay}>
            <div className={styles.textContainer}>
              <h1 className={styles.title}>{currentMovie.title}</h1>
              <p className={styles.description}>
                {truncateDescription(currentMovie.description, 150)}
              </p>
              <button className={styles.button}>Discover</button>
            </div>
          </div>
          <MainIndicator
            total={movies.length}
            currentIndex={currentMovieIndex}
            onIndicatorClick={(index) => setCurrentMovieIndex(index)}
          />
        </section>
      )}

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
