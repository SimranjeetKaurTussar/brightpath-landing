"use client";

import React, { ElementType, ReactNode, createElement, useEffect, useMemo, useRef, useState } from "react";

type AnyProps = Record<string, unknown> & {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

type VariantValue = Record<string, unknown>;
type Variants = Record<string, VariantValue>;

function readVariant(input: unknown, keyOrObject: unknown): VariantValue {
  if (typeof keyOrObject === "object" && keyOrObject) return keyOrObject as VariantValue;
  if (typeof keyOrObject === "string" && input && typeof input === "object") {
    const map = input as Variants;
    return (map[keyOrObject] ?? {}) as VariantValue;
  }
  if (input && typeof input === "object") return input as VariantValue;
  return {};
}

function toStyle(variant: VariantValue) {
  const style: React.CSSProperties = {};
  if (variant.opacity !== undefined) style.opacity = Number(variant.opacity);

  const transforms: string[] = [];
  if (variant.y !== undefined) transforms.push(`translateY(${Number(variant.y)}px)`);
  if (variant.x !== undefined) transforms.push(`translateX(${Number(variant.x)}px)`);
  if (variant.scale !== undefined) transforms.push(`scale(${Number(variant.scale)})`);
  if (transforms.length) style.transform = transforms.join(" ");

  if (variant.filter !== undefined) style.filter = String(variant.filter);
  if (variant.boxShadow !== undefined) style.boxShadow = String(variant.boxShadow);

  return style;
}

function durationFromTransition(transition: unknown) {
  if (transition && typeof transition === "object" && "duration" in transition) {
    return Number((transition as { duration?: number }).duration ?? 0.7) * 1000;
  }
  return 700;
}

function MotionFactory(tag: string | ElementType) {
  return function MotionComponent(props: AnyProps) {
    const {
      children,
      initial,
      animate,
      exit,
      variants,
      whileInView,
      whileHover,
      transition,
      viewport,
      style,
      ...rest
    } = props;

    const ref = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState(!whileInView);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
      if (!whileInView || !ref.current) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (viewport && typeof viewport === "object" && (viewport as { once?: boolean }).once) {
              observer.disconnect();
            }
          } else if (!(viewport && typeof viewport === "object" && (viewport as { once?: boolean }).once)) {
            setInView(false);
          }
        },
        { threshold: Number((viewport && typeof viewport === "object" && (viewport as { amount?: number }).amount) ?? 0.2) },
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    }, [viewport, whileInView]);

    const current = useMemo(() => {
      const initialV = readVariant(variants, initial);
      const animateV = readVariant(variants, animate);
      const inViewV = readVariant(variants, whileInView);
      const hoverV = readVariant(variants, whileHover);

      if (hovered && whileHover) return hoverV;
      if (inView && whileInView) return inViewV;
      if (animate) return animateV;
      return initialV;
    }, [animate, hovered, inView, initial, variants, whileHover, whileInView]);

    const animationStyle = toStyle(current);

    return createElement(
      tag,
      {
        ...rest,
        ref,
        style: {
          ...(style as React.CSSProperties),
          ...animationStyle,
          transition: `all ${durationFromTransition(transition)}ms cubic-bezier(0.22,1,0.36,1)`,
          willChange: "transform, opacity, filter",
        },
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
        'data-exit': exit ? 'true' : undefined,
      },
      children,
    );
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

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}
