import { motion } from "framer-motion";

const layers = [
  { id: "svelte", z: 250, label: "SVELTE", delay: 0.05, duration: 3.6 },
  { id: "sass", z: 170, label: "SASS", delay: 0.12, duration: 3.9 },
  { id: "css", z: 95, label: ".CSS", delay: 0.2, duration: 3.5 },
  { id: "core", z: 28, label: null, core: true, delay: 0.28, duration: 4.1 },
];

const satellites = [
  { id: "js", label: ".JS", x: -124, y: 22, z: 48, delay: 0.35, duration: 3.2 },
  { id: "ts", label: ".TS", x: 128, y: -14, z: 88, delay: 0.42, duration: 3.6 },
  { id: "html", label: "HTML", x: -102, y: 98, z: -6, delay: 0.5, duration: 3.4 },
  { id: "jsx", label: ".JSX", x: 114, y: 86, z: 28, delay: 0.58, duration: 3.8 },
];

export default function ExplodedAnimation() {
  return (
    <section className="exploded-scene" aria-label="Exploded stack animation">
      <div className="exploded-glow" aria-hidden="true" />

      <motion.div
        className="scene-stage"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="scene-perspective">
          {layers.map((layer) => (
            <div
              key={layer.id}
              className={`floating-layer ${layer.core ? "layer-core" : ""} layer-${layer.id}`}
              style={{
                "--layer-z": `${layer.z}px`,
                "--float-duration": `${layer.duration}s`,
                "--float-delay": `${layer.delay}s`,
              }}
            >
              {layer.core ? (
                <div className="center-symbol">
                  <span className="core-orb" />
                  <span className="core-mark">✦</span>
                </div>
              ) : (
                <span className="layer-label">{layer.label}</span>
              )}
            </div>
          ))}

          <div
            className="base-platform"
            style={{
              "--layer-z": "-40px",
              "--float-duration": "4.2s",
              "--float-delay": "0s",
            }}
          >
            <span className="platform-symbol">✦</span>
            <span className="layer-label base-label">.SCSS</span>
          </div>

          {satellites.map((sat) => (
            <div
              key={sat.id}
              className={`satellite satellite-${sat.id}`}
              style={{
                "--sat-x": `${sat.x}px`,
                "--sat-y": `${sat.y}px`,
                "--sat-z": `${sat.z}px`,
                "--float-duration": `${sat.duration}s`,
                "--float-delay": `${sat.delay}s`,
              }}
            >
              <span>{sat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
