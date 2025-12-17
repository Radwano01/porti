import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import earthTextureImg from "../../assets/earth.jpg";

/* -------------------- EARTH -------------------- */
function EarthMesh() {
  const coreRef = useRef();

  /* 🌍 Load Earth Texture */
  const earthTexture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(earthTextureImg);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, []);

  /* 🌍 Earth Material */
  const earthMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: earthTexture,
        roughness: 0.9,
        metalness: 0,
      }),
    [earthTexture]
  );

  /* 🌍 Slow Rotation */
  useFrame((_, delta) => {
    if (!coreRef.current) return;
    coreRef.current.rotation.y += delta * 0.03;
  });

  return (
    <group
      position={[0, -5, 0]} // ⬇ pushes earth DOWN (THIS creates the horizon)
      scale={8.5}             // ⬆ big so it fills width
      rotation={[
        THREE.MathUtils.degToRad(8),
        THREE.MathUtils.degToRad(-15),
        0,
      ]}
    >
      <mesh ref={coreRef} material={earthMaterial}>
        <sphereGeometry args={[1, 64, 64]} />
      </mesh>
    </group>
  );
}

/* -------------------- CANVAS -------------------- */
export default function Earth() {
  return (
    <Canvas
      className="absolute inset-0 pointer-events-none"
      camera={{ position: [0, 0, 8], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[3, 2, 5]}
        intensity={2.2}
        color="#a8d8ff"
      />
      <pointLight
        position={[0, 3, 3]}
        intensity={1.5}
        color="#4fc3ff"
      />

      <EarthMesh />
    </Canvas>
  );
}
