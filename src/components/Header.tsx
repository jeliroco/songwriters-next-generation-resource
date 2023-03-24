import React, { useRef, useEffect } from "react";
import Title from "./Title";
import FreeTrialButton from "./FreeTrialButton";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const HeaderRef = useRef<HTMLDivElement>(null);

  const translateHeader = () => {
    if (HeaderRef.current) {
      if (document.body.scrollTop + document.documentElement.scrollTop !== 0) {
        HeaderRef.current.classList.remove("-translate-y-14");
        HeaderRef.current.classList.remove("opacity-0");
      } else {
        HeaderRef.current.classList.add("-translate-y-14");
        HeaderRef.current.classList.add("opacity-0");
      }
    }
  };

  useEffect(() => {
    translateHeader();
    window.addEventListener("scroll", translateHeader);
    return () => window.removeEventListener("scroll", translateHeader);
  }, []);

  return (
    <>
      <header
        ref={HeaderRef}
        className="fixed left-0 right-0 z-10 flex p-2 duration-300 ease-in-out bg-orange-400 opacity-0 -translate-y-14"
      >
        <div className="flex-1">
          <Title textAlign="text-left">
            <span className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
              SNGR
            </span>
          </Title>
        </div>
        <FreeTrialButton />
      </header>
      <div className="h-2"></div>
    </>
  );
};

export default Header;
