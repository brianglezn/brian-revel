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
  const currentDate = new Date();

  // useEffect que realiza una llamada a la API para obtener datos de películas y géneros
  useEffect(() => {
    const fetchMoviesAndGenres = async () => {
      try {
        // Llamada a la API para obtener la lista de películas y generos
        const moviesRes = await fetch('/api/movies');
        const moviesData: Movie[] = await moviesRes.json();
        setMovies(moviesData);
        const genresRes = await fetch('/api/genres');
        const genresData: Genre[] = await genresRes.json();
        setGenres(genresData);

        // Filtra las películas para seleccionar las destacadas
        const highlighted = moviesData.filter((movie) => movie.highlighted);
        setHighlightedMovies(highlighted);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesAndGenres();
  }, []);

  // useEffect para manejar el intervalo de cambio automático en el carrusel de películas destacadas
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % highlightedMovies.length);
    }, 10000);

    // Limpia el intervalo al desmontar el componente o al actualizar el índice
    return () => clearInterval(interval);
  }, [highlightedMovies, currentMovieIndex]);

  // Función para manejar el cambio manual del índice de la película destacada
  const handleIndicatorClick = (index: number) => {
    setCurrentMovieIndex(index);
    // Incrementa la clave de animación para forzar una actualización visual
    setAnimationKey((prevKey) => prevKey + 1);
  };

  // Selecciona la película actual en el carrusel según el índice
  const currentMovie = highlightedMovies[currentMovieIndex];

  // Mapa de géneros para una búsqueda rápida por ID de género
  const genreMap = genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {} as Record<string, string>);

  // Filtra las películas disponibles
  const availableMovies = movies.filter(
    (movie) =>
      (!selectedGenre || movie.genre === selectedGenre) &&
      new Date(movie.availableDate) <= currentDate
  );

  // Filtra las películas no disponibles
  const upcomingMovies = movies.filter((movie) => new Date(movie.availableDate) > currentDate && (!selectedGenre || movie.genre === selectedGenre));

  // Si los datos están cargando, no se muestra nada hasta que estén listos
  if (loading) {
    return null;
  }

  return (
    <div className={styles.homeContainer}>
      <Header />

      {/* Si hay películas destacadas, muestra el carrusel de películas destacadas */}
      {highlightedMovies.length > 0 && (
        <HomeHero
          key={animationKey} // Clave para forzar la animación en el cambio manual
          currentMovie={currentMovie} // Película actual a mostrar
          currentMovieIndex={currentMovieIndex} // Índice actual en el carrusel
          highlightedMoviesLength={highlightedMovies.length} // Total de películas destacadas
          onIndicatorClick={handleIndicatorClick} // Función para manejar el clic en el indicador
        />
      )}

      {/* Componente que muestra las películas filtradas por género */}
      <HomeGenres
        genres={genres} // Lista de géneros
        availableMovies={availableMovies} // Películas actualmente disponibles
        selectedGenre={selectedGenre} // Género actualmente seleccionado
        onSelectGenre={setSelectedGenre} // Función para seleccionar un género
        genreMap={genreMap} // Mapa de géneros
      />

      {/* Componente que muestra las películas próximas a estrenarse */}
      <HomeSoon upcomingMovies={upcomingMovies} />

      {/* Componente que muestra la lista de películas favoritas */}
      <HomeList />

      <Footer />
    </div>
  );
}
