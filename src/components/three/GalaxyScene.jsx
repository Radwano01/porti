// src/components/three/GalaxyScene.jsx
import { Canvas } from "@react-three/fiber";
import Galaxy from "./Galaxy";

export default function GalaxyScene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 14], fov: 60 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ alpha: false }}
    >
      <color attach="background" args={["#000000"]} />

      <ambientLight intensity={0.6} />

      <Galaxy />
    </Canvas>
  );
}
