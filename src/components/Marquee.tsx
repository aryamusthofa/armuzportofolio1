import { content } from "../content";

export function Marquee() {
  const items = [...content.marquee, ...content.marquee];

  return (
    <div className="marquee" aria-label={content.marquee.join(", ")}>
      <div className="marquee__track" aria-hidden="true">
        {items.map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}
            <i>✳</i>
          </span>
        ))}
      </div>
    </div>
  );
}
