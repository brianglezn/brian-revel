import styles from './MainIndicator.module.css';

// Definición de las propiedades esperadas para el componente MainIndicator
interface MainIndicatorProps {
  total: number; // Número total de indicadores a mostrar
  currentIndex: number; // Índice del indicador actualmente activo
  onIndicatorClick: (index: number) => void; // Función a ejecutar cuando se hace clic en un indicador
}

export default function MainIndicator({ total, currentIndex, onIndicatorClick }: MainIndicatorProps) {
  // Genera un array vacío con la longitud del número total de indicadores
  const indicators = Array.from({ length: total });

  return (
    <div className={styles.indicators}>
      {/* Mapeo de cada índice para renderizar un indicador correspondiente */}
      {indicators.map((_, index) => (
        <span
          key={index} // Clave única para cada indicador, usando el índice
          className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`} 
          // Aplica la clase 'active' si el indicador es el actual
          onClick={() => onIndicatorClick(index)} // Llama a la función de clic pasando el índice correspondiente
        />
      ))}
    </div>
  );
}
