"use client";

import Reveal from "@/components/Reveal";
import { hoverLift, item, stagger } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const gallery = [
  { src: "/gallery-1.svg", title: "Interactive speaking zone" },
  { src: "/gallery-2.svg", title: "Premium classroom studio" },
  { src: "/gallery-3.svg", title: "Mentor-led strategy board" },
  { src: "/gallery-4.svg", title: "Small-batch coaching" },
];

export default function GallerySection() {
  const reducedMotion = useReducedMotion();

  return (
    <Reveal>
      <section id="gallery" className="space-y-7">
        <h2 className="font-display text-3xl text-slate-900 sm:text-4xl">Inside BrightPath</h2>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {gallery.map((image) => (
            <motion.figure
              key={image.title}
              variants={item}
              initial="rest"
              animate="rest"
              whileHover={reducedMotion ? undefined : "hover"}
              className="card overflow-hidden"
            >
              <motion.div variants={hoverLift} className="relative h-52 w-full sm:h-60">
                <Image src={image.src} alt={image.title} fill className="object-cover" />
              </motion.div>
              <figcaption className="p-4 text-sm text-slate-600">{image.title}</figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </section>
    </Reveal>
  );
}
