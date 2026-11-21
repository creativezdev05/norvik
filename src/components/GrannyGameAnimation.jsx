import "./granny-animation.css";

const SCENE = "/granny/assets/background_static.webp";

export default function GrannyGameAnimation() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="granny-viewport">
        <div className="granny-stage">
          <img
            src={SCENE}
            alt=""
            draggable="false"
            className="absolute inset-0 size-full select-none object-fill"
          />
          <div className="granny-left-hand" />
          <div className="granny-right-hand" />
          <div className="granny-eyes-glow" />
        </div>
      </div>
    </div>
  );
}
