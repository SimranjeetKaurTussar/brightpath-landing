"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { fadeIn, hoverLift, item, transition } from "@/lib/motion";
import { useState } from "react";

const links = ["Courses", "Results", "Testimonials", "Location", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <motion.header
      variants={fadeIn}
      initial="hidden"
      animate="show"
      transition={{ duration: reducedMotion ? 0.01 : 0.55 }}
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/75 backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <motion.a href="#top" variants={item} className="font-display text-xl tracking-wide text-slate-900">
          BrightPath
        </motion.a>

        <div className="hidden items-center gap-7 text-sm text-slate-600 md:flex">
          {links.map((link) => (
            <motion.a key={link} href={`#${link.toLowerCase()}`} className="group relative" whileHover={reducedMotion ? undefined : "hover"} variants={hoverLift} initial="rest" animate="rest">
              {link}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-teal-500 transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            whileHover={reducedMotion ? undefined : { y: -2, scale: 1.02 }}
            transition={transition}
            className="rounded-full border border-teal-300/80 px-4 py-2 text-teal-700 transition hover:bg-teal-50"
          >
            Book Demo
          </motion.a>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-900 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(3px)" }}
            transition={{ duration: reducedMotion ? 0.01 : 0.28 }}
            className="border-t border-slate-200 bg-white/95 px-5 py-4 md:hidden"
          >
            <div className="flex flex-col gap-4 text-slate-700">
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
