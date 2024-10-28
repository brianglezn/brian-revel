import styles from './MoviesContent.module.css';
import FavoriteIcon from '@/components/icons/FavoriteIcon';
import FavoriteFilledIcon from '@/components/icons/FavoriteFilledIcon';
import StarRating from '@/components/ui/StarRating';
import { MovieContentProps } from '@/app/types';

export default function MoviesContent({ rating, cast, genreName, title, description, fav, trailerUrl, playUrl }: MovieContentProps) {
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
                    {fav ? (
                        <FavoriteFilledIcon className={styles.favoriteButton} />
                    ) : (
                        <FavoriteIcon className={styles.favoriteButton} />
                    )}
                </div>
            </div>

            <div className={styles.titleSection}>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </section>
    );
}
