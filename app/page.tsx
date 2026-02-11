"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Sections from "@/components/Sections";

const sequence = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      variants={sequence}
      className="relative overflow-x-clip"
    >
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,rgba(45,212,191,0.08),transparent_35%),radial-gradient(circle_at_90%_20%,rgba(16,185,129,0.08),transparent_30%),#060909]" />
      <Navbar />
      <Hero />
      <Sections />
      <Footer />

      <a
        href="https://wa.me/919876543210?text=Hi%20BrightPath%20Academy%2C%20I%20want%20to%20book%20a%20free%20demo%20class."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-400/90 px-4 py-3 text-sm font-semibold text-[#052016] shadow-[0_12px_40px_rgba(16,185,129,0.35)] transition hover:scale-105 md:hidden"
      >
        WhatsApp Demo
      </a>
    </motion.div>
  );
}
