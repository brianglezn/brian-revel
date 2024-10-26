import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Avatar from '@/components/user/Avatar';
import styles from './page.module.css';
import MainMovie from '@/components/hero/MainMovie';

export default async function Home() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  if (!token) {
    return redirect('/login');
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Avatar alt="User Avatar" size="small" />
      </header>
      <section className={styles.hero}>
        <MainMovie />
      </section>
      <section className={styles.categories}></section>
      <section className={styles.soon}></section>
      <section className={styles.list}></section>
      <footer className={styles.footer}></footer>
    </div>
  );
}
