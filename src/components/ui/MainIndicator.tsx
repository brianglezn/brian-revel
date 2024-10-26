import styles from './MainIndicator.module.css';

interface MainIndicatorProps {
  total: number;
  currentIndex: number;
  onIndicatorClick: (index: number) => void;
}

export default function MainIndicator({ total, currentIndex, onIndicatorClick }: MainIndicatorProps) {
  const indicators = Array.from({ length: total });

  return (
    <div className={styles.indicators}>
      {indicators.map((_, index) => (
        <span
          key={index}
          className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
          onClick={() => onIndicatorClick(index)}
        />
      ))}
    </div>
  );
}
