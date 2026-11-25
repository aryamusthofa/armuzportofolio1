import type { MouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { content } from "../content";

/* setiap huruf bereaksi saat disorot kursor */
function CharSplit({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span key={i} className="hero-char">{ch}</span>
      ))}
    </>
  );
}

const titleTransition = { duration: 1.05, ease: [0.16, 1, 0.3, 1] as const };

export function Hero() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const orbX = useSpring(pointerX, { stiffness: 45, damping: 22 });
  const orbY = useSpring(pointerY, { stiffness: 45, damping: 22 });

  const handlePointer = (event: MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    pointerX.set((event.clientX / window.innerWidth - 0.5) * 70);
    pointerY.set((event.clientY / window.innerHeight - 0.5) * 55);
  };

  return (
    <section id="home" className="hero" onMouseMove={handlePointer}>
      <div className="hero__grid" aria-hidden="true" />
      <motion.div
        className="hero__orb"
        style={{ x: orbX, y: orbY }}
        aria-hidden="true"
      />
      <div className="hero__halo" aria-hidden="true" />

      <motion.div
        className="hero__meta page-shell"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.8 }}
      >
        <span>Folio / {new Date().getFullYear()}</span>
        <span>{content.hero.eyebrow}</span>
        <span>{content.location}</span>
      </motion.div>

      <div className="hero__title-wrap page-shell">
        <h1
          className="hero__title"
          aria-label={`${content.hero.titleStart} ${content.hero.titleAccent} ${content.hero.titleEnd}`}
        >
          <span className="hero__line" aria-hidden="true">
            <motion.span
              initial={{ y: reduceMotion ? 0 : "115%" }}
              animate={{ y: 0 }}
              transition={{ ...titleTransition, delay: 0.18 }}
            >
              <CharSplit text={content.hero.titleStart} />
            </motion.span>
          </span>
          <span className="hero__line hero__line--accent" aria-hidden="true">
            <motion.span
              initial={{ y: reduceMotion ? 0 : "115%" }}
              animate={{ y: 0 }}
              transition={{ ...titleTransition, delay: 0.28 }}
            >
              <em><CharSplit text={content.hero.titleAccent} /></em>
              <span className="hero__spark">✳</span>
            </motion.span>
          </span>
          <span className="hero__line hero__line--end" aria-hidden="true">
            <motion.span
              initial={{ y: reduceMotion ? 0 : "115%" }}
              animate={{ y: 0 }}
              transition={{ ...titleTransition, delay: 0.38 }}
            >
              <CharSplit text={content.hero.titleEnd} />
            </motion.span>
          </span>
        </h1>
      </div>

      <motion.div
        className="hero__bottom page-shell"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero__availability">
          <span className="status-dot" />
          {content.availability}
        </div>
        <p className="hero__intro">{content.hero.intro}</p>
        <a className="scroll-cue" href="#work">
          <span>Scroll to explore</span>
          <span className="scroll-cue__icon">
            <ArrowDown size={17} />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
