import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

const HeroCamera = ({ isMobile, children }) => {
  const group = useRef();

  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [0, 0, isMobile ? 22 : 20],
      0.22,
      delta,
    );

    if (!isMobile && group.current) {
      easing.dampE(
        group.current.rotation,
        [-state.pointer.y / 4, state.pointer.x / 6, 0],
        0.22,
        delta,
      );
    }
  });

  return <group ref={group}>{children}</group>;
};

export default HeroCamera;
