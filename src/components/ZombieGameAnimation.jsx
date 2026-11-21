import { motion, useReducedMotion } from "motion/react";

const SCENE = "/videos/hero-1.webp";
const FLASH = "/videos/flash.webp";
const FACE_FRONT = "/videos/zoombie_face_1.webp";
const FACE_BACK = "/videos/zombie_face_2.webp";
const RIBBON = "/videos/riboon.webp";

const WIDTH = 1883;
const HEIGHT = 835;

const loop = (duration, ease = "easeInOut", delay = 0) => ({
  duration,
  repeat: Infinity,
  ease,
  delay,
});

export default function ZombieGameAnimation() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="size-full"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <image href={SCENE} x="0" y="0" width={WIDTH} height={HEIGHT} preserveAspectRatio="none" />

        <motion.g
          id="player-headband"
          style={{ transformBox: "view-box", originX: 304 / WIDTH, originY: 290 / HEIGHT }}
          animate={reduceMotion ? { rotate: 0 } : { rotate: [-6, 8, -4, 5, 0] }}
          transition={loop(1.5)}
        >
          <image href={RIBBON} x="70" y="205" width="300" height="202" />
        </motion.g>

        <motion.g
          id="zombie-face"
          style={{ transformBox: "view-box", originX: 1180 / WIDTH, originY: 372 / HEIGHT }}
          animate={reduceMotion ? { scale: 1 } : { scale: [1, 1.04, 0.99, 1.025, 1], y: [0, -6, 2, -3, 0] }}
          transition={loop(1.8)}
        >
          <image href={FACE_FRONT} x="1086" y="262" width="189" height="219" />
        </motion.g>

        <motion.g
          id="zombie-face-back"
          style={{ transformBox: "view-box", originX: 1385 / WIDTH, originY: 275 / HEIGHT }}
          animate={reduceMotion ? { scale: 1 } : { scale: [1, 1.05, 0.985, 1.03, 1], y: [0, 5, -3, 2, 0] }}
          transition={loop(2.15, "easeInOut", 0.4)}
        >
          <image href={FACE_BACK} x="1319" y="191" width="133" height="167" />
        </motion.g>

        <motion.g
          id="gun-fire"
          style={{ transformBox: "view-box", originX: 778 / WIDTH, originY: 404 / HEIGHT, mixBlendMode: "screen" }}
          animate={
            reduceMotion
              ? { opacity: 0.9, scale: 1 }
              : { scale: [0.8, 1.22, 0.72, 1.12, 0.86], opacity: [0.3, 1, 0.1, 0.88, 0.35] }
          }
          transition={loop(0.4, "easeOut")}
        >
          <image href={FLASH} x="778" y="312" width="320" height="184" />
        </motion.g>
      </svg>
    </div>
  );
}
