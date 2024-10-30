'use client';

import { useState, useEffect } from 'react';
import styles from './MoviesContent.module.css';
import FavoriteIcon from '@/components/icons/FavoriteIcon';
import FavoriteFilledIcon from '@/components/icons/FavoriteFilledIcon';
import StarRating from '@/components/ui/StarRating';
import { MovieContentProps } from '@/app/types';

export default function MoviesContent({
  id,
  rating,
  cast,
  genreName,
  title,
  description,
  trailerUrl,
  playUrl,
  isFavorite: initialIsFavorite,
}: MovieContentProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [animateFavorite, setAnimateFavorite] = useState(false);

  // Función que alterna el estado de favorito para la película
  const handleFavoriteToggle = async () => {
    // Calcula el nuevo estado de favorito para reflejarlo visualmente de inmediato
    const newFavoriteStatus = !isFavorite;

    // Actualiza el estado de favorito y activa la animación de forma inmediata
    setIsFavorite(newFavoriteStatus);
    setAnimateFavorite(true);

    try {
      // Establece el URL de la API interna para añadir o eliminar la película de favoritos
      const url = newFavoriteStatus ? '/api/list' : `/api/list/${id}`;
      // Determina el método HTTP en función del nuevo estado de favorito
      const method = newFavoriteStatus ? 'POST' : 'DELETE';

      // Realiza la solicitud a la API interna para actualizar el estado de favorito
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: newFavoriteStatus ? JSON.stringify({ id }) : null,
      });

      // Verifica si la solicitud fue exitosa; si no, revierte el cambio visual
      if (!response.ok) {
        setIsFavorite(!newFavoriteStatus); 
        console.error('Failed to toggle favorite status');
      }
    } catch (error) {
      // Captura errores en la solicitud y revierte el estado visual de favorito
      setIsFavorite(!newFavoriteStatus);
      console.error('Error toggling favorite status:', error);
    }
  };

  // Controla la duración de la animación cada vez que `animateFavorite` está activo
  useEffect(() => {
    if (animateFavorite) {
      const timer = setTimeout(() => setAnimateFavorite(false), 300);
      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }
  }, [animateFavorite]);

  return (
    <section className={styles.movieContent}>
      <div className={styles.actions}>
        {trailerUrl && (
          <button className={styles.trailerButton} onClick={() => window.open(trailerUrl, '_blank')}>
            Trailer
          </button>
        )}
        {playUrl && (
          <button className={styles.playButton} onClick={() => window.open(playUrl, '_blank')}>
            Play
          </button>
        )}
      </div>

      <div className={styles.movieItems}>
        <div className={styles.detailsSection}>
          <div className={styles.starRating}>
            <p><strong>Rating:</strong></p>
            <StarRating rating={rating} />
          </div>
          <p><strong>Cast:</strong> {cast}</p>
          <p><strong>Genre:</strong> {genreName}</p>
        </div>

        <div className={styles.favoriteContainer}>
          <p className={styles.favoriteText}>Add to Favorites</p>
          <button
            onClick={handleFavoriteToggle}
            className={`${styles.favoriteButton} ${animateFavorite ? styles.bounceAnimation : ''}`}
          >
            {isFavorite ? <FavoriteFilledIcon /> : <FavoriteIcon />}
          </button>
        </div>
      </div>

      <div className={styles.titleSection}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </section>
  );
}
