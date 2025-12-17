// src/components/three/Sun.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import sunTextureImg from "../../assets/sun.jpg";

/* -------------------- SUN -------------------- */
function SunMesh() {
  const coreRef = useRef();

  /* 🌞 Load Sun Texture */
  const sunTexture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(sunTextureImg);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, []);

  /* 🌞 Sun Core Material */
  const coreMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: sunTexture,
        emissiveMap: sunTexture,
        emissive: new THREE.Color("#ffb347"),
        emissiveIntensity: 0.65,
        roughness: 0.55,
        metalness: 0,
        toneMapped: false,
      }),
    [sunTexture]
  );

  /* 🌀 Rotation Animation */
  useFrame((_, delta) => {
    if (!coreRef.current) return;
    coreRef.current.rotation.x += delta * 0.12;
    coreRef.current.rotation.y += delta * 0.06;
  });

  return (
    <group
      position={[6.2, 0, 0]}
      scale={3.6}
      rotation={[
        THREE.MathUtils.degToRad(170),
        THREE.MathUtils.degToRad(-30),
        0,
      ]}
    >
      {/* Sun Core */}
      <mesh ref={coreRef} material={coreMaterial}>
        <sphereGeometry args={[1, 64, 64]} />
      </mesh>
    </group>
  );
}

/* -------------------- CANVAS -------------------- */
export default function Sun() {
  return (
    <Canvas
      className="absolute inset-0 z-10 pointer-events-none"
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 4, 5]} intensity={2.4} color="#ffd194" />
      <pointLight position={[6, 1, 3]} intensity={3} color="#ff8c00" />

      <SunMesh />
    </Canvas>
  );
}
