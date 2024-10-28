import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './Thumbnail.module.css';
import StarRating from '@/components/ui/StarRating';
import { MovieThumbnail } from '@/app/types';
import { slugify } from '@/utils/slugify';

export default function Thumbnail({ thumbnail, title, rating, id }: MovieThumbnail) {
    const [hovered, setHovered] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        const slug = slugify(title);
        router.push(`/movies/${slug}?id=${id}`);
    };

    return (
        <div
            className={styles.thumbnail}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
        >
            <div className={styles.imageContainer}>
                <Image
                    src={thumbnail}
                    alt={title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className={styles.image}
                />
                {hovered && (
                    <div className={styles.overlay}>
                        <h3 className={styles.title}>{title}</h3>
                        <div className={styles.rating}>
                            <StarRating rating={rating} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
