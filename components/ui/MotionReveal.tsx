"use client";

import Reveal from "@/components/Reveal";
import { ReactNode } from "react";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function MotionReveal({ children, className, delay = 0 }: MotionRevealProps) {
  return (
    <Reveal className={className} delay={delay}>
      {children}
    </Reveal>
  );
}
