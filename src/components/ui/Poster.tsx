import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Poster.module.css';
import { MoviePoster } from '@/app/types';
import { slugify } from '@/utils/slugify';

export default function Poster({ poster, title, availableDate, id }: MoviePoster) {
    const [hovered, setHovered] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        const slug = slugify(title);
        router.push(`/movies/${slug}?id=${id}`);
    };

    return (
        <div
            className={styles.posterContainer}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
        >
            <div className={styles.imageContainer}>
                <Image
                    src={poster}
                    alt={title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className={styles.posterImage}
                />
                {hovered && (
                    <div className={styles.overlay}>
                        <h3 className={styles.title}>{title}</h3>
                        {availableDate && (
                            <p className={styles.availableDate}>
                                {new Date(availableDate).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
