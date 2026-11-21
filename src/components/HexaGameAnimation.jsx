import { motion, useReducedMotion } from "motion/react";

const WIDTH = 1883;
const HEIGHT = 835;
const ASSET_DIR = "/hexa";
const GEM_WIDTH = 108;
const GEM_HEIGHT = 112;

const GEMS = [
  { id: 1, x: 1127, y: 56, delay: 0 },
  { id: 2, x: 904, y: 166, delay: 0.13 },
  { id: 3, x: 680, y: 276, delay: 0.26 },
  { id: 4, x: 1000, y: 378, delay: 0.39 },
  { id: 5, x: 905, y: 490, delay: 0.52 },
  { id: 6, x: 678, y: 600, delay: 0.65 },
  { id: 7, x: 1131, y: 600, delay: 0.78 },
];

export default function HexaGameAnimation() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="size-full"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <image
          href={`${ASSET_DIR}/hexa-background-clean.webp`}
          x="0"
          y="0"
          width={WIDTH}
          height={HEIGHT}
          preserveAspectRatio="none"
        />

        {GEMS.map((gem) => (
          <motion.g
            key={gem.id}
            style={{
              transformBox: "view-box",
              originX: (gem.x + GEM_WIDTH / 2) / WIDTH,
              originY: (gem.y + GEM_HEIGHT / 2) / HEIGHT,
            }}
            animate={
              reduceMotion
                ? { rotate: 0, scale: 1 }
                : {
                    rotate: [0, 2.2, -2.2, 1.4, 0],
                    scale: [1, 1.015, 1, 1.01, 1],
                  }
            }
            transition={{
              duration: 0.85,
              repeat: Infinity,
              ease: "easeInOut",
              delay: gem.delay,
            }}
          >
            <image
              href={`${ASSET_DIR}/layers/purple-gem-${gem.id}.webp`}
              x={gem.x}
              y={gem.y}
              width={GEM_WIDTH}
              height={GEM_HEIGHT}
              preserveAspectRatio="none"
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
