import Avatar from '@/components/ui/Avatar';
import styles from './HomeHeader.module.css';

interface HomeHeaderProps {
  handleSidebarToggle: () => void;
}

export default function HomeHeader({ handleSidebarToggle }: HomeHeaderProps) {
  return (
    <header className={styles.header}>
      <Avatar alt="User Avatar" size="small" onClick={handleSidebarToggle} />
    </header>
  );
}
