import { content } from "../content";
import { Reveal } from "./Reveal";

export function Process() {
  return (
    <section className="process-section section-pad" aria-labelledby="process-title">
      <div className="page-shell process-layout">
        <Reveal className="process-intro">
          <div className="section-heading__label">
            <span>04</span>
            <span>How we'll work</span>
          </div>
          <h2 id="process-title">Clear process.<br /><em>No black box.</em></h2>
          <p>
            Enough structure to keep things moving, enough flexibility to find the best answer.
          </p>
        </Reveal>

        <div className="process-list">
          {content.process.map((step, index) => (
            <Reveal className="process-step" key={step.title} delay={index * 0.06}>
              <span className="process-step__number">0{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
