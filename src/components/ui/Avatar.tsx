import Image from 'next/image';
import styles from './Avatar.module.css';

// Interfaz para las propiedades del componente Avatar
interface AvatarProps {
  alt?: string; // Texto alternativo para la imagen del avatar
  size?: 'small' | 'medium' | 'large'; // Tamaño del avatar ('small', 'medium', o 'large')
  onClick: () => void; // Función que se ejecuta al hacer clic en el avatar
}

// Componente Avatar que muestra una imagen de usuario, configurable en tamaño y con funcionalidad de clic
export default function Avatar({ alt = 'User Avatar', size = 'medium', onClick }: AvatarProps) {
  // Define las dimensiones de la imagen en función del tamaño proporcionado en las props
  const dimensions = size === 'small' ? 40 : size === 'medium' ? 50 : 60;

  return (
    <div className={styles.avatarContainer}>
      <Image
        className={`${styles.avatar} ${styles[size]}`}
        src="/user_pic.png" // Ruta de la imagen del avatar, esto en un futuro vendrá como prop
        alt={alt} // Texto alternativo para accesibilidad y SEO
        width={dimensions} // Ancho de la imagen según el tamaño
        height={dimensions} // Alto de la imagen según el tamaño
        priority // Prioriza la carga de esta imagen en la página para mejorar rendimiento
        onClick={onClick} // Llama a la función onClick cuando se hace clic en la imagen
      />
    </div>
  );
}
