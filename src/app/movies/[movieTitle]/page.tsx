'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function MoviePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const searchParams = useSearchParams();
  const movieId = searchParams.get('id');

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        console.log('Fetching movie details for ID:', movieId);
        // Aquí se hace la solicitud a tu API interna que redirige a la API externa
        const res = await fetch(`/api/movies/${movieId}`);

        if (!res.ok) {
          console.error('Error fetching movie details:', res.status);
          return;
        }

        const data = await res.json();
        console.log('Movie details fetched:', data);
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    } else {
      console.error('Movie ID is missing');
    }
  }, [movieId]);

  if (!movieDetails) {
    console.log('Movie details are still loading...');
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header handleSidebarToggle={handleSidebarToggle} />

      <main className={styles.moviePageContainer}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div
            className={styles.heroImage}
            // style={{ backgroundImage: `url(${movieDetails.poster})` }}
          >
            <div className={styles.overlay}>
              <div className={styles.actions}>
                <button className={styles.trailerButton}>Trailer</button>
                <button className={styles.playButton}>Play</button>
              </div>
            </div>
          </div>
        </section>

        {/* Movie Content */}
        <section className={styles.content}>
          {/* <h2>{movieDetails.title}</h2>
          <p>{movieDetails.description}</p> */}

          <div className={styles.extraLinks}>
            <h3>Related Links</h3>
            <ul>
              <li>Link 1</li>
              <li>Link 2</li>
              <li>Link 3</li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
