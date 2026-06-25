'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, Transition } from 'motion/react';

export type BorderTrailProps = {
  className?: string;
  size?: number;
  /** Fixed trail length in px (overrides square `size` mode). */
  length?: number;
  /** Trail thickness in px when using `length` or `lengthRatio`. */
  thickness?: number;
  /** Auto trail length as a fraction of container width (e.g. 0.5 = half the box). */
  lengthRatio?: number;
  transition?: Transition;
  onAnimationComplete?: () => void;
  style?: React.CSSProperties;
};

export function BorderTrail({
  className,
  size = 60,
  length,
  thickness = 3,
  lengthRatio,
  transition,
  onAnimationComplete,
  style,
}: BorderTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [measuredLength, setMeasuredLength] = useState(length ?? size);

  const usesLongTrail = length != null || lengthRatio != null;

  useEffect(() => {
    if (length != null) {
      setMeasuredLength(length);
      return;
    }

    if (lengthRatio == null) {
      setMeasuredLength(size);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      setMeasuredLength(Math.max(el.offsetWidth * lengthRatio, 80));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [length, lengthRatio, size]);

  const trailLength = usesLongTrail ? measuredLength : size;
  const pathRadius = usesLongTrail ? 12 : size;

  const defaultTransition: Transition = {
    repeat: Infinity,
    duration: 5,
    ease: 'linear',
  };

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
    >
      <motion.div
        className={cn(
          'absolute bg-zinc-500',
          usesLongTrail ? 'rounded-full' : 'aspect-square',
          className
        )}
        style={{
          width: trailLength,
          height: usesLongTrail ? thickness : trailLength,
          offsetPath: `rect(0 auto auto 0 round ${pathRadius}px)`,
          ...style,
        }}
        animate={{
          offsetDistance: ['0%', '100%'],
        }}
        transition={transition || defaultTransition}
        onAnimationComplete={onAnimationComplete}
      />
    </div>
  );
}
