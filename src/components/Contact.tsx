import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Check, Copy } from "lucide-react";
import { content } from "../content";
import { MagneticLink } from "./MagneticLink";
import { Reveal } from "./Reveal";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const githubUrl =
    content.socials.find((s) => s.label === "GitHub")?.url ?? "https://github.com";
  const contactHref = content.email ? `mailto:${content.email}` : githubUrl;
  const contactLabel = content.email || githubUrl.replace(/^https?:\/\//, "");

  const copyContact = async () => {
    try {
      await navigator.clipboard.writeText(contactLabel);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = contactHref;
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-section__glow" aria-hidden="true" />
      <div className="page-shell contact-inner">
        <Reveal className="contact-heading">
          <div className="section-heading__label">
            <span>05</span>
            <span>{content.contact.eyebrow}</span>
          </div>
          <h2>
            {content.contact.title}<br />
            <em>{content.contact.accent}</em>
          </h2>
        </Reveal>

        <Reveal className="contact-action" delay={0.1}>
          <p>{content.contact.description}</p>
          <MagneticLink
            href={contactHref}
            className="contact-button"
            ariaLabel={`Contact ${content.name}`}
          >
            <span>Start a conversation</span>
            <ArrowUpRight size={27} strokeWidth={1.5} />
          </MagneticLink>
          <button className="copy-email" type="button" onClick={copyContact}>
            <span>{contactLabel}</span>
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </Reveal>
      </div>

      <footer className="site-footer page-shell">
        <div className="site-footer__identity">
          <span className="brand__mark">{content.initials}</span>
          <div>
            <strong>{content.name}</strong>
            <span>{content.role}</span>
          </div>
        </div>
        <div className="site-footer__socials">
          {content.socials.map((social) => (
            <a key={social.label} href={social.url} target="_blank" rel="noreferrer">
              {social.label}<ArrowUpRight size={13} />
            </a>
          ))}
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} {content.name}</span>
          <span>{content.location}</span>
          <a href="#home">Back to top <ArrowUp size={14} /></a>
        </div>
      </footer>

      <AnimatePresence>
        {copied && (
          <motion.div
            className="toast"
            role="status"
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 12, x: "-50%" }}
          >
            <Check size={16} /> Email copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
