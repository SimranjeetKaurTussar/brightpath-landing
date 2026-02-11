"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  { value: "500+", label: "Students" },
  { value: "4.8", label: "Avg. Rating" },
  { value: "7+", label: "Years" },
];

export default function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-6xl px-4 pb-18 pt-16 sm:px-6 lg:px-8 lg:pt-24">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ y: [-12, 12, -12], x: [-10, 8, -10] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[5%] top-10 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl"
        />
        <motion.div
          animate={{ y: [8, -12, 8], x: [8, -14, 8] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[6%] top-32 h-80 w-80 rounded-full bg-cyan-300/15 blur-3xl"
        />
      </div>

      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mb-4 inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-xs font-medium tracking-[0.18em] text-emerald-200 uppercase"
          >
            Admissions Open — Free Demo Class
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="max-w-4xl font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Admissions Open. Learn with clarity, confidence, and results.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg"
          >
            BrightPath Academy in Mohali blends premium mentoring with modern learning systems,
            helping every student build language fluency and academic momentum.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="rounded-full bg-emerald-300 px-6 py-3 text-sm font-semibold text-[#06241b] transition hover:scale-[1.03]"
            >
              Book Free Demo
            </a>
            <a
              href="https://wa.me/917508799005"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-zinc-100 transition hover:border-emerald-200/60 hover:bg-white/5"
            >
              WhatsApp Us
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="relative hidden h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.4)] lg:block"
        >
          <Image src="/hero-placeholder.svg" alt="BrightPath visual" fill className="object-cover" priority />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="mt-12 grid max-w-2xl grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
      >
        {stats.map((item) => (
          <div key={item.label} className="rounded-xl border border-white/5 bg-black/20 p-4 text-center">
            <p className="text-2xl font-semibold text-white">{item.value}</p>
            <p className="text-xs tracking-wide text-zinc-400 uppercase">{item.label}</p>
          </div>
        ))}
      </motion.div>

      <motion.a
        href="#courses"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="mt-12 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-zinc-400 uppercase"
      >
        Scroll
        <span aria-hidden>↓</span>
      </motion.a>
    </section>
  );
}
