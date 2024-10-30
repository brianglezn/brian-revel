'use client'

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

    // Función que maneja el clic en el componente para navegar a la página de detalles de la película
    const handleClick = () => {
        const slug = slugify(title); // Convierte el título a formato slug para la URL
        router.push(`/movies/${slug}?id=${id}`); // Navega a la URL de detalles de la película con el slug y el id como query parameter
    };

    return (
        <div
            className={styles.thumbnail} // Contenedor principal del thumbnail con sus estilos
            onMouseEnter={() => setHovered(true)} // Activa el estado "hovered" al pasar el mouse por encima
            onMouseLeave={() => setHovered(false)} // Desactiva el estado "hovered" al quitar el mouse
            onClick={handleClick} // Llama a handleClick cuando el usuario hace clic en el thumbnail
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
