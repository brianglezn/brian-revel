import styles from './HomeList.module.css';
import Carousel from '@/components/ui/Carousel';
import Thumbnail from '@/components/ui/Thumbnail';
import { Movie } from '@/app/types';

interface HomeListProps {
    favoriteMovies: Movie[];
}

export default function HomeList({ favoriteMovies }: HomeListProps) {
    if (favoriteMovies.length === 0) return null;

    return (
        <section className={styles.list}>
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
