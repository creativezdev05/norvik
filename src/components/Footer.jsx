import AnimatedTitle from "./AnimatedTitle";
import { TiLocationArrow } from "react-icons/ti";

const Footer = () => {
  return (
    <footer className="w-full overflow-hidden bg-black px-6 pb-8 pt-20 text-[#dfdff2] md:px-12 md:pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#151515] px-6 py-16 text-center sm:px-12 md:py-24">
          <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
          <p className="relative mb-8 font-general text-sm uppercase tracking-[0.18em] text-[#dfdff2]/80">Have a game in mind?</p>
          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild <br /> your next w<b>o</b>rld"
            containerClass="relative z-10 mx-auto max-w-5xl text-center"
            className="!text-5xl !leading-[.9] sm:!text-7xl md:!text-[6.2rem]"
          />
          <a href="#contact" className="group relative z-10 mt-10 inline-flex items-center gap-2 rounded-full bg-[#dfdff2] px-7 py-3 font-general text-xs uppercase text-black transition-transform hover:scale-105">
            Start a project <TiLocationArrow className="text-lg" />
          </a>
        </div>

        <div className="grid gap-12 border-b border-white/15 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-8 md:py-16">
          <div>
            <a href="#hero" className="inline-flex items-center gap-3 font-zentry text-2xl uppercase tracking-wide text-white">
              <img src="/img/logo.png" alt="" className="w-9" /> Norvik Studios
            </a>
            <p className="mt-5 max-w-sm font-circular-web text-sm leading-relaxed text-[#dfdff2]/60">Play. Create. Inspire. An independent game development studio building mobile games and interactive experiences from the MENA region for players everywhere.</p>
          </div>
          {[
            { title: "Studio", links: [["About", "studio"], ["Capabilities", "capabilities"], ["How we build", "pipeline"]] },
            { title: "Explore", links: [["Selected work", "work"], ["Start a project", "contact"]] },
          ].map((group) => (
            <div key={group.title}>
              <h2 className="mb-5 font-general text-sm uppercase tracking-[0.16em] text-white/65">{group.title}</h2>
              <ul className="grid gap-3 font-circular-web text-sm text-[#dfdff2]/75">
                {group.links.map(([label, id]) => <li key={id}><a className="transition-colors hover:text-white" href={`#${id}`}>{label}</a></li>)}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="mb-5 font-general text-sm uppercase tracking-[0.16em] text-white/65">Let’s talk</h2>
            <a href="mailto:gamez@norvikstudios.com" className="font-circular-web text-sm text-[#dfdff2]/75 transition-colors hover:text-white">gamez@norvikstudios.com <TiLocationArrow className="ml-1 inline" /></a>
            <p className="mt-4 font-general text-xs uppercase tracking-[0.14em] text-white/60">MENA · Working worldwide</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 font-general text-xs uppercase tracking-[0.12em] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Norvik Studios. All rights reserved.</span>
          <span>Built for play. Made to last.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
