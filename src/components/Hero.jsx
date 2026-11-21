import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";
import ZombieGameAnimation from "./ZombieGameAnimation";
import HexaGameAnimation from "./HexaGameAnimation";
import SoccerKickAnimation from "./SoccerKickAnimation";
import GrannyGameAnimation from "./GrannyGameAnimation";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionIndex, setTransitionIndex] = useState(null);
  const nextImageRef = useRef(null);

  const totalImages = 5;
  const getImageSrc = (index) => {
    if (index === 2) return "/soccer/striker-poster.jpg";
    if (index === 3) return "/granny/assets/original_reference_frame.webp";
    return `videos/hero-${index + 1}.webp`;
  };

  const handleHeroClick = () => {
    if (transitionIndex !== null) return;
    setTransitionIndex((currentIndex + 1) % totalImages);
  };

  useGSAP(
    () => {
      if (transitionIndex !== null) {
        gsap.set(nextImageRef.current, { visibility: "visible" });
        gsap.to(nextImageRef.current, {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onComplete: () => {
            setCurrentIndex(transitionIndex);
            setTransitionIndex(null);
          },
        });
      }
    },
    {
      dependencies: [transitionIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div id="hero" className="relative h-dvh w-full overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-full overflow-hidden rounded-lg bg-hero"
      >
        <div>
          <div
            className="group mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg"
            onClick={handleHeroClick}
          >
            <VideoPreview>
              <div className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in group-hover:scale-100 group-hover:opacity-100">
                <img
                  src={getImageSrc((currentIndex + 1) % totalImages)}
                  alt="Preview of the next hero image"
                  className="size-64 origin-center object-cover object-center"
                />
              </div>

            </VideoPreview>
          </div>

          {currentIndex === 0 ? (
            <ZombieGameAnimation />
          ) : currentIndex === 1 ? (
            <HexaGameAnimation />
          ) : currentIndex === 2 ? (
            <SoccerKickAnimation />
          ) : currentIndex === 3 ? (
            <GrannyGameAnimation />
          ) : (
            <img
              src={getImageSrc(currentIndex)}
              alt=""
              className="absolute left-0 top-0 size-full bg-navy object-cover object-center"
            />
          )}

          {transitionIndex !== null && (
            <img
              ref={nextImageRef}
              src={getImageSrc(transitionIndex)}
              alt=""
              className="absolute-center invisible absolute z-20 size-64 bg-navy object-cover object-center"
            />
          )}

          <button
            type="button"
            aria-label="Show the next hero image"
            onClick={handleHeroClick}
            disabled={transitionIndex !== null}
            className="absolute inset-0 z-10 cursor-pointer disabled:cursor-default"
          />
        </div>

        <h1 className="special-font hero-heading pointer-events-none absolute bottom-5 right-5 z-40 text-mist-card">
          G<b>A</b>MING
        </h1>
        
        <div className="pointer-events-none absolute left-0 top-0 z-40 size-full">
          <div className="relative mt-24 w-max max-w-full px-5 sm:px-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-4 -inset-y-6 bg-hero-shade sm:-inset-x-8"
            />
            <h1 className="special-font hero-heading relative z-10 text-mist-card">
              redefi<b>n</b>e
            </h1>

            <p className="relative z-10 mb-5 max-w-64 font-robert-regular text-mist">
              We design, build and ship <br /> games players love to play.
            </p>

            <Button
              id="watch-trailer"
              title="Explore our work"
              leftIcon={<TiLocationArrow />}
              containerClass="pointer-events-auto relative z-10 flex-center gap-1"
              onClick={(event) => {
                event.stopPropagation();
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading pointer-events-none absolute bottom-5 right-5 text-ink">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;
