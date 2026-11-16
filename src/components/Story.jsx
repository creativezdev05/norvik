import OptimizedImage from "./OptimizedImage";
const projects = [
  {
    genre: "Racing",
    title: "Drift & Destruction",
    description: "Off-road racing with adaptive rivals, nitro boosts and environments built to take a hit.",
    video: "/videos/feature-1.png",
    number: "01",
  },
  {
    genre: "Arena combat",
    title: "Arena Fighter",
    description: "A hard-hitting combat experience with fluid combos, expressive physics and live event support.",
    video: "/videos/feature-3.png",
    number: "02",
  },
  {
    genre: "Survival",
    title: "Outbreak Arena",
    description: "Face escalating waves of infected, powered by smart squad behaviors and finely tuned difficulty.",
    video: "/videos/feature-5.png",
    number: "03",
  },
  {
    genre: "Puzzle",
    title: "Vector Escape",
    description: "A clean, compelling puzzle series with fresh levels designed to always have a solution.",
    video: "/videos/feature-4.png",
    number: "04",
  },
];

const Story = () => (
  <section id="work" className="scroll-mt-20 bg-mist px-5 py-24 text-ink md:px-12 md:py-32">
    <div className="mx-auto max-w-7xl">
      <div className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-5 font-general text-sm uppercase tracking-[0.16em] text-ink-muted">Selected work · different worlds, same craft</p>
          <h2 className="special-font max-w-3xl font-zentry text-5xl uppercase leading-[.85] sm:text-7xl md:text-8xl">Worlds we <b>m</b>ake.</h2>
        </div>
        <p className="max-w-sm font-circular-web text-base leading-relaxed text-ink-muted">From high-speed racing to tense survival, we build the systems and moments that keep every genre feeling alive.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <article key={project.number} className="group relative min-h-[25rem] overflow-hidden rounded-md bg-navy-deep text-mist-card md:min-h-[34rem]">
            <OptimizedImage srcWebp={project.video} srcFallback ={project.video}  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-work-scrim" />
            <div className="relative z-10 flex min-h-[25rem] flex-col justify-between p-6 md:min-h-[34rem] md:p-8">
              <div className="flex items-center justify-between font-general text-xs uppercase tracking-[0.16em] text-white/80">
                <span>{project.genre}</span><span>{project.number} / 04</span>
              </div>
              <div>
                <h3 className="special-font font-zentry text-4xl uppercase leading-[.9] sm:text-5xl md:text-6xl">{project.title}</h3>
                <p className="mt-4 max-w-md font-circular-web text-sm leading-relaxed text-white/75 md:text-base">{project.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Story;
