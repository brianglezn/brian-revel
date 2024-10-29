import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logoSection}>
          <h2 className={styles.logo}>Brian</h2>
          <p className={styles.tagline}>Web developer</p>
        </div>

        <div className={styles.linksSection}>
          <h3>Navigation</h3>
          <ul className={styles.linksList}>
            <li><a href="#">Movies</a></li>
            <li><a href="#">Genres</a></li>
            <li><a href="#">Coming Soon</a></li>
            <li><a href="#">My Favorites</a></li>
          </ul>
        </div>

        <div className={styles.contactSection}>
          <h3>Contact Us</h3>
          <p>Email: <a href="mailto:#">support@xxxx.com</a></p>
          <p>Phone: <a href="tel:#">+XX XXX XXX XXX</a></p>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} · <a href="https://brian-novoa.com/">brian-novoa.com</a></p>
      </div>
    </footer>
  );
}
