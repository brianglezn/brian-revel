import styles from './HomeSoon.module.css';
import Carousel from '@/components/ui/Carousel';
import Poster from '@/components/ui/Poster';
import { Movie } from '@/app/types';

// Define la interfaz de las propiedades esperadas para el componente HomeSoon
interface HomeSoonProps {
    upcomingMovies: Movie[];
}

// Componente HomeSoon muestra una sección de películas próximas a estrenarse
export default function HomeSoon({ upcomingMovies }: HomeSoonProps) {
    return (
        <section className={styles.soon}>
            <div className={styles.soonContainer}>
                <h2>Coming Soon</h2>

                <Carousel>
                    {upcomingMovies.map((movie) => (
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
    );
}
