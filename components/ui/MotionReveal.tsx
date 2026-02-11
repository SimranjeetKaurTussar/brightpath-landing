"use client";

import { blurIn } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function MotionReveal({ children, className, delay = 0 }: MotionRevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={blurIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.75, delay: reducedMotion ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
