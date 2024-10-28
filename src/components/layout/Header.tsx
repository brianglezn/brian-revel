'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/ui/Avatar';
import LogoutSidebar from '@/components/ui/LogoutSidebar';
import styles from './Header.module.css';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'GET',
    });
    router.push('/login');
  };

  return (
    <>
      <header className={styles.header}>
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
