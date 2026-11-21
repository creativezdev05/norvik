import { useReducedMotion } from "motion/react";

const GIF = "/soccer/striker-kick.gif";
const POSTER = "/soccer/striker-poster.jpg";

export default function SoccerKickAnimation() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <img
        src={reduceMotion ? POSTER : GIF}
        alt=""
        draggable="false"
        className="absolute inset-0 size-full select-none object-cover object-center"
      />
    </div>
  );
}
