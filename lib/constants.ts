/**
 * Design Constants - Eid Mubarak Website
 * Centralized configuration untuk colors, spacing, typography, dan lainnya
 */

// ===== COLOR PALETTE =====
export const COLORS = {
  // Primary Colors
  primary: '#ffd700',
  primaryLight: '#ffed4e',
  primaryDark: '#ff9500',

  // Background & Foreground
  background: '#000000',
  foreground: '#ffffff',
  card: '#0a0a0a',

  // Neutrals
  border: '#1a1a1a',
  muted: '#333333',
  mutedForeground: '#999999',

  // Status Colors
  success: '#22c55e',
  error: '#ff4444',
  warning: '#ff9500',
  info: '#3b82f6',

  // Glow Effects
  glowGold: 'rgba(255, 215, 0, 0.3)',
  glowPurple: 'rgba(102, 51, 153, 0.5)',
  glowTeal: 'rgba(0, 128, 128, 0.5)',
} as const;

// ===== TYPOGRAPHY =====
export const TYPOGRAPHY = {
  fontFamily: {
    primary: "'Poppins', sans-serif",
    mono: "'Courier New', monospace",
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
} as const;

// ===== SPACING =====
export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
  '3xl': '3rem',
  '4xl': '4rem',
  '5xl': '5rem',
} as const;

// ===== BREAKPOINTS =====
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
  ultraWide: 1536,
} as const;

// ===== ANIMATION DURATIONS (in seconds) =====
export const ANIMATION_DURATIONS = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
  extraSlow: 1.2,
  // Specific animations
  headerEntrance: 0.8,
  heroEntrance: 1.2,
  particleEntrance: 1,
  particleFloat: 2,
  glowPulse: 2,
  crescent: 8,
  fadeIn: 0.8,
} as const;

// ===== ANIMATION EASING =====
export const ANIMATION_EASING = {
  cubic: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  cubicOut: 'cubic.out',
  cubicIn: 'cubic.in',
  sine: 'sine.inOut',
  sine_out: 'sine.out',
  ease_in_out: 'ease-in-out',
  linear: 'none',
} as const;

// ===== BORDER RADIUS =====
export const BORDER_RADIUS = {
  none: '0',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
} as const;

// ===== BOX SHADOW =====
export const BOX_SHADOW = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  glow: '0 0 20px rgba(255, 215, 0, 0.1)',
  glowIntense: '0 0 30px rgba(255, 215, 0, 0.3)',
} as const;

// ===== CONTENT STRINGS =====
export const STRINGS = {
  header: {
    title: 'EID MUBARAK',
  },
  hero: {
    mainGreeting: 'SELAMAT HARI RAYA EID MUBARAK',
    subGreeting: 'MOHON MAAF LAHIR & BATIN',
  },
  interactive: {
    checkInButton: 'TEKAN UNTUK CHECK IN',
    checkInButtonSuccess: '✓ TERIMA KASIH',
    visitorCountLabel: 'Total Pengunjung',
    visitorCountSuffix: 'Orang telah hadir',
    statusMessage: '(Tidak ada kode, THR sudah habis!)',
  },
  footer: {
    copyright: '© 2026 EID GREETINGS. ALL RIGHTS RESERVED.',
    brand: 'EID',
    sections: {
      menu: 'Menu',
      information: 'Informasi',
      contact: 'Hubungi Kami',
    },
  },
} as const;

// ===== PARTICLE CONFIGURATION =====
export const PARTICLE_CONFIG = {
  count: 8,
  sizeMin: 4,
  sizeMax: 8,
  opacityMin: 0.3,
  opacityMax: 1,
} as const;

// ===== BUTTON CONFIGURATION =====
export const BUTTON_CONFIG = {
  minHeight: 44,
  minWidth: 44,
  paddingMobile: '1rem 2rem',
  paddingDesktop: '1.25rem 3rem',
} as const;

// ===== RESPONSIVE VALUES =====
export const RESPONSIVE = {
  isMobile: (width: number) => width < BREAKPOINTS.mobile,
  isTablet: (width: number) => width >= BREAKPOINTS.mobile && width < BREAKPOINTS.desktop,
  isDesktop: (width: number) => width >= BREAKPOINTS.desktop,
} as const;

// ===== PAGE METADATA =====
export const METADATA = {
  title: 'Selamat Hari Raya Eid Mubarak | Eid Greetings 2026',
  description: 'Rayakan momen istimewa dengan ucapan Eid Mubarak yang penuh berkah dan kebersamaan. Bergabunglah dengan ribuan pengunjung lainnya.',
  keywords: 'Eid Mubarak, Hari Raya, Idul Fitri, Idul Adha, Ucapan Selamat',
  author: 'Eid Greetings Team',
  language: 'id',
  themeColor: '#000000',
} as const;

// ===== SOCIAL & LINKS =====
export const LINKS = {
  footer: {
    home: '#',
    greeting: '#',
    team: '#',
    about: '#',
    privacy: '#',
    terms: '#',
    contact: 'mailto:info@eid.id',
    phone: 'tel:+62123456789',
  },
} as const;

// ===== FEATURE FLAGS =====
export const FEATURES = {
  animationsEnabled: true,
  darkModeEnforced: true,
  particleEffectsEnabled: true,
  glowEffectsEnabled: true,
  soundEnabled: false,
} as const;

// ===== UTILITY FUNCTIONS =====
export function getResponsiveValue<T>(
  mobile: T,
  desktop: T,
  width: number
): T {
  return RESPONSIVE.isMobile(width) ? mobile : desktop;
}

export function getResponsiveFontSize(width: number): string {
  if (RESPONSIVE.isMobile(width)) return TYPOGRAPHY.fontSize['4xl'];
  if (RESPONSIVE.isTablet(width)) return TYPOGRAPHY.fontSize['5xl'];
  return TYPOGRAPHY.fontSize['7xl'];
}

export function getAnimationDuration(
  type: keyof typeof ANIMATION_DURATIONS
): number {
  return parseFloat(ANIMATION_DURATIONS[type].toString());
}

// Type exports untuk TypeScript
export type Colors = typeof COLORS;
export type Typography = typeof TYPOGRAPHY;
export type Spacing = typeof SPACING;
export type Breakpoints = typeof BREAKPOINTS;

export default {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BREAKPOINTS,
  ANIMATION_DURATIONS,
  ANIMATION_EASING,
  BORDER_RADIUS,
  BOX_SHADOW,
  STRINGS,
  PARTICLE_CONFIG,
  BUTTON_CONFIG,
  RESPONSIVE,
  METADATA,
  LINKS,
  FEATURES,
  // Utility functions
  getResponsiveValue,
  getResponsiveFontSize,
  getAnimationDuration,
};
