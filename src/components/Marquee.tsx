import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { content } from "../content";

/*
  Marquee — berjalan terus, tapi miring (skew) mengikuti kecepatan scroll.
  Scroll kencang = strip miring; berhenti = kembali lurus.
*/

export function Marquee() {
  const items = [...content.marquee, ...content.marquee];
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skew = useSpring(useTransform(velocity, [-2200, 0, 2200], [-8, 0, 8]), {
    stiffness: 180,
    damping: 38,
  });

  return (
    <div className="marquee" aria-label={content.marquee.join(", ")}>
      <motion.div className="marquee__skew" style={{ skewX: skew }}>
        <div className="marquee__track" aria-hidden="true">
          {items.map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}
              <i>✳</i>
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
