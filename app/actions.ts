// app/actions.ts
"use server";

import { kv } from '@vercel/kv';
import { headers } from 'next/headers';

export type UserSession = {
  username: string;
  hasCheckedIn: boolean;
  sequence: number | null;
  isVip: boolean;
};

// Fungsi internal untuk membaca IP pengunjung
const getIP = async () => {
  const FALLBACK_IP_ADDRESS = '0.0.0.0';
  const forwardedFor = (await headers()).get('x-forwarded-for');
  return forwardedFor ? forwardedFor.split(',')[0] : FALLBACK_IP_ADDRESS;
};

// 1. Cek Sesi (Dipanggil otomatis saat halaman dimuat)
export async function checkSession(): Promise<UserSession | null> {
  const ip = await getIP();
  const username = await kv.get<string>(`ip:${ip}`);
  
  if (username) {
    const userData = await kv.get<UserSession>(`user:${username.toLowerCase()}`);
    return userData || null;
  }
  return null;
}

// 2. Register / Cocokkan Nama (Submit form awal)
export async function registerUser(name: string): Promise<UserSession> {
  const ip = await getIP();
  const cleanName = name.trim();
  const keyName = cleanName.toLowerCase();
  const isVip = keyName === 'katherine ariase';

  // Cek apakah user ini sudah pernah ada di database
  const existingUser = await kv.get<UserSession>(`user:${keyName}`);
  
  if (existingUser) {
    // Ikat IP baru ke username yang sudah ada
    await kv.set(`ip:${ip}`, cleanName);
    return existingUser;
  }

  // Buat data baru jika belum ada
  const newUser: UserSession = {
    username: cleanName,
    hasCheckedIn: false,
    sequence: null,
    isVip: isVip,
  };

  await kv.set(`user:${keyName}`, newUser);
  await kv.set(`ip:${ip}`, cleanName);

  return newUser;
}

// 3. Eksekusi Check-In (Tombol ditekan)
export async function performCheckIn(username: string): Promise<{ sequence: number, total: number }> {
  const keyName = username.toLowerCase();
  const user = await kv.get<UserSession>(`user:${keyName}`);

  if (!user) throw new Error("User not found");

  let currentTotal = await kv.get<number>('global:visitor_count') || 0;

  // Jika belum check-in, tambah counter
  if (!user.hasCheckedIn) {
    // Atomic increment untuk mencegah race condition (aman dari exploit)
    currentTotal = await kv.incr('global:visitor_count');
    
    user.hasCheckedIn = true;
    user.sequence = currentTotal;
    await kv.set(`user:${keyName}`, user);
  }

  return { sequence: user.sequence || currentTotal, total: currentTotal };
}

// 4. Ambil Total Pengunjung saat ini
export async function getTotalVisitors(): Promise<number> {
  return (await kv.get<number>('global:visitor_count')) || 0;
}