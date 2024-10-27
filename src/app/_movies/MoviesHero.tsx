import styles from './MoviesHero.module.css';
import { Movie } from '@/app/types';

export default function MoviesHero({ poster }: Movie) {
    return (
        <div className={styles.hero}>
            <div className={styles.heroImage} style={{ backgroundImage: `url(${poster})` }}>
                <div className={styles.overlay}>
                    <div className={styles.actions}>
                        <button className={styles.trailerButton}>Trailer</button>
                        <button className={styles.playButton}>Play</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
