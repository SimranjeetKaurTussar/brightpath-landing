"use client";

import { blurIn } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  once?: boolean;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.2,
  once = true,
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={blurIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ duration: reducedMotion ? 0.01 : 0.75, delay: reducedMotion ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
