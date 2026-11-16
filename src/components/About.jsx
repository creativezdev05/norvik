import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const studioFacts = [
  ["Engine", "Unity / C#"],
  ["Platforms", "Android · iOS"],
  ["Monetization", "AdMob · Mediation · Remote Config"],
  ["Genres", "Racing · Arena · Survival · Puzzle"],
  ["Base", "MENA + Global Clients"],
  ["Status", "Accepting New Projects"],
];

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=1350 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      duration: 1,
    }).fromTo(".about-details", {
      yPercent: 100,
      autoAlpha: 0,
    }, {
      yPercent: 0,
      autoAlpha: 1,
      duration: 0.65,
      ease: "power2.out",
    });
  });

  return (
    <div id="studio" className="min-h-screen w-full overflow-hidden scroll-mt-20 bg-mist text-ink">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-xs uppercase tracking-[0.16em] text-ink-muted md:text-sm">
          Independent game development · MENA + worldwide
        </p>

        <AnimatedTitle
          title="Agile structure. <br /> Comprehensive delivery. <b>Strategic insight.</b>"
          containerClass="mt-5 w-full text-ink text-center"
        />

        <div className="about-subtext text-ink-muted">
          <p className="text-ink">We make games built to keep players coming back.</p>
          <p>From first playable prototype to launch and live-ops, our team brings design, engineering, art and production together under one roof.</p>
        </div>
      </div>

      <div className="relative h-dvh w-full" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>

        <div className="about-details" aria-label="About Norvik Studios">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.2fr_0.8fr] md:gap-14">
            <div>
              <p className="mb-3 font-general text-xs uppercase tracking-[0.18em] text-steel">Norvik Studios</p>
              <h2 className="mb-4 font-zentry text-3xl uppercase leading-tight text-mist-card md:text-5xl">
                Agile structure. Comprehensive delivery. Strategic insight.
              </h2>
              <p className="max-w-2xl font-circular-web text-sm leading-relaxed text-mist/80 md:text-base">
                Norvik Studios is not a large, faceless outsourcing shop. We&apos;re a tight, founder-led team that moves like a small studio and delivers like a full production house — game design, engineering, art direction and live-ops under one roof.
              </p>
              <p className="mt-3 max-w-2xl font-circular-web text-sm leading-relaxed text-mist/80 md:text-base">
                Based in the MENA region and working with clients globally, we specialise in mobile-first experiences built in Unity: racing, action, survival, and puzzle titles engineered to perform on real-world devices, not just showreels.
              </p>
            </div>
            <dl className="grid grid-cols-2 content-start gap-x-6 gap-y-4 font-circular-web text-sm">
              {studioFacts.map(([label, value]) => (
                <div key={label} className="border-t border-mist/20 pt-3">
                  <dt className="mb-1 text-xs uppercase tracking-wider text-mist/55">{label}</dt>
                  <dd className="text-mist-card">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
