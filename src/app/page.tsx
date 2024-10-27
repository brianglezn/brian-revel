import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import HomeClient from '@/app/_home/HomeClient';

export default async function Home() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  if (!token) {
    return redirect('/login');
  }

  return (
    <HomeClient />
  );
}
