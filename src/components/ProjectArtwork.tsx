import type { CSSProperties } from "react";
import type { Project } from "../types";

export function ProjectArtwork({ project }: { project: Project }) {
  const style = { "--project-accent": project.accent } as CSSProperties;

  if (project.image) {
    return (
      <div className="project-art project-art--image">
        <img src={project.image} alt={`${project.title} project preview`} loading="lazy" />
      </div>
    );
  }

  return (
    <div
      className={`project-art project-art--${project.visual}`}
      style={style}
      aria-hidden="true"
    >
      <div className="art-grid" />
      <span className="art-corner art-corner--top">{project.category.split(" · ")[0]}</span>
      <span className="art-corner art-corner--bottom">© {project.year}</span>

      {project.visual === "orbit" && (
        <div className="orbit-scene">
          <div className="orbit-ring orbit-ring--one"><i /></div>
          <div className="orbit-ring orbit-ring--two"><i /></div>
          <div className="orbit-ring orbit-ring--three" />
          <div className="orbit-core">
            <span>{project.title}</span>
            <small>Make it clear.</small>
          </div>
        </div>
      )}

      {project.visual === "waves" && (
        <div className="wave-scene">
          <svg viewBox="0 0 800 520" preserveAspectRatio="none">
            {[0, 1, 2, 3, 4, 5, 6].map((line) => (
              <path
                key={line}
                d={`M -80 ${90 + line * 48} C 120 ${-10 + line * 65}, 240 ${230 + line * 22}, 420 ${120 + line * 45} S 690 ${70 + line * 50}, 880 ${150 + line * 40}`}
              />
            ))}
          </svg>
          <span className="wave-scene__word">{project.title}</span>
          <span className="wave-scene__disc" />
        </div>
      )}

      {project.visual === "blocks" && (
        <div className="blocks-scene">
          <div className="block block--one" />
          <div className="block block--two" />
          <div className="block block--three" />
          <div className="block block--four" />
          <span className="blocks-scene__label">Objects for<br />slower living.</span>
          <span className="blocks-scene__name">{project.title}</span>
        </div>
      )}

      {project.visual === "type" && (
        <div className="type-scene">
          <span className="type-scene__micro">SIGNAL / NOT NOISE</span>
          <span className="type-scene__letter">{project.title.charAt(0)}</span>
          <div className="type-scene__ticker">
            <span>Ideas into impact · Ideas into impact ·&nbsp;</span>
            <span>Ideas into impact · Ideas into impact ·&nbsp;</span>
          </div>
        </div>
      )}
    </div>
  );
}
