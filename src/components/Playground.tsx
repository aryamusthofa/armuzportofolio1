import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ArrowUpRight, Keyboard, MousePointerClick, MoveDown } from "lucide-react";

/*
  Playground — "Remotion yang bisa dipencet"
  Scene ala Jendela Peluang, tapi interaktif:
  scroll = timeline · klik = efek · ketik = huruf besar
*/

const SCENES = ["Hook", "Data", "Roasting", "Ketik"] as const;
const TOTAL_FRAMES = 250;

interface Ripple {
  id: number;
  x: number;
  y: number;
}
interface Particle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  char: string;
}

let effectId = 0;

function easeOut(t: number) {
  return 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
}

function Counter({ target, suffix, label, active }: { target: number; suffix: string; label: string; active: number }) {
  const [burst, setBurst] = useState(0);
  const value = Math.round(target * easeOut(active * 1.35));
  return (
    <button
      type="button"
      className="pg-counter"
      onClick={() => setBurst((b) => b + 1)}
      aria-label={`${label}: ${value}${suffix}`}
    >
      <motion.span
        key={burst}
        className="pg-counter__value"
        initial={burst ? { scale: 1.25, color: "#d7ff63" } : false}
        animate={{ scale: 1, color: "#f2f1ea" }}
        transition={{ duration: 0.5 }}
      >
        {value}
        <em>{suffix}</em>
      </motion.span>
      <span className="pg-counter__label">{label}</span>
    </button>
  );
}

export function Playground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState(0);
  const [local, setLocal] = useState(0);
  const [frame, setFrame] = useState(0);
  const [inView, setInView] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [typed, setTyped] = useState("");
  const [shake, setShake] = useState(0);
  const typedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const s = Math.min(SCENES.length - 1, Math.floor(v * SCENES.length));
    setScene(s);
    setLocal(Math.min(1, v * SCENES.length - s));
    setFrame(Math.round(v * TOTAL_FRAMES));
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  /* klik = ripple + partikel + shake di scene roasting */
  const handlePointer = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!inView) return;
    const bounds = viewportRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const id = ++effectId;
    setRipples((r) => [...r.slice(-5), { id, x, y }]);
    setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 900);

    const chars = ["✳", "✦", "●"];
    const fresh: Particle[] = Array.from({ length: 6 }, (_, i) => ({
      id: id * 10 + i,
      x,
      y,
      dx: (Math.random() - 0.5) * 180,
      dy: (Math.random() - 0.5) * 180,
      char: chars[i % chars.length],
    }));
    setParticles((p) => [...p.slice(-24), ...fresh]);
    setTimeout(() => setParticles((p) => p.filter((pt) => pt.id < id * 10 || pt.id >= (id + 1) * 10)), 1100);
    if (scene === 2) setShake((s) => s + 1);
  };

  /* ketik = huruf besar muncul */
  useEffect(() => {
    if (!inView) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (event.key === "Backspace") {
        setTyped((t) => t.slice(0, -1));
        return;
      }
      if (event.key.length !== 1) return;
      setTyped((t) => (t + event.key).slice(-14));
      if (typedTimer.current) clearTimeout(typedTimer.current);
      typedTimer.current = setTimeout(() => setTyped(""), 1600);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [inView]);

  return (
    <section id="play" className="playground" ref={containerRef} aria-label="Interactive scene playground">
      <div className="pg-viewport" ref={viewportRef} onClick={handlePointer}>
        <motion.div key={shake} className="pg-stage" animate={shake ? { x: [0, -7, 6, -4, 0] } : undefined} transition={{ duration: 0.35 }}>
          <AnimatePresence mode="wait">
            {scene === 0 && (
              <motion.div key="hook" className="pg-scene pg-hook" exit={{ opacity: 0, scale: 1.1 }}>
                <span className="pg-eyebrow">JENDELA PELUANG — VERSI INTERAKTIF</span>
                <motion.h3
                  style={{ scale: 0.55 + easeOut(local) * 0.65 }}
                  className="pg-hook__year"
                >
                  2050
                </motion.h3>
                <motion.p style={{ opacity: easeOut(local) }}>
                  Negara ini jadi super power? Bro, lu mimpi apa woi?
                </motion.p>
              </motion.div>
            )}

            {scene === 1 && (
              <motion.div key="data" className="pg-scene pg-data" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <span className="pg-eyebrow">SCENE 02 — ANGKA YANG BENERAN (KLIK AJA)</span>
                <div className="pg-counters">
                  <Counter target={287} suffix=" jt" label="pengguna internet" active={local} />
                  <Counter target={119} suffix=" M$" label="ekonomi digital" active={local} />
                  <Counter target={1} suffix=" st" label="ekonomi digital ASEAN" active={local} />
                </div>
                <p className="pg-note">prinsip proyek: hanya angka terverifikasi di layar</p>
              </motion.div>
            )}

            {scene === 2 && (
              <motion.div key="roast" className="pg-scene pg-roast" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <span className="pg-eyebrow">SCENE 03 — ROASTING (KLIK UNTUK GEMPUR)</span>
                <div className="pg-roast__lines">
                  {["Adopsi AI: paling dangkal se-ASEAN", "81% lapangan kerja: informal", "Pendanaan private: langka", "300.000 pekerja manufaktur: hilang"].map((line, i) => {
                    const shown = easeOut(local * 1.6) > i / 4 + 0.08;
                    return (
                      <motion.p
                        key={line}
                        initial={false}
                        animate={shown ? { x: 0, opacity: 1 } : { x: -70, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 210, damping: 22 }}
                      >
                        {line}
                      </motion.p>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {scene === 3 && (
              <motion.div key="type" className="pg-scene pg-type" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <span className="pg-eyebrow">SCENE 04 — GILIRAN LU</span>
                <div className="pg-type__screen" aria-live="polite">
                  {typed ? (
                    typed.split("").map((ch, i) => (
                      <motion.span key={`${i}-${ch}`} initial={{ y: 26, opacity: 0, rotate: -6 }} animate={{ y: 0, opacity: 1, rotate: 0 }}>
                        {ch === " " ? "\u00A0" : ch}
                      </motion.span>
                    ))
                  ) : (
                    <span className="pg-type__placeholder">ketik apa pun di keyboard…</span>
                  )}
                </div>
                <a
                  className="pg-cta"
                  href="https://github.com/aryamusthofa/indotechremotion"
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Lihat video aslinya di GitHub <ArrowUpRight size={18} />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="pg-ripple"
            style={{ left: r.x, top: r.y }}
            initial={{ scale: 0, opacity: 0.7 }}
            animate={{ scale: 5, opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          />
        ))}

        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="pg-particle"
            style={{ left: p.x, top: p.y }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
            animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 1.4, rotate: 120 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {p.char}
          </motion.span>
        ))}

        <div className="pg-hud">
          <span className="pg-hud__frame">f {String(frame).padStart(4, "0")} / {TOTAL_FRAMES}</span>
          <div className="pg-hud__dots">
            {SCENES.map((name, i) => (
              <span key={name} className={i === scene ? "is-active" : ""}>{name}</span>
            ))}
          </div>
          <div className="pg-hud__hints">
            <span><MoveDown size={13} /> scroll</span>
            <span><MousePointerClick size={13} /> klik</span>
            <span><Keyboard size={13} /> ketik</span>
          </div>
        </div>
      </div>
    </section>
  );
}
