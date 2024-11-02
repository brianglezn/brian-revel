'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Avatar from '@/components/ui/Avatar';
import LogoutSidebar from '@/components/ui/LogoutSidebar';
import styles from './Header.module.css';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // useEffect que escucha el evento de scroll en Y
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para alternar la apertura y cierre del sidebar de logout
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Función para gestionar el logout y redirigir al usuario a la página /login
  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'GET',
    });
    router.push('/login');
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>

        <nav className={styles.navMenu}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/#genres" className={styles.navLink}>Genres</Link>
          <Link href="/#soon" className={styles.navLink}>Soon</Link>
          <Link href="/#list" className={styles.navLink}>My List</Link>
        </nav>

        <Avatar alt="User Avatar" size="small" onClick={handleSidebarToggle} />
      </header>

      <LogoutSidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebarToggle}
        onLogout={handleLogout}
      />
    </>
  );
}
