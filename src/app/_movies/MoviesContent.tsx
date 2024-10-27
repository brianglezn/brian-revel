import styles from './MoviesContent.module.css';
// import { Movie } from '@/app/types';

export default function MoviesContent() {
    return (
        <div className={styles.content}>
            <h2>TITULO</h2>
            <p>DESCRIPTION</p>
            <div className={styles.extraLinks}>
                <div>
                    <h3>Related Links</h3>
                    <ul>
                        <li>Link 1</li>
                        <li>Link 2</li>
                        <li>Link 3</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
