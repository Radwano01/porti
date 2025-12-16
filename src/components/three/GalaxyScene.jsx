// src/components/three/GalaxyScene.jsx
import { Canvas } from "@react-three/fiber";
import Galaxy from "./Galaxy";
import Meteors from "./Meteors";

export default function GalaxyScene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 14], fov: 60 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ alpha: false }}
    >
      <color attach="background" args={["#000000"]} />

      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 5, 10]} intensity={0.9} />

      <Meteors />

      <Galaxy />
    </Canvas>
  );
}
