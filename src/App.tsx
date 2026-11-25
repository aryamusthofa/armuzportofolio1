import { useEffect } from "react";
import Lenis from "lenis";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { content } from "./content";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Work } from "./components/Work";
import { Playground } from "./components/Playground";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { Contact } from "./components/Contact";

export default function App() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.title = content.seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", content.seo.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", content.seo.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", content.seo.description);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });
    let animationFrame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };
    animationFrame = requestAnimationFrame(raf);

    const handleAnchor = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const destination = document.querySelector(hash);
      if (!destination) return;
      event.preventDefault();
      lenis.scrollTo(destination as HTMLElement, { offset: -72 });
    };

    document.addEventListener("click", handleAnchor);
    return () => {
      cancelAnimationFrame(animationFrame);
      document.removeEventListener("click", handleAnchor);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <motion.div className="scroll-progress" style={{ scaleX: reduceMotion ? scrollYProgress : progress }} />
      <Header />
      <main id="main-content">
        <Hero />
        <Marquee />
        <Work />
        <Playground />
        <About />
        <Services />
        <Process />
        <Contact />
      </main>
    </>
  );
}
