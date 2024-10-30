'use client'

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Avatar from '@/components/ui/Avatar';
import LogoutSidebar from '@/components/ui/LogoutSidebar';
import styles from './Header.module.css';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Función para alternar el estado de apertura/cierre del sidebar
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Función para manejar el logout del usuario y redirigir a la página de inicio de sesión
  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'GET',
    });
    router.push('/login');
  };

  // Función para navegar a la página principal
  const navigateHome = () => {
    router.push('/');
  };

  return (
    <>
      <header className={styles.header}>
        {pathname !== '/' && (
          <button onClick={navigateHome} className={styles.homeButton}>Home</button>
        )}
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
