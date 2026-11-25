import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { content } from "../content";
import { Reveal } from "./Reveal";

export function Services() {
  const [activeService, setActiveService] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="services-section section-pad">
      <div className="page-shell">
        <Reveal className="section-heading">
          <div className="section-heading__label">
            <span>03</span>
            <span>What I do</span>
          </div>
          <h2>
            One partner.<br />
            <em>Multiple perspectives.</em>
          </h2>
          <p>Strategy, design, and technology considered as one connected experience.</p>
        </Reveal>

        <div className="services-list">
          {content.services.map((service, index) => {
            const isOpen = activeService === index;
            return (
              <Reveal key={service.title} delay={index * 0.06}>
                <article className={`service-item ${isOpen ? "is-open" : ""}`}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`service-panel-${index}`}
                    onClick={() => setActiveService(isOpen ? null : index)}
                  >
                    <span className="service-item__number">0{index + 1}</span>
                    <span className="service-item__heading">
                      <strong>{service.title}</strong>
                      <small>{service.summary}</small>
                    </span>
                    <motion.span
                      className="service-item__icon"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.35 }}
                    >
                      <Plus size={24} strokeWidth={1.5} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`service-panel-${index}`}
                        className="service-item__panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0.01 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="service-item__panel-inner">
                          <p>{service.description}</p>
                          <ul>
                            {service.deliverables.map((item) => <li key={item}>{item}</li>)}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
