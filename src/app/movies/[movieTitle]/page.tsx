'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import Header from '@/components/layout/Header';
import MoviesHero from '@/components/movies/MoviesHero';
import MoviesContent from '@/components/movies/MoviesContent';
import Footer from '@/components/layout/Footer';
import { Genre, Movie } from '@/app/types';

export default function MoviePage() {
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const movieId = searchParams.get('id');

  // useEffect para realizar la carga de datos de la película y géneros
  useEffect(() => {
    const fetchMovieAndGenres = async () => {
      try {
        // Llamada a la API para obtener la lista de películas y generos
        const movieRes = await fetch(`/api/movies/${movieId}`);
        const movieData = await movieRes.json();
        const genresRes = await fetch(`/api/genres`);
        const genresData = await genresRes.json();
        setGenres(genresData);

        // Verificamos si alguna de las respuestas no fue exitosa
        if (!movieRes.ok || !genresRes.ok) {
          console.error('Error fetching data:', movieRes.status, genresRes.status);
          return;
        }

        // Simulamos las URLs de los trailers y la reproducción de la película
        const trailerUrl = 'https://example.com/trailer';
        const playUrl = movieData.availableDate <= new Date().toISOString() ? 'https://example.com/play' : null;
        setMovieDetails({ ...movieData, trailerUrl, playUrl });

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Solo intentamos obtener datos si el ID de la película está presente
    if (movieId) {
      fetchMovieAndGenres();
    } else {
      // Mostramos un error si falta el ID de la película
      console.error('Movie ID is missing');
      setLoading(false);
    }
  }, [movieId]);

  // Si los datos están cargando o los detalles de la película aún no están disponibles, no renderizamos nada
  if (loading || !movieDetails) {
    return null;
  }

  // Buscamos el nombre del género de la película, o asignamos 'Unknown' si no se encuentra
  const genreName = genres.find((genre) => genre.id === movieDetails.genre)?.name || 'Unknown';

  // Calculamos si la película ya está disponible para ser reproducida comparando la fecha actual con su fecha de disponibilidad
  const currentDate = new Date();
  const availableDate = new Date(movieDetails.availableDate);
  const isAvailable = availableDate <= currentDate;

  return (
    <>
      <Header />

      {/* Contenedor principal de la página de detalles de la película */}
      <main className={styles.moviePageContainer}>
        {/* Componente para mostrar el póster de la película y botones de acción */}
        <MoviesHero
          poster={movieDetails.poster}
          isAvailable={isAvailable}
          availableDate={movieDetails.availableDate}
          trailerUrl={movieDetails.trailerUrl}
          playUrl={isAvailable ? movieDetails.playUrl : null}
        />

        {/* Componente para mostrar el contenido de la película, como descripción, elenco y géneros */}
        <MoviesContent
          id={movieDetails.id}
          rating={isAvailable ? movieDetails.rating : null}  // Solo envia la calificación si está disponible
          cast={movieDetails.cast}
          genreName={genreName}
          title={movieDetails.title}
          description={movieDetails.description}
          trailerUrl={movieDetails.trailerUrl}
          playUrl={isAvailable ? movieDetails.playUrl : null}
        />
      </main>

      <Footer />
    </>
  );
}
