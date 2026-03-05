export const easings = {
  smooth: [0.25, 0.1, 0.25, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  snappy: [0.6, 0.05, 0.01, 0.9] as const,
  elastic: [0.175, 0.885, 0.32, 1.275] as const,
};

export const durations = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  glacial: 1,
};

export const staggerDelays = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
};

export const fadeInUp = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: durations.slow, ease: easings.smooth },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: durations.normal },
};

export const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: durations.normal, ease: easings.smooth },
};

export const staggerContainer = (stagger = staggerDelays.normal) => ({
  animate: { transition: { staggerChildren: stagger } },
});

export const slideFromLeft = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: durations.slow, ease: easings.smooth },
};

export const slideFromRight = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: durations.slow, ease: easings.smooth },
};
