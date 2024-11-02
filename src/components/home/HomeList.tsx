import styles from './HomeList.module.css';
import Carousel from '@/components/ui/Carousel';
import Thumbnail from '@/components/ui/Thumbnail';
import { Movie } from '@/app/types';

// Definición de las propiedades esperadas para el componente HomeList
interface HomeListProps {
    favoriteMovies: Movie[];
}

// Componente HomeList muestra una lista de películas favoritas en un carrusel si hay películas disponibles
export default function HomeList({ favoriteMovies }: HomeListProps) {
    // Verificación rápida para no renderizar el componente si no hay películas en la lista de favoritos
    if (favoriteMovies.length === 0) return null;

    return (
        <section className={styles.list} id='list'>
            <div className={styles.listContainer}>
                <h2>Favorite List</h2>
                
                <Carousel>
                    {favoriteMovies.map((movie) => (
                        <Thumbnail
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            thumbnail={movie.thumbnail}
                            rating={movie.rating}
                        />
                    ))}
                </Carousel>
            </div>
        </section>
    );
}
