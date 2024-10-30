import StarRateIcon from '@/components/icons/StarRateIcon';
import StarRateFilledIcon from '@/components/icons/StarRateFilledIcon';
import StarRateHalfIcon from '@/components/icons/StarRateHalfIcon';
import styles from './StarRating.module.css';

// Definición del tipo de propiedades esperadas para el componente StarRating
type StarRatingProps = {
    rating: number | null; // La calificación puede ser un número o nula
};

// Componente StarRating: muestra una calificación de estrellas visual, utilizando íconos de estrellas completas, medias y vacías
const StarRating = ({ rating }: StarRatingProps) => {
    // Si el rating es nulo, el componente no renderiza nada
    if (rating === null) return null;

    // Calcula el número de estrellas completas, medias y vacías en función de la calificación
    const fullStars = Math.floor(rating); // Estrellas completas, obtenidas redondeando hacia abajo el valor de calificación
    const hasHalfStar = rating % 1 !== 0; // Determina si hay una estrella a la mitad, verificando el resto al dividir entre 1
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Estrellas vacías restantes para completar un total de 5

    // Array para almacenar los íconos de estrellas a renderizar
    const stars = [];

    // Genera y agrega las estrellas completas (íconos llenos) al array `stars`
    for (let i = 0; i < fullStars; i++) {
        stars.push(<StarRateFilledIcon key={`star-filled-${i}`} className={styles.starIcon} />);
    }
    
    // Si hay una estrella a la mitad, la agrega al array `stars`
    if (hasHalfStar) {
        stars.push(<StarRateHalfIcon key="star-half" className={styles.starIcon} />);
    }
    
    // Agrega las estrellas vacías restantes (íconos vacíos) al array `stars`
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<StarRateIcon key={`star-empty-${i}`} className={styles.starIcon} />);
    }

    // Renderiza el conjunto de estrellas en un contenedor div
    return (
        <div className={styles.starsContainer}>
            {stars} {/* Muestra la colección de íconos en el array `stars` */}
        </div>
    );
};

// Exporta el componente StarRating para su uso en otras partes de la aplicación
export default StarRating;
