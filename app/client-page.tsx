// app/client-page.tsx
"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { toast } from 'sonner';
import { PackageOpen, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { AceternityMoon } from '@/components/ui/aceternity-moon';
import Image from 'next/image';
import { registerUser, performCheckIn, type UserSession } from './actions';

interface Props {
  initialSession: UserSession | null;
  initialTotal: number;
}

export default function EidGreetingClient({ initialSession, initialTotal }: Props) {
  // === STATES ===
  const [step, setStep] = useState<'intro' | 'main'>(initialSession ? 'main' : 'intro');
  const [session, setSession] = useState<UserSession | null>(initialSession);
  const [totalVisitors, setTotalVisitors] = useState(initialTotal);
  
  // Modal State
  const [showRewardModal, setShowRewardModal] = useState(false);
  const[qrImageError, setQrImageError] = useState(false);

  // === REFS ===
  const introRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // === GSAP ANIMATIONS ===
  useGSAP(() => {
    if (step === 'intro') {
      gsap.fromTo(".gsap-intro-item", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 }
      );
    } else if (step === 'main') {
      gsap.fromTo(".gsap-main-item", 
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "expo.out", delay: 0.1 }
      );
      gsap.to(".particle-aura", {
        scale: 1.2, opacity: 0.6, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut"
      });
    }
  }, { dependencies: [step] });

  // === HANDLERS ===
  const handleEnterSite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    
    if (!name.trim()) return toast.error("Mohon isi nama Anda.");

    const loadToast = toast.loading("Memverifikasi...");
    try {
      const userSession = await registerUser(name);
      setSession(userSession);
      setStep('main');
      toast.success("Berhasil masuk!", { id: loadToast });
    } catch (error) {
      toast.error("Terjadi kesalahan server.", { id: loadToast });
    }
  };

  const handleCheckIn = async () => {
    if (!session) return;
    const loadToast = toast.loading("Mencatat kehadiran...");

    try {
      const { sequence, total } = await performCheckIn(session.username);
      
      setSession({ ...session, hasCheckedIn: true, sequence });
      setTotalVisitors(total);
      
      toast.success("Kehadiran Berhasil Tercatat!", { id: loadToast });

      // Cek Logika Hadiah: Katherine atau Visitor <= 50
      if (session.isVip || sequence <= 50) {
        setTimeout(() => setShowRewardModal(true), 800); // Tunda sedikit agar dramatis
      }

      // Animasi panel checkin
      setTimeout(() => {
        gsap.fromTo(".post-checkin-element",
          { opacity: 0, height: 0, y: 20 },
          { opacity: 1, height: 'auto', y: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.2)" }
        );
      }, 100);

    } catch (error) {
      toast.error("Gagal mencatat kehadiran.", { id: loadToast });
    }
  };

  // Tentukan path gambar berdasarkan user
  const qrImagePath = session?.isVip 
    ? "/assets/qrs/katherine-vip.png" 
    : "/assets/qrs/reward-general.png";

  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center relative px-6 py-8 mx-auto w-full max-w-md overflow-hidden bg-black text-white">
      <div 
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("/assets/patterns/flowing_mosque_geometric.svg")', backgroundSize: 'cover' }}
      />

      <AnimatePresence mode="wait">
        
        {/* ================= PHASE 1: INTRO SCREEN ================= */}
        {step === 'intro' && (
          <motion.div 
            key="intro"
            ref={introRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center w-full z-10"
          >
            <div className="gsap-intro-item mb-8">
              <AceternityMoon className="w-20 h-20" />
            </div>
            
            <h1 className="gsap-intro-item text-2xl font-light tracking-widest mb-2 text-neutral-300">Menyambut</h1>
            <h2 className="gsap-intro-item text-4xl font-extrabold gold-text-gradient drop-shadow-lg mb-12 text-center">MOMEN FITRI</h2>

            <form onSubmit={handleEnterSite} className="gsap-intro-item w-full flex flex-col gap-4">
              <input 
                type="text" 
                name="name"
                placeholder="Masukkan nama Anda..."
                className="w-full bg-neutral-900/50 border border-neutral-700/50 rounded-xl px-5 py-4 text-center text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#FFD700]/50 focus:ring-1 transition-all"
              />
              <button 
                type="submit"
                className="group w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#FFD700] transition-colors duration-300"
              >
                Lanjutkan <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        )}

        {/* ================= PHASE 2: MAIN SCREEN ================= */}
        {step === 'main' && session && (
          <motion.div 
            key="main"
            ref={mainRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center justify-between w-full h-full min-h-[85vh] z-10"
          >
            <header className="gsap-main-item w-full flex flex-col items-center gap-1 pt-2">
              <AceternityMoon className="w-10 h-10 mb-2 scale-75" />
              <span className="tracking-[0.25em] text-[9px] font-bold text-neutral-500 uppercase">Eid Mubarak 1447 H</span>
            </header>

            <section className="flex-1 flex flex-col items-center justify-center text-center w-full relative py-12">
              <div className="particle-aura absolute inset-0 -z-10 blur-[80px] opacity-30 bg-gradient-to-tr from-[#663399] to-[#008080] rounded-full w-[250px] h-[250px] mx-auto top-1/2 -translate-y-1/2 pointer-events-none" />

              <h2 className="gsap-main-item text-neutral-300 font-medium tracking-widest text-sm mb-3">SELAMAT IDUL FITRI,</h2>
              <h1 className="gsap-main-item text-4xl sm:text-5xl font-black leading-tight gold-text-gradient drop-shadow-2xl capitalize">
                {session.username}
              </h1>
              <p className="gsap-main-item text-xs text-neutral-400 mt-4 max-w-[80%] leading-relaxed">
                Taqabbalallahu minna wa minkum. Mohon maaf lahir dan batin atas segala khilaf.
              </p>
            </section>

            <section className="gsap-main-item w-full flex flex-col items-center gap-4 pb-4">
              {!session.hasCheckedIn ? (
                <button
                  onClick={handleCheckIn}
                  className="aura-glow-button w-full py-4 rounded-xl text-[14px] font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(255,215,0,0.15)]"
                >
                  Ambil Kehadiran & THR
                </button>
              ) : (
                <div className="w-full flex flex-col gap-4">
                  {/* Status Tercatat */}
                  <div className="post-checkin-element flex flex-col items-center bg-[#111]/80 border border-neutral-800 rounded-2xl p-5 w-full backdrop-blur-md">
                    <CheckCircle2 className="text-green-400 w-8 h-8 mb-2" />
                    <span className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest mb-2 text-center">Kehadiran Tercatat</span>
                    <div className="text-center">
                      <p className="text-white text-sm mb-1">
                        Anda pengunjung ke- <span className="text-[#FFD700] font-bold text-lg">{session.sequence}</span>
                      </p>
                      <p className="text-neutral-500 text-[11px]">dari total {totalVisitors} kerabat.</p>
                    </div>
                  </div>

                  {/* Jika bukan VIP dan Sequence > 50, Tampilkan Hadiah Kosong */}
                  {(!session.isVip && (session.sequence ?? 0) > 50) && (
                    <div className="post-checkin-element flex flex-col items-center text-center gap-3 bg-[#1A1510]/80 px-6 py-6 w-full rounded-2xl border border-[#3A2D1C] backdrop-blur-md relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#2A2010]/40 to-transparent pointer-events-none" />
                      <div className="relative p-3 bg-neutral-900/80 rounded-full border border-neutral-800 shadow-inner">
                        <PackageOpen className="w-6 h-6 text-amber-500/80" strokeWidth={1.5} />
                      </div>
                      <p className="relative text-neutral-400 text-xs font-medium tracking-wide">
                        (yah.. hadiah thr sudah habis, tahun depan ya!)
                      </p>
                    </div>
                  )}

                  {/* Jika dapat hadiah (sudah ditutup modalnya), tampilkan tombol buka kembali modal */}
                  {(session.isVip || (session.sequence ?? 0) <= 50) && (
                    <button 
                      onClick={() => setShowRewardModal(true)}
                      className="post-checkin-element w-full py-3 bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] rounded-xl text-xs font-bold uppercase tracking-widest"
                    >
                      Lihat Hadiah THR Anda
                    </button>
                  )}
                </div>
              )}
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MODAL HADIAH QR (Framer Motion) ================= */}
      <AnimatePresence>
        {showRewardModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRewardModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-[#111] border border-[#FFD700]/40 rounded-3xl p-6 shadow-[0_0_40px_rgba(255,215,0,0.15)] flex flex-col items-center text-center overflow-hidden"
            >
              <button 
                onClick={() => setShowRewardModal(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold gold-text-gradient mb-2 uppercase tracking-widest mt-4">
                Selamat!
              </h3>
              <p className="text-xs text-neutral-300 mb-6 leading-relaxed">
                Anda mendapatkan THR spesial! {session?.isVip ? "Khusus untuk Anda yang istimewa." : "Karena Anda termasuk pengunjung beruntung."} Silakan scan QR Code di bawah ini.
              </p>

              <div className="relative w-48 h-48 bg-white rounded-xl p-2 mb-4 flex items-center justify-center">
                {!qrImageError ? (
                  <Image 
                    src={qrImagePath}
                    alt="QR Code THR"
                    fill
                    className="object-cover rounded-lg p-2"
                    onError={() => setQrImageError(true)} // Tembak state error jika gambar tidak ada
                  />
                ) : (
                  // FALLBACK Jika gambar tidak ada / ditarik
                  <div className="text-center p-2 flex flex-col items-center justify-center h-full">
                    <PackageOpen className="w-8 h-8 text-red-500 mb-2" />
                    <p className="text-red-600 font-bold text-[10px] leading-tight uppercase">
                      QR sudah ditarik. Total hadiah sudah diambil. Mohon hubungi admin.
                    </p>
                  </div>
                )}
              </div>

              <p className="text-[10px] text-neutral-500 uppercase tracking-widest">
                {session?.isVip ? 'VIP REWARD' : 'EARLY BIRD REWARD'}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}