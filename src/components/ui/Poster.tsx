'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Poster.module.css';
import { MoviePoster } from '@/app/types';

export default function Poster({ poster, title, availableDate }: MoviePoster) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className={styles.posterContainer}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className={styles.imageContainer}>
                <p>HOLA</p>
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
