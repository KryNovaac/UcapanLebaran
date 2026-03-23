/**
 * Custom Hooks untuk GSAP Animations
 * Reusable React hooks untuk animasi dalam Eid Mubarak website
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Hook untuk menangani entrance animation
 * Useful untuk fade-in, slide-in, atau scale animations
 */
export function useEntranceAnimation(
  selector: string | null,
  options = {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: 'cubic.out' },
  }
) {
  useEffect(() => {
    if (!selector) return;

    const element = document.querySelector(selector);
    if (!element) return;

    gsap.fromTo(element, options.from, options.to);

    return () => {
      gsap.killTweensOf(element);
    };
  }, [selector, options]);
}

/**
 * Hook untuk continuous glow pulse animation
 * Useful untuk text glow, button glow, dan efek cahaya lainnya
 */

export function useGlowPulseAnimation(
  ref: React.RefObject<HTMLElement | null>,
  colors: string[] =[
    '0 0 20px rgba(255, 215, 0, 0.3)',
    '0 0 40px rgba(255, 215, 0, 0.6)',
    '0 0 20px rgba(255, 215, 0, 0.3)',
  ],
  duration = 3
) {
  useEffect(() => {
    if (!ref.current) return;

    // Perbaikan: Gunakan keyframes karena kita menggunakan array (multiple steps)
    const tween = gsap.to(ref.current, {
      keyframes: colors.map((color) => ({ textShadow: color })),
      duration,
      repeat: -1,
      ease: 'sine.inOut',
    });

    return () => {
      tween.kill();
    };
  },[ref, colors, duration]);
}
/**
 * Hook untuk rotating animation
 * Useful untuk icons, badges, loading spinners
 */
export function useRotateAnimation(
  ref: React.RefObject<HTMLElement | SVGElement>,
  duration = 8,
  delay = 0
) {
  useEffect(() => {
    if (!ref.current) return;

    const tween = gsap.to(ref.current, {
      rotation: 360,
      duration,
      repeat: -1,
      ease: 'none',
      delay,
    });

    return () => {
      tween.kill();
    };
  }, [ref, duration, delay]);
}

/**
 * Hook untuk particle animation dengan auto-cleanup
 * Useful untuk background effects, entrance animations
 */
export function useParticleAnimation(
  ref: React.RefObject<HTMLDivElement>,
  selector = '.particle'
) {
  useEffect(() => {
    if (!ref.current) return;

    const particles = ref.current.querySelectorAll(selector);
    if (particles.length === 0) return;

    // Entrance animation
    gsap.fromTo(
      particles,
      {
        opacity: 0,
        x: () => (Math.random() - 0.5) * 100,
        y: () => (Math.random() - 0.5) * 100,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'cubic.out',
      }
    );

    // Floating animation
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        y: -20 - Math.random() * 20,
        x: (Math.random() - 0.5) * 30,
        opacity: 0,
        duration: 2,
        delay: 1.5 + index * 0.15,
        repeat: -1,
        ease: 'sine.inOut',
      });
    });

    return () => {
      gsap.killTweensOf(particles);
    };
  }, [ref, selector]);
}

/**
 * Hook untuk click animation (button feedback)
 * Useful untuk interactive elements yang perlu visual feedback
 */
export function useClickAnimation(
  ref: React.RefObject<HTMLButtonElement | HTMLDivElement>,
  onComplete?: () => void
) {
  const handleClick = (event: React.MouseEvent) => {
    if (!ref.current) return;

    gsap
      .timeline()
      .to(
        ref.current,
        {
          scale: 1.05,
          duration: 0.2,
        },
        0
      )
      .to(
        ref.current,
        {
          scale: 1,
          duration: 0.2,
        }
      );

    onComplete?.();
  };

  return { handleClick };
}

/**
 * Hook untuk scroll trigger animation
 * Useful untuk reveal elements saat di-scroll
 */
export function useScrollReveal(
  ref: React.RefObject<HTMLElement>,
  options = {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 0.8 },
  }
) {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(element, options.from, options.to);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, options]);
}

/**
 * Hook untuk counter animation
 * Useful untuk number animations seperti visitor counter
 */
export function useCounterAnimation(
  ref: React.RefObject<HTMLElement>,
  startValue = 0,
  endValue = 100,
  duration = 0.5
) {
  useEffect(() => {
    if (!ref.current) return;

    const counterObj = { value: startValue };
    const tween = gsap.to(counterObj, {
      value: endValue,
      duration,
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.floor(counterObj.value).toLocaleString('id-ID');
        }
      },
      ease: 'power2.out',
    });

    return () => {
      tween.kill();
    };
  }, [ref, startValue, endValue, duration]);
}

/**
 * Hook untuk managing multiple animations dengan timeline
 * Useful untuk complex sequenced animations
 */
export function useAnimationTimeline(deps: any[] = []) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!timelineRef.current) {
      timelineRef.current = gsap.timeline();
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, deps);

  return timelineRef.current;
}

/**
 * Hook untuk responsive animations
 * Automatically adjust animation parameters based on screen size
 */
export function useResponsiveAnimation(
  ref: React.RefObject<HTMLElement>,
  mobileOptions: any,
  desktopOptions: any
) {
  const getAnimationOptions = () => {
    if (typeof window === 'undefined') return desktopOptions;
    return window.innerWidth < 640 ? mobileOptions : desktopOptions;
  };

  useEffect(() => {
    if (!ref.current) return;

    const options = getAnimationOptions();
    const tween = gsap.to(ref.current, options);

    const handleResize = () => {
      tween.kill();
      const newOptions = getAnimationOptions();
      gsap.to(ref.current, newOptions);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      tween.kill();
    };
  }, [ref]);
}

/**
 * Hook untuk one-time animation
 * Animation yang hanya berjalan sekali (tidak di-repeat)
 */
export function useOneTimeAnimation(
  ref: React.RefObject<HTMLElement>,
  options: any,
  dependencies: any[] = []
) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!ref.current || hasRun.current) return;

    hasRun.current = true;
    gsap.to(ref.current, options);
  }, [ref, ...dependencies]);
}

/**
 * Hook untuk bounce animation
 * Useful untuk scale/bounce effects pada interaction
 */
export function useBounceAnimation(ref: React.RefObject<HTMLElement>) {
  const animate = (duration = 0.3) => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      scale: 1.1,
      duration,
      yoyo: true,
      repeat: 1,
    });
  };

  return { animate };
}

export default {
  useEntranceAnimation,
  useGlowPulseAnimation,
  useRotateAnimation,
  useParticleAnimation,
  useClickAnimation,
  useScrollReveal,
  useCounterAnimation,
  useAnimationTimeline,
  useResponsiveAnimation,
  useOneTimeAnimation,
  useBounceAnimation,
};
