/**
 * GSAP Animation Utilities untuk Eid Mubarak Website
 * Centralized animation functions untuk reusability
 */

import gsap from 'gsap';

/**
 * Fade in dan slide down animation
 * Digunakan untuk header entrance
 */
export function fadeInSlideDown(
  element: HTMLElement | null,
  duration = 0.8,
  delay = 0
) {
  if (!element) return;

  gsap.fromTo(
    element,
    { opacity: 0, y: -20 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'cubic.out',
    }
  );
}

/**
 * Scale up entrance animation
 * Digunakan untuk hero text
 */
export function scaleUpEntrance(
  element: HTMLElement | null,
  duration = 1.2,
  delay = 0
) {
  if (!element) return;

  gsap.fromTo(
    element,
    { opacity: 0, y: 50, scale: 0.8 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      delay,
      ease: 'cubic.out',
    }
  );
}

/**
 * Text glow pulse animation
 * Digunakan untuk efek glow pada text
 */
export function textGlowPulse(
  element: HTMLElement | null,
  colors: string[] = [
    '0 0 20px rgba(255, 215, 0, 0.3), 0 0 40px rgba(102, 51, 153, 0.2)',
    '0 0 40px rgba(255, 215, 0, 0.6), 0 0 60px rgba(0, 128, 128, 0.3)',
    '0 0 20px rgba(255, 215, 0, 0.3), 0 0 40px rgba(102, 51, 153, 0.2)',
  ],
  duration = 3
) {
  if (!element) return;

  gsap.to(element, {
    keyframes: colors.map((color) => ({ textShadow: color })),
    duration,
    repeat: -1,
    ease: 'sine.inOut',
  });
}

/**
 * Rotating animation
 * Digunakan untuk crescent moon
 */
export function rotateInfinite(
  element: SVGElement | null,
  duration = 8,
  delay = 0
) {
  if (!element) return;

  gsap.to(element, {
    rotation: 360,
    duration,
    repeat: -1,
    delay,
    ease: 'none',
  });
}

/**
 * Particle entrance animation dengan stagger
 * Digunakan untuk particles di hero section
 */
export function particleEntrance(
  elements: NodeListOf<Element> | Element[] | null,
  duration = 1,
  staggerDelay = 0.1,
  baseDelay = 0
) {
  if (!elements || elements.length === 0) return;

  gsap.fromTo(
    elements,
    {
      opacity: 0,
      x: () => (Math.random() - 0.5) * 100,
      y: () => (Math.random() - 0.5) * 100,
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      stagger: staggerDelay,
      delay: baseDelay,
      ease: 'cubic.out',
    }
  );
}

/**
 * Particle floating animation
 * Digunakan untuk particles yang mengapung
 */
export function particleFloat(
  element: HTMLElement | null,
  duration = 2,
  delay = 0,
  yDistance = 20,
  xDistance = 30
) {
  if (!element) return;

  gsap.to(element, {
    y: -yDistance - Math.random() * yDistance,
    x: (Math.random() - 0.5) * xDistance,
    opacity: 0,
    duration,
    delay,
    repeat: -1,
    ease: 'sine.inOut',
  });
}

/**
 * Button click animation
 * Digunakan untuk check-in button
 */
export function buttonClickPulse(element: HTMLElement | null, duration = 0.2) {
  if (!element) return;

  gsap
    .timeline()
    .to(element, {
      scale: 1.05,
      duration,
    })
    .to(element, {
      scale: 1,
      duration,
    });
}

/**
 * Glow pulse animation untuk buttons
 * Continuous glow effect
 */
export function glowButtonPulse(
  element: HTMLElement | null,
  colors: string[] =[
    '0 0 10px rgba(255, 215, 0, 0.3), 0 0 20px rgba(102, 51, 153, 0.2)',
    '0 0 20px rgba(255, 215, 0, 0.5), 0 0 30px rgba(0, 128, 128, 0.3)',
    '0 0 10px rgba(255, 215, 0, 0.3), 0 0 20px rgba(102, 51, 153, 0.2)',
  ],
  duration = 2
) {
  if (!element) return;

  gsap.to(element, {
    // UBAH BAGIAN INI: Gunakan keyframes
    keyframes: colors.map((color) => ({ boxShadow: color })),
    duration,
    repeat: -1,
    ease: 'power1.inOut', // Catatan: 'ease-in-out' standar CSS biasanya ditulis 'power1.inOut' atau 'sine.inOut' di GSAP
  });
}

/**
 * Counter bounce animation
 * Digunakan saat visitor count update
 */
export function counterBounce(element: HTMLElement | null, duration = 0.3) {
  if (!element) return;

  gsap.to(element, {
    scale: 1.1,
    duration,
    yoyo: true,
    repeat: 1,
  });
}

/**
 * Fade in animation
 * General purpose fade in
 */
export function fadeIn(
  element: HTMLElement | null,
  duration = 0.8,
  delay = 0
) {
  if (!element) return;

  gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration,
      delay,
      ease: 'cubic.out',
    }
  );
}

/**
 * Slide up animation
 * Digunakan untuk entrance dari bawah
 */
export function slideUp(
  element: HTMLElement | null,
  duration = 0.8,
  delay = 0
) {
  if (!element) return;

  gsap.fromTo(
    element,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'cubic.out',
    }
  );
}

/**
 * Kill all animations pada element
 * Gunakan untuk cleanup
 */
export function killAnimations(element: HTMLElement | null) {
  if (!element) return;
  gsap.killTweensOf(element);
}

/**
 * Kill semua animasi GSAP
 * Gunakan untuk cleanup page
 */


export function killAllAnimations() {
  // Gunakan cara GSAP v3 untuk menghentikan & menghapus semua animasi
  gsap.globalTimeline.clear();
}

/**
 * Create timeline untuk complex animations
 * Contoh: sequenced animations
 */
export function createAnimationTimeline() {
  return gsap.timeline();
}

/**
 * Utility untuk responsive animation
 * Adjust duration berdasarkan screen size
 */
export function getResponsiveDuration(
  mobileValue = 0.5,
  desktopValue = 1.2
): number {
  if (typeof window === 'undefined') return desktopValue;

  const isMobile = window.innerWidth < 640;
  return isMobile ? mobileValue : desktopValue;
}

/**
 * Utility untuk mendapatkan responsive easing
 */
export function getResponsiveEasing() {
  return 'cubic.out';
}

export default {
  fadeInSlideDown,
  scaleUpEntrance,
  textGlowPulse,
  rotateInfinite,
  particleEntrance,
  particleFloat,
  buttonClickPulse,
  glowButtonPulse,
  counterBounce,
  fadeIn,
  slideUp,
  killAnimations,
  killAllAnimations,
  createAnimationTimeline,
  getResponsiveDuration,
  getResponsiveEasing,
};
