"use client";

import { motion, useReducedMotion } from "framer-motion";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Sections from "@/components/Sections";

export default function Home() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.9 }}
      className="relative overflow-x-clip"
    >
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,rgba(45,212,191,0.12),transparent_35%),radial-gradient(circle_at_90%_20%,rgba(14,116,144,0.12),transparent_30%),#f5f6f8]" />
      <Navbar />
      <Hero />
      <Sections />
      <Footer />

      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 md:hidden">
        <motion.a
          href="tel:+919876543210"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.82, duration: 0.45 }}
          whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
          className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(14,165,233,0.35)]"
        >
          Call Now
        </motion.a>

        <motion.a
          href="https://wa.me/919876543210?text=Hi%20BrightPath%20Academy%2C%20I%20want%20to%20book%20a%20free%20demo%20class."
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.9, duration: 0.45 }}
          whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
          className="inline-flex items-center gap-2 rounded-full border border-teal-300 bg-teal-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(20,184,166,0.35)]"
        >
          WhatsApp Demo
        </motion.a>
      </div>
    </motion.div>
  );
}
