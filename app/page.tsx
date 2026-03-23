// app/page.tsx
import { checkSession, getTotalVisitors } from './actions';
import EidGreetingClient from './client-page'; // Kita pindahkan kode UI lama ke file baru

export const dynamic = 'force-dynamic'; // Selalu eksekusi cek IP terbaru

export default async function Page() {
  // Cek secara aman dari server, apakah IP ini punya sesi?
  const initialSession = await checkSession();
  const totalVisitors = await getTotalVisitors();

  return (
    <EidGreetingClient 
      initialSession={initialSession} 
      initialTotal={totalVisitors} 
    />
  );
}