// Card.tsx
import React, { useState } from "react";

interface CardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  duration?: number;
}

const Card: React.FC<CardProps> = ({ front, back, duration = 500 }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPhysicallyFlipped, setIsPhysicallyFlipped] = useState(false);
  const [isAnimating, setisAnimating] = useState(false);

  const handleClick = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setisAnimating(true);
      setTimeout(() => {
        setIsPhysicallyFlipped(!isPhysicallyFlipped);
      }, duration * 0.35);
      setTimeout(() => {
        setisAnimating(false);
      }, duration);
    }
  };

  return (
    <div
      className={`cursor-pointer relative transition-transform ease-in-out duration-${duration.toString()} ${
        isFlipped ? "-scale-x-100" : ""
      }`}
      onClick={handleClick}
    >
      {/* put the front of the card but invisible for sizing*/}
      <div className="opacity-0">{front}</div>
      {isPhysicallyFlipped && (
        <div className="absolute inset-0 -scale-x-100">{back}</div>
      )}
      {!isPhysicallyFlipped && <div className="absolute inset-0">{front}</div>}
    </div>
  );
};

export default Card;
