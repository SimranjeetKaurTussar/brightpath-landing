export type Variants = Record<string, Record<string, unknown>>;

export const transition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
};

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition },
};

export const hoverLift: Variants = {
  rest: { y: 0, scale: 1, boxShadow: "0 10px 30px rgba(15,23,42,0.08)" },
  hover: {
    y: -6,
    scale: 1.01,
    boxShadow: "0 20px 50px rgba(20,184,166,0.22)",
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};
