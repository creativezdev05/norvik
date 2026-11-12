import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import OptimizedImage from "./OptimizedImage";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const BentoCarousel = ({ images = [] }) => {
  if (!images.length) return null;

  // Enough cards in flight so the path always looks busy
  const cards =
    images.length >= 6
      ? images
      : [...images, ...images, ...images].slice(0, Math.max(6, images.length * 2));

  const duration = 7.5;
  const step = duration / cards.length;

  return (
    <div className="bento-carousel absolute left-0 top-0 size-full overflow-hidden bg-[#05050a]">
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_70%_40%,rgba(98,70,200,0.28),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-black via-black/55 to-transparent" />

      <div className="bento-carousel-stage absolute inset-0">
        {cards.map((image, index) => {
          const backImage = cards[(index + 1) % cards.length];
          const delay = -index * step;

          return (
            <div
              key={`${image}-${index}`}
              className="bento-fly-card"
              style={{
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                zIndex: cards.length - index,
              }}
            >
              <div
                className="bento-fly-spinner"
                style={{
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`,
                }}
              >
                <div className="bento-fly-face bento-fly-face--front">
                  <img src={image} alt="" />
                </div>
                <div className="bento-fly-face bento-fly-face--back">
                  <img src={backImage} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const BentoCard = ({ images = [], title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <BentoCarousel images={images} />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-[#dfdff2]">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-sm md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/75"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">Built for players</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section id="capabilities" className="bg-black pb-52 scroll-mt-20">
    <div id="features" />
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-[#dfdff2]">
          What we bring to the build
        </p>
        <p className="max-w-md font-circular-web text-lg text-[#dfdff2] opacity-50">
          A close-knit team with the range to take a game from its first playable moment through launch, optimization and ongoing support.
        </p>
      </div>

      <BentoTilt className="bento-tilt_1 relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          images={[
            "videos/feature-1.png",
            "videos/feature-2.png",
            "videos/feature-3.png",
            "videos/feature-4.png",
            "videos/feature-5.png",
          ]}
          title={
            <>
              Mobile <b>G</b>ames
            </>
          }
          description="Unity games for Android and iOS, shaped from early prototype into polished, store-ready releases."
          isComingSoon
        />
      </BentoTilt>

      <div id="vault" className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7 scroll-mt-24">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <div className="flex size-full flex-col p-5 text-white">
            <div className="shrink-0">
              <h1 className="bento-title special-font max-w-56">Gameplay <b>&</b> AI</h1>
              <p className="mt-4 max-w-64 font-circular-web text-sm">Combat, vehicle physics, pathfinding and enemy behaviors that make every run feel alive.</p>
            </div>
            <div className="relative mt-4 min-h-0 flex-1">
              <OptimizedImage
                srcWebp="videos/feature-2.png"
                srcFallback="videos/feature-2.png"
                alt="Gameplay & AI"
                className="absolute inset-0 size-full object-contain object-center"
              />
            </div>
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <div className="relative size-full overflow-hidden text-white">
            <OptimizedImage
              srcWebp="videos/feature-3.png"
              srcFallback="videos/feature-3.png"
              alt="Art & VFX"
              className="absolute right-0 top-1/2 h-[88%] w-[58%] -translate-y-1/2 object-contain object-center"
            />
            <div className="relative z-10 flex h-full max-w-[45%] flex-col p-5">
              <h1 className="bento-title special-font">Art <b>&</b> VFX</h1>
              <p className="mt-4 font-circular-web text-sm">Lighting, effects and visual polish designed to read beautifully on real mobile screens.</p>
            </div>
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <div className="relative size-full overflow-hidden text-white">
            <OptimizedImage
              srcWebp="videos/feature-4.png"
              srcFallback="videos/feature-4.png"
              alt="Live-Ops"
              className="absolute right-0 top-1/2 h-[88%] w-[58%] -translate-y-1/2 object-contain object-center"
            />
            <div className="relative z-10 flex h-full max-w-[45%] flex-col p-5">
              <h1 className="bento-title special-font">Live-<b>O</b>ps</h1>
              <p className="mt-4 font-circular-web text-sm">Monetization, mediation, analytics and tuning built into the game from day one.</p>
            </div>
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5 text-black">
            <div>
              <h1 className="bento-title special-font max-w-56">Built to <b>r</b>un smooth.</h1>
              <p className="mt-4 max-w-64 font-circular-web text-sm">Device testing, performance tuning and porting that keep the experience feeling great across the target market.</p>
            </div>
            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2 relative">
          <div className="relative size-full overflow-hidden text-white">
            <OptimizedImage
              srcWebp="videos/feature-5.png"
              srcFallback="videos/feature-5.png"
              alt="Tools & automation"
              className="absolute right-0 top-1/2 h-[88%] w-[58%] -translate-y-1/2 object-contain object-center"
            />
            <div className="relative z-10 flex h-full max-w-[45%] flex-col p-5">
              <h1 className="bento-title special-font text-3xl">Tools <b>&</b> automation</h1>
              <p className="mt-3 font-circular-web text-sm text-white/80">Custom editor tools and smarter pipelines that help teams spend more time making the game.</p>
            </div>
          </div>
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
