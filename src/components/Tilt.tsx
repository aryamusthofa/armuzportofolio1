import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/*
  Tilt — pembungkus 3D halus: elemen miring mengikuti posisi kursor,
  kembali perlahan saat kursor pergi. Nonaktif untuk reduced motion.
*/

export function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 180, damping: 18, mass: 0.4 });
  const rotateY = useSpring(rawY, { stiffness: 180, damping: 18, mass: 0.4 });

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    const px = (event.clientX - bounds.left) / bounds.width - 0.5;
    const py = (event.clientY - bounds.top) / bounds.height - 0.5;
    rawY.set(px * 10);
    rawX.set(-py * 8);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}
