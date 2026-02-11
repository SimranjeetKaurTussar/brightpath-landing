"use client";

import React, { ElementType, ReactNode, createElement, useEffect, useMemo, useRef, useState } from "react";

type AnyProps = Record<string, unknown> & { children?: ReactNode; className?: string; style?: React.CSSProperties };

type MotionValue = {
  get: () => number;
  set: (next: number) => void;
};

function useMergedStyle(initial: unknown, animate: unknown, transition: unknown) {
  const merged = useMemo(() => {
    const base = (typeof initial === "object" && initial ? initial : {}) as React.CSSProperties;
    const end = (typeof animate === "object" && animate ? animate : {}) as React.CSSProperties;
    const duration = typeof transition === "object" && transition && "duration" in transition
      ? Number((transition as { duration?: number }).duration) * 1000
      : 700;
    return { base, end, duration };
  }, [initial, animate, transition]);

  const [style, setStyle] = useState<React.CSSProperties>(merged.base);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setStyle({ ...merged.end, transition: `all ${merged.duration}ms cubic-bezier(0.22,1,0.36,1)` });
    });
    return () => cancelAnimationFrame(id);
  }, [merged]);

  return style;
}

function MotionFactory(tag: string | ElementType) {
  return function MotionComponent(props: AnyProps) {
    const {
      children,
      initial,
      animate,
      whileInView,
      whileHover,
      transition,
      viewport,
      ...rest
    } = props;

    const ref = useRef<HTMLElement | null>(null);
    const [visible, setVisible] = useState(!whileInView);
    const style = useMergedStyle(initial, visible ? (whileInView || animate) : initial, transition);

    useEffect(() => {
      if (!whileInView || !ref.current) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (viewport && typeof viewport === "object" && (viewport as { once?: boolean }).once) {
              observer.disconnect();
            }
          }
        },
        { threshold: 0.15 },
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    }, [whileInView, viewport]);

    return createElement(tag, {
      ...rest,
      ref,
      style: { ...(props.style as React.CSSProperties), ...style },
      onMouseEnter: () => {
        if (whileHover && typeof whileHover === "object") {
          setVisible(true);
        }
      },
    }, children);
  };
}

export const motion = new Proxy(
  {},
  {
    get: (_, tag: string) => MotionFactory(tag),
  },
) as Record<string, ReturnType<typeof MotionFactory>>;

export function AnimatePresence({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useInView<T extends Element>(ref: React.RefObject<T | null>, options?: { once?: boolean; amount?: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (options?.once) observer.disconnect();
        } else if (!options?.once) {
          setVisible(false);
        }
      },
      { threshold: options?.amount ?? 0.2 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options?.amount, options?.once, ref]);

  return visible;
}

export function useMotionValue(initialValue: number): MotionValue {
  const ref = useRef(initialValue);
  return {
    get: () => ref.current,
    set: (next) => {
      ref.current = next;
    },
  };
}

export function useSpring<T>(value: T) {
  return value;
}

export function useTransform<T, R>(value: T, transform: (latest: number) => R) {
  if (typeof value === "object" && value && "get" in (value as { get?: unknown })) {
    return transform(Number((value as unknown as MotionValue).get()));
  }
  return transform(Number(value));
}
