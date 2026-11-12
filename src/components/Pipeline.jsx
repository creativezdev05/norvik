import gsap from "gsap";
import { useRef, useState } from "react";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const stages = [
  ["01", "Concept & Prototype", "Core loop defined and playable within days, not months."],
  ["02", "Production", "Systems, levels and content built out against a locked scope."],
  ["03", "Art & Polish", "Lighting, VFX and feel pass to make every build presentable."],
  ["04", "Monetization & QA", "Ad stacks, analytics and device testing across the target market."],
  ["05", "Launch & Live-Ops", "Store submission, then ongoing tuning based on real player data."],
];

const Pipeline = () => {
  const frameRef = useRef(null);
  const [activeStage, setActiveStage] = useState(-1);

  const handleMouseMove = (e) => {
    const element = frameRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;
    const rotateX = ((yPos - rect.height / 2) / (rect.height / 2)) * -10;
    const rotateY = ((xPos - rect.width / 2) / (rect.width / 2)) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    if (frameRef.current) {
      gsap.to(frameRef.current, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <div id="pipeline" className="min-h-dvh w-full overflow-hidden scroll-mt-20 bg-black text-[#dfdff2]">
      <div id="prologue" />
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-xs uppercase tracking-[0.16em] md:text-sm">
          From first spark to live game
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="Five steps. <br /> One playable <b>w</b>orld."
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/img/entrance.webp"
                  alt="A game world taking shape"
                  className="object-contain"
                />
              </div>
            </div>

            <svg className="invisible absolute size-0" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite in="SourceGraphic" in2="flt_tag" operator="atop" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <h2 className="font-zentry text-2xl uppercase tracking-wide text-cyan-300 md:text-3xl">
              Five stages, no guesswork.
            </h2>
            <p className="mt-3 max-w-sm text-center font-circular-web text-[#dfdff2] md:text-start">
              Every project follows the same disciplined path from idea to a live, earning title.
            </p>
            <Button
              id="realm-btn"
              title="Start a project"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              containerClass="mt-5"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-4 md:px-12 md:pt-8">
        <div className="overflow-x-auto pb-4">
          <div className="relative min-w-[850px]">
            {/* Background Track Line */}
            <div className="pointer-events-none absolute left-[10%] right-[10%] top-[11px] h-[2px] bg-white/20" aria-hidden="true">
              {/* Animated Progress Fill Line */}
              <div
                className="h-full bg-cyan-300 transition-[width] duration-500 ease-out"
                style={{ 
                  width: activeStage < 0 ? "0%" : `${(activeStage / (stages.length - 1)) * 100}%` 
                }}
              />
            </div>

            <ol
              className="grid grid-cols-5 gap-5"
              onMouseLeave={() => setActiveStage(-1)}
              onFocusCapture={(event) => {
                const item = event.target.closest("li[data-stage-index]");
                if (item) setActiveStage(Number(item.dataset.stageIndex));
              }}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setActiveStage(-1);
              }}
            >
              {stages.map(([number, title, description], index) => (
                <li
                  key={number}
                  data-stage-index={index}
                  tabIndex={0}
                  onMouseEnter={() => setActiveStage(index)}
                  aria-current={activeStage === index ? "step" : undefined}
                  className="group relative z-10 cursor-pointer rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-8 focus-visible:ring-offset-black"
                >
                  {/* Circle Step Marker */}
                  <div className="mb-7 flex justify-center">
                    <span
                      className={`flex size-6 items-center justify-center rounded-full border transition-colors duration-300 ${
                        activeStage >= index ? "border-cyan-300 bg-cyan-300" : "border-white/40 bg-black"
                      }`}
                    >
                      <span className={`size-1.5 rounded-full ${activeStage >= index ? "bg-black" : "bg-white/40"}`} />
                    </span>
                  </div>

                  {/* Content Below */}
                  <div className="border-t border-white/20 pt-4 text-center">
                    <span className="font-general text-xs tracking-wider text-cyan-300">{number}</span>
                    <h3 className={`mt-2 font-zentry text-xl uppercase leading-none transition-colors duration-300 lg:text-2xl ${activeStage === index ? "text-cyan-300" : "text-[#dfdff2]"}`}>
                      {title}
                    </h3>
                    <p className={`mt-3 font-circular-web text-sm leading-relaxed transition-colors duration-300 ${activeStage === index ? "text-white" : "text-white/60"}`}>
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pipeline;  