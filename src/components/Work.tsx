import { ArrowUpRight } from "lucide-react";
import { content } from "../content";
import { ProjectArtwork } from "./ProjectArtwork";
import { Reveal } from "./Reveal";

export function Work() {
  return (
    <section id="work" className="work-section section-pad">
      <div className="page-shell">
        <Reveal className="section-heading">
          <div className="section-heading__label">
            <span>01</span>
            <span>Selected work</span>
          </div>
          <h2>
            A few things I've<br />
            <em>helped bring to life.</em>
          </h2>
          <p>
            A selection of digital products and experiences shaped from first thought to final detail.
          </p>
        </Reveal>

        <div className="project-grid">
          {content.projects.map((project, index) => (
            <Reveal
              className={`project-wrap project-wrap--${(index % 4) + 1}`}
              key={project.title}
              y={70}
            >
              <article className="project-card">
                {project.link && (
                  <a
                    className="project-card__hitarea"
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.title} case study`}
                  />
                )}
                <div className="project-card__visual">
                  <ProjectArtwork project={project} />
                  <span className="project-card__view">
                    View project <ArrowUpRight size={18} />
                  </span>
                </div>
                <div className="project-card__meta">
                  <span>0{index + 1} / {project.category}</span>
                  <span>{project.year}</span>
                </div>
                <div className="project-card__title-row">
                  <h3>{project.title}</h3>
                  <span className="project-card__impact">{project.impact}</span>
                </div>
                <p className="project-card__subtitle">{project.subtitle}</p>
                <p className="project-card__description">{project.description}</p>
                <ul className="tag-list" aria-label="Project disciplines">
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
