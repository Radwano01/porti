import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import FallingStars from "./FallingStars";

function ContinuousRender() {
  const { gl, invalidate } = useThree();

  useEffect(() => {
    const id = setInterval(() => {
      invalidate(); // force render even if tab is inactive
    }, 16); // ~60fps
    return () => clearInterval(id);
  }, [invalidate]);

  return null;
}

export default function FallingStarsScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 60 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ alpha: true }}
    >
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.8} />
      <FallingStars />
      <ContinuousRender />
    </Canvas>
  );
}
