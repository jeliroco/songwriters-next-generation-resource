import React, { useRef, useEffect } from "react";

interface HeroImageProps {
  imageUrl: string;
  backgroundPosition?: string;
  speed?: number;
  children?: React.ReactNode;
}

const HeroImage: React.FC<HeroImageProps> = ({
  children,
  imageUrl,
  backgroundPosition = "bg-center",
  speed = -0.5,
}) => {
  const heroImageRef = useRef<HTMLDivElement>(null);

  const parallaxEffect = () => {
    if (heroImageRef.current) {
      const yPos = -window.pageYOffset * speed;
      heroImageRef.current.style.transform = `translate3d(0, ${yPos}px, 0)`;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", parallaxEffect);
    return () => window.removeEventListener("scroll", parallaxEffect);
  }, []);

  return (
    <div className="relative overflow-hidden h-[32rem]">
      <div
        ref={heroImageRef}
        className={`absolute inset-0 w-full h-full ${backgroundPosition} bg-fill bg-no-repeat`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 mix-blend-light bg-white/50"></div>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
