"use client";

import { motion, useReducedMotion } from "framer-motion";
import { container, hoverLift, item, transition } from "@/lib/motion";
import Image from "next/image";

const stats = [
  { value: "500+", label: "Students" },
  { value: "4.8", label: "Avg. Rating" },
  { value: "7+", label: "Years" },
];

export default function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="top" className="relative mx-auto max-w-6xl px-4 pb-18 pt-16 sm:px-6 lg:px-8 lg:pt-24">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={reducedMotion ? { y: 0 } : { y: [-12, 12, -12], x: [-10, 8, -10] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[5%] top-10 h-64 w-64 rounded-full bg-teal-300/25 blur-3xl"
        />
        <motion.div
          animate={reducedMotion ? { y: 0 } : { y: [8, -12, 8], x: [8, -14, 8] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[6%] top-32 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"
        />
      </div>

      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={container} initial="hidden" animate="show" transition={{ delayChildren: reducedMotion ? 0 : 0.2 }}>
          <motion.p
            variants={item}
            transition={{ delay: reducedMotion ? 0 : 0.2 }}
            className="mb-4 inline-flex rounded-full border border-teal-300/50 bg-teal-50 px-4 py-2 text-xs font-medium tracking-[0.18em] text-teal-700 uppercase"
          >
            Admissions Open — Free Demo Class
          </motion.p>

          <motion.h1
            variants={item}
            transition={{ delay: reducedMotion ? 0 : 0.35 }}
            className="max-w-4xl font-display text-4xl leading-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Admissions Open. Learn with clarity, confidence, and results.
          </motion.h1>

          <motion.p
            variants={item}
            transition={{ delay: reducedMotion ? 0 : 0.45 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            BrightPath Academy in Mohali blends premium mentoring with modern learning systems,
            helping every student build language fluency and academic momentum.
          </motion.p>

          <motion.div
            variants={item}
            transition={{ delay: reducedMotion ? 0 : 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#contact"
              whileHover={reducedMotion ? undefined : { y: -2, scale: 1.02, boxShadow: "0 12px 30px rgba(20,184,166,0.3)" }}
              transition={transition}
              className="rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white"
            >
              Book Free Demo
            </motion.a>
            <motion.a
              href="https://wa.me/917508799005"
              target="_blank"
              rel="noreferrer"
              whileHover={reducedMotion ? undefined : { y: -2, scale: 1.02 }}
              transition={transition}
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700"
            >
              WhatsApp Us
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={hoverLift}
          initial="rest"
          whileHover={reducedMotion ? undefined : "hover"}
          animate="rest"
          transition={{ delay: reducedMotion ? 0 : 0.6 }}
          className="relative hidden h-[400px] w-full overflow-hidden rounded-3xl border border-slate-200 bg-white/70 shadow-[0_20px_60px_rgba(2,8,23,0.15)] lg:block"
        >
          <motion.div
            animate={reducedMotion ? { y: 0 } : { y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-full"
          >
            <Image src="/hero-placeholder.jpg" alt="BrightPath visual" fill className="object-contain" priority />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        transition={{ delayChildren: reducedMotion ? 0 : 0.85 }}
        className="mt-12 grid max-w-2xl grid-cols-3 gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur"
      >
        {stats.map((itemData) => (
          <motion.div
            key={itemData.label}
            variants={item}
            whileHover={reducedMotion ? undefined : "hover"}
            initial="rest"
            animate="rest"
            className="rounded-xl border border-slate-100 bg-white p-4 text-center"
          >
            <p className="text-2xl font-semibold text-slate-900">{itemData.value}</p>
            <p className="text-xs tracking-wide text-slate-500 uppercase">{itemData.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.a
        href="#courses"
        animate={reducedMotion ? { y: 0 } : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="mt-12 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-slate-500 uppercase"
      >
        Scroll
        <span aria-hidden>↓</span>
      </motion.a>
    </section>
  );
}
