"use server";

import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma'; // Sesuaikan path ini jika lib ada di tempat lain

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
  
  // Cari apakah IP ini sudah tersimpan
  const mapping = await prisma.ipMapping.findUnique({
    where: { ip }
  });
  
  if (mapping) {
    // Jika ada, ambil data user berdasarkan username dari IP tersebut
    const user = await prisma.user.findUnique({
      where: { username: mapping.username }
    });
    
    if (user) {
      return {
        username: user.username,
        hasCheckedIn: user.hasCheckedIn,
        sequence: user.sequence,
        isVip: user.isVip,
      };
    }
  }
  return null;
}

// 2. Register / Cocokkan Nama (Submit form awal)
export async function registerUser(name: string): Promise<UserSession> {
  const ip = await getIP();
  const cleanName = name.trim();
  const keyName = cleanName.toLowerCase();
  const isVip = keyName === 'katherine ariase';

  // Cari User, jika tidak ada, buat baru (Upsert)
  const user = await prisma.user.upsert({
    where: { username: keyName },
    update: {}, // Jika sudah ada, tidak ada yang diubah
    create: {
      username: keyName,
      isVip: isVip,
      hasCheckedIn: false,
    }
  });

  // Simpan / Perbarui pemetaan IP ke Username ini (Agar otomatis login selanjutnya)
  await prisma.ipMapping.upsert({
    where: { ip },
    update: { username: keyName },
    create: { ip, username: keyName }
  });

  return {
    username: user.username,
    hasCheckedIn: user.hasCheckedIn,
    sequence: user.sequence,
    isVip: user.isVip,
  };
}

// 3. Eksekusi Check-In (Tombol ditekan)
export async function performCheckIn(username: string): Promise<{ sequence: number, total: number }> {
  const keyName = username.toLowerCase();
  
  // Cari user
  const user = await prisma.user.findUnique({ where: { username: keyName } });
  if (!user) throw new Error("User not found");

  let currentTotal = 0;

  // Jika belum check-in, lakukan operasi atomic increment untuk counter
  if (!user.hasCheckedIn) {
    // Atomic increment: Aman dari bentrok (race condition) meskipun ditekan bersamaan
    const globalState = await prisma.globalState.upsert({
      where: { key: 'visitor_count' },
      update: { value: { increment: 1 } },
      create: { key: 'visitor_count', value: 1 }
    });

    currentTotal = globalState.value;

    // Update data pengguna bahwa dia sudah check-in
    await prisma.user.update({
      where: { username: keyName },
      data: {
        hasCheckedIn: true,
        sequence: currentTotal
      }
    });

    return { sequence: currentTotal, total: currentTotal };
  }

  // Jika sudah checkin sebelumnya, ambil total saat ini saja
  const state = await prisma.globalState.findUnique({ where: { key: 'visitor_count' } });
  return { sequence: user.sequence || 0, total: state?.value || 0 };
}

// 4. Ambil Total Pengunjung saat ini
export async function getTotalVisitors(): Promise<number> {
  const state = await prisma.globalState.findUnique({ where: { key: 'visitor_count' } });
  return state?.value || 0;
}