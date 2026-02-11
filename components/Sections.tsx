"use client";

import MotionReveal from "@/components/ui/MotionReveal";
import { container, hoverLift, item, stagger, transition } from "@/lib/motion";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

const courses = [
  { title: "IELTS", desc: "Targeted speaking, writing, and test strategy." },
  { title: "Spoken English", desc: "Build confidence with practical communication drills." },
  { title: "Tuition (Class 9-12)", desc: "Concept-first teaching with exam-focused guidance." },
  { title: "Interview Prep", desc: "Presence, structure, and delivery for modern interviews." },
];

const achievements = [
  { label: "Students Trained", value: 500 },
  { label: "Workshops Conducted", value: 120 },
  { label: "Parent Satisfaction", value: 96 },
];

const testimonials = [
  ["Ritika S.", "Classes felt structured and premium. My confidence improved within weeks."],
  ["Arjun M.", "Mentors are patient and clear. Weekly feedback really helped me progress."],
  ["Simran K.", "Loved the small batch format and personal attention in every session."],
  ["Harsh P.", "The environment is calm, serious, and focused on real outcomes."],
];

const features = [
  "Small focused batches",
  "Dedicated doubt sessions",
  "Weekly mock tests",
  "1:1 mentorship support",
  "Performance tracking",
  "Interview and communication labs",
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = 0;
    const duration = 900;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (startTime === null) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.round(start + (to - start) * progress));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView, to]);

  return <p ref={ref} className="text-4xl font-semibold text-slate-900">{count}</p>;
}

export default function Sections() {
  const [toast, setToast] = useState(false);
  const reducedMotion = useReducedMotion();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const phone = String(formData.get("phone") || "");
    const course = String(formData.get("course") || "");
    const message = String(formData.get("message") || "");

    const prefill = encodeURIComponent(
      `Hi BrightPath Academy,%0AName: ${name}%0APhone: ${phone}%0ACourse: ${course}%0AMessage: ${message}`,
    );
    window.open(`https://wa.me/919876543210?text=${prefill}`, "_blank", "noopener,noreferrer");
    setToast(true);
    setTimeout(() => setToast(false), 2400);
    event.currentTarget.reset();
  };

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-26 px-4 pb-24 sm:px-6 lg:px-8">
      <MotionReveal>
        <section id="courses" className="space-y-7">
          <h2 className="font-display text-3xl text-slate-900 sm:text-4xl">Courses designed for measurable growth</h2>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid gap-4 md:grid-cols-2">
            {courses.map((course, idx) => (
              <motion.article
                key={course.title}
                variants={item}
                initial="rest"
                animate="rest"
                whileHover={reducedMotion ? undefined : "hover"}
                transition={transition}
                className="card group relative overflow-hidden p-6"
              >
                <Image src={`/course-${(idx % 4) + 1}.svg`} alt={course.title} width={44} height={44} className="mb-4" />
                <h3 className="text-xl font-medium text-slate-900">{course.title}</h3>
                <p className="mt-2 text-slate-600">{course.desc}</p>
                <span className="mt-4 inline-block text-sm text-teal-700">Explore →</span>
              </motion.article>
            ))}
          </motion.div>
        </section>
      </MotionReveal>

      <MotionReveal>
        <section id="results" className="space-y-7">
          <h2 className="font-display text-3xl text-slate-900 sm:text-4xl">Results & achievements</h2>
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid gap-4 md:grid-cols-3">
            {achievements.map((itemData) => (
              <motion.article key={itemData.label} variants={item} className="card p-6 text-center">
                <Counter to={itemData.value} />
                <p className="mt-3 text-sm tracking-[0.2em] text-slate-500 uppercase">{itemData.label}</p>
              </motion.article>
            ))}
          </motion.div>
        </section>
      </MotionReveal>

      <MotionReveal>
        <section id="testimonials" className="space-y-7">
          <h2 className="font-display text-3xl text-slate-900 sm:text-4xl">What students say</h2>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid gap-4 md:grid-cols-2">
            {testimonials.map(([name, quote]) => (
              <motion.blockquote key={name} variants={item} whileHover={reducedMotion ? undefined : { y: -4, boxShadow: "0 20px 50px rgba(20,184,166,0.2)" }} transition={transition} className="card p-6">
                <p className="text-slate-700">“{quote}”</p>
                <footer className="mt-4 text-sm text-teal-700">— {name}</footer>
              </motion.blockquote>
            ))}
          </motion.div>
        </section>
      </MotionReveal>

      <MotionReveal>
        <section className="space-y-7">
          <h2 className="font-display text-3xl text-slate-900 sm:text-4xl">Why choose BrightPath</h2>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <motion.div key={feature} variants={item} whileHover={reducedMotion ? undefined : "hover"} initial="rest" animate="rest" className="card px-5 py-4">
                <p className="text-slate-700">✦ {feature}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </MotionReveal>

      <MotionReveal>
        <section id="location" className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <motion.div whileHover={reducedMotion ? undefined : "hover"} variants={hoverLift} initial="rest" animate="rest" className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <iframe
              title="BrightPath Academy Location"
              src="https://maps.google.com/maps?q=Mohali&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="h-72 w-full md:h-full"
              loading="lazy"
            />
          </motion.div>
          <article className="card p-6">
            <h3 className="text-xl text-slate-900">Location & Timings</h3>
            <p className="mt-4 text-slate-600">SCO 21, Sector 70, Mohali, Punjab</p>
            <p className="mt-2 text-slate-600">Mon - Sat: 8:00 AM - 8:00 PM</p>
            <p className="mt-2 text-slate-600">Sunday: By appointment</p>
            <p className="mt-4 text-teal-700">Call: +91 98765 43210</p>
          </article>
        </section>
      </MotionReveal>

      <MotionReveal>
        <section id="contact" className="card rounded-3xl p-6 sm:p-9">
          <h2 className="font-display text-3xl text-slate-900 sm:text-4xl">Let&apos;s plan your learning path</h2>
          <p className="mt-3 text-slate-600">Fill the details and we&apos;ll open WhatsApp with your message pre-filled.</p>
          <form onSubmit={onSubmit} className="mt-7 grid gap-4 md:grid-cols-2">
            <input name="name" required placeholder="Name" className="input" />
            <input name="phone" required placeholder="Phone" className="input" />
            <select name="course" required className="input">
              <option value="">Select course interest</option>
              {courses.map((course) => (
                <option key={course.title}>{course.title}</option>
              ))}
            </select>
            <input name="message" placeholder="Message" className="input" />
            <motion.button whileHover={reducedMotion ? undefined : { y: -2, scale: 1.01 }} transition={transition} className="rounded-xl bg-teal-500 px-5 py-3 font-semibold text-white md:col-span-2" type="submit">
              Send on WhatsApp
            </motion.button>
          </form>
        </section>
      </MotionReveal>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            transition={{ duration: reducedMotion ? 0.01 : 0.25 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-teal-300 bg-teal-500 px-4 py-2 text-sm font-medium text-white"
          >
            Message ready on WhatsApp
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
