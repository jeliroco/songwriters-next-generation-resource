import React, { useRef, useEffect } from "react";
import Title from "./Title";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  const FooterRef = useRef<HTMLDivElement>(null);

  const translateFooter = () => {
    if (FooterRef.current) {
      if (document.body.scrollTop + document.documentElement.scrollTop !== 0) {
        FooterRef.current.classList.remove("translate-y-14");
        FooterRef.current.classList.remove("opacity-0");
      } else {
        FooterRef.current.classList.add("translate-y-14");
        FooterRef.current.classList.add("opacity-0");
      }
    }
  };

  useEffect(() => {
    translateFooter();
    window.addEventListener("scroll", translateFooter);
    return () => window.removeEventListener("scroll", translateFooter);
  }, []);

  return (
    <>
      <footer
        ref={FooterRef}
        className="fixed bottom-0 left-0 right-0 z-[1000] flex gap-2 p-1 duration-300 ease-in-out bg-orange-400 border-t-2 border-orange-500 opacity-0 translate-y-14"
      >
        <div className="text-xs text-left text-white underline flex-0">
          <a target="_blank" href="https://reddit.com/r/sngr">reddit</a>
        </div>
        <div className="text-xs text-left text-white underline flex-0">
          <a target="_blank" href="https://discord.gg/FvumZprMcE">discord</a>
        </div>
        <div className="flex-1 text-xs text-right text-white">
          © 2023 jeliroco multimedia. All rights reserved.
        </div>
      </footer>
      <div className="h-10"></div>
    </>
  );
};

export default Footer;
