'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './Thumbnail.module.css';
import StarRateIcon from '@/components/icons/StarRateIcon';
import StarRateFilledIcon from '@/components/icons/StarRateFilledIcon';
import StarRateHalfIcon from '@/components/icons/StarRateHalfIcon';
import { MovieThumbnail } from '@/app/types';

export default function Thumbnail({ thumbnail, title, rating }: MovieThumbnail) {
    const [hovered, setHovered] = useState(false);

    const renderStars = (rating: number | null) => {
        const stars = [];
        const normalizedRating = rating === null ? 0 : rating;

        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(normalizedRating)) {
                stars.push(<StarRateFilledIcon key={i} />);
            } else if (i - normalizedRating < 1 && i - normalizedRating > 0) {
                stars.push(<StarRateHalfIcon key={i} />);
            } else {
                stars.push(<StarRateIcon key={i} />);
            }
        }
        return stars;
    };

    return (
        <div
            className={styles.thumbnail}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
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
                            {renderStars(rating)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
