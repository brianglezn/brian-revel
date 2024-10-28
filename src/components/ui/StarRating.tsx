import StarRateIcon from '@/components/icons/StarRateIcon';
import StarRateFilledIcon from '@/components/icons/StarRateFilledIcon';
import StarRateHalfIcon from '@/components/icons/StarRateHalfIcon';
import styles from './StarRating.module.css';

type StarRatingProps = {
    rating: number | null;
};

const StarRating = ({ rating }: StarRatingProps) => {
    if (rating === null) return null;

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<StarRateFilledIcon key={`star-filled-${i}`} className={styles.starIcon} />);
    }
    if (hasHalfStar) {
        stars.push(<StarRateHalfIcon key="star-half" className={styles.starIcon} />);
    }
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<StarRateIcon key={`star-empty-${i}`} className={styles.starIcon} />);
    }

    return (
        <div className={styles.starsContainer}>
            {stars}
        </div>
    );
};

export default StarRating;
