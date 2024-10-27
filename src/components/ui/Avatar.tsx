import Image from 'next/image';
import styles from './Avatar.module.css';

interface AvatarProps {
  alt?: string;
  size?: 'small' | 'medium' | 'large';
  onClick: () => void;
}

export default function Avatar({ alt = 'User Avatar', size = 'medium', onClick }: AvatarProps) {
  const dimensions = size === 'small' ? 40 : size === 'medium' ? 50 : 60;

  return (
    <div className={styles.avatarContainer}>
      <Image
        className={`${styles.avatar} ${styles[size]}`}
        src="/user_pic.png"
        alt={alt}
        width={dimensions}
        height={dimensions}
        priority
        onClick={onClick}
      />
    </div>
  );
}
