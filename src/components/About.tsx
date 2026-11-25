import { ArrowDownRight } from "lucide-react";
import { content } from "../content";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="about-section section-pad">
      <div className="page-shell">
        <Reveal className="section-heading section-heading--dark">
          <div className="section-heading__label">
            <span>02</span>
            <span>About me</span>
          </div>
          <h2>{content.about.heading}</h2>
          <p>{content.about.eyebrow}</p>
        </Reveal>

        <div className="about-grid">
          <Reveal className="profile-frame" y={60}>
            {content.about.image ? (
              <img src={content.about.image} alt={`Portrait of ${content.name}`} loading="lazy" />
            ) : (
              <div className="profile-art" aria-label={`${content.name} monogram`}>
                <div className="profile-art__grid" />
                <span className="profile-art__top">PROFILE / {new Date().getFullYear()}</span>
                <span className="profile-art__initials">{content.initials}</span>
                <span className="profile-art__orbit" />
                <div className="profile-art__bottom">
                  <span>{content.role}</span>
                  <ArrowDownRight size={22} />
                </div>
              </div>
            )}
          </Reveal>

          <div className="about-copy">
            {content.about.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * 0.08}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
            <Reveal delay={0.15}>
              <a className="text-link" href="#contact">
                More about working together <ArrowDownRight size={19} />
              </a>
            </Reveal>
          </div>
        </div>

        <div className="stats-grid">
          {content.stats.map((stat, index) => (
            <Reveal className="stat" key={stat.label} delay={index * 0.08}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </Reveal>
          ))}
        </div>

        <div className="experience-grid">
          <Reveal>
            <h3 className="small-heading">Experience</h3>
          </Reveal>
          <div className="experience-list">
            {content.experience.map((item, index) => (
              <Reveal className="experience-row" key={`${item.period}-${item.role}`} delay={index * 0.06}>
                <span>{item.period}</span>
                <div>
                  <h4>{item.role}</h4>
                  <p>{item.company}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
