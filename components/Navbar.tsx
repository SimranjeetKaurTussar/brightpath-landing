"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const links = ["Courses", "Results", "Testimonials", "Location", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7 }}
      className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="font-display text-xl tracking-wide text-white">
          BrightPath
        </a>

        <div className="hidden items-center gap-7 text-sm text-zinc-300 md:flex">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="group relative">
              {link}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-emerald-300 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full border border-emerald-300/40 px-4 py-2 text-emerald-100 transition hover:bg-emerald-300/10"
          >
            Book Demo
          </a>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-t border-white/10 bg-[#0b0f0f]/95 px-5 py-4 md:hidden"
          >
            <div className="flex flex-col gap-4 text-zinc-200">
              {links.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
