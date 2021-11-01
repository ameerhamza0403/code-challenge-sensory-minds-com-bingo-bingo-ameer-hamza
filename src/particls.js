import ConfettiExplosion from "@reonomy/react-confetti-explosion";
import { useState } from "react";

export const useExplosion = () => {
  const [isExploding, setIsExploding] = useState(false);

  const explodeConfetti = () => {
    // TODO: use debouncing hook instead of settimeout
    setTimeout(() => {
      setIsExploding(true);
    }, 200);

    setTimeout(() => {
      setIsExploding(false);
    }, 2100);
  };

  return {
    isExploding,
    explodeConfetti,
  };
};

const ParticleContainer = () => {
  return (
    <>
      <ConfettiExplosion
        force={0.6}
        duration={2000}
        particleCount={200}
        floorHeight={1600}
        floorWidth={1600}
      />
    </>
  );
};

export default ParticleContainer;
