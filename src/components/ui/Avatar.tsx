import Image from 'next/image';
import styles from './Avatar.module.css';

// Interfaz para las propiedades del componente Avatar
interface AvatarProps {
  alt?: string; 
  size?: 'small' | 'medium' | 'large';
  onClick: () => void; 
}

export default function Avatar({ alt = 'User Avatar', size = 'medium', onClick }: AvatarProps) {
  // Define las dimensiones de la imagen en función del tamaño proporcionado en las props
  const dimensions = size === 'small' ? 40 : size === 'medium' ? 50 : 60;

  return (
    <div className={styles.avatarContainer}>
      <Image
        className={`${styles.avatar} ${styles[size]}`}
        src="/user_pic.png" // Ruta de la imagen del avatar, esto en un futuro vendrá como prop
        alt={alt} 
        width={dimensions} 
        height={dimensions}
        priority
        onClick={onClick}
      />
    </div>
  );
}
