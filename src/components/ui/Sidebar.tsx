import { ReactNode } from 'react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Sidebar({ isOpen, onClose, children }: SidebarProps) {
  return (
    <>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.sidebarContent}>
          {children}
        </div>
      </div>
      {isOpen && <div className={styles.backdrop} onClick={onClose}></div>}
    </>
  );
}
