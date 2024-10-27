import Avatar from '@/components/ui/Avatar';
import styles from './Header.module.css';

interface HomeHeaderProps {
  handleSidebarToggle: () => void;
}

export default function Header({ handleSidebarToggle }: HomeHeaderProps) {
  return (
    <header className={styles.header}>
      <Avatar alt="User Avatar" size="small" onClick={handleSidebarToggle} />
    </header>
  );
}
