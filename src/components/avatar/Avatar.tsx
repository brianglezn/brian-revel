'use client'

import { useState } from 'react';
import Image from 'next/image';
import styles from './Avatar.module.css';

interface AvatarProps {
  alt?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function Avatar({ alt = 'User Avatar', size = 'medium' }: AvatarProps) {
  const [showLogout, setShowLogout] = useState(false);
  const dimensions = size === 'small' ? 40 : size === 'medium' ? 50 : 60;

  const handleAvatarClick = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'GET',
    });
    window.location.href = '/login';
  };

  return (
    <div className={styles.avatarContainer}>
      <Image
        className={`${styles.avatar} ${styles[size]}`}
        src="/user_pic.png"
        alt={alt}
        width={dimensions}
        height={dimensions}
        priority
        onClick={handleAvatarClick}
      />
      {showLogout && (
        <button className={styles.button} onClick={handleLogout}>
          Sign out
        </button>
      )}
    </div>
  );
}
