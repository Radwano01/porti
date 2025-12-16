// src/components/three/Moon.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import moonTextureImg from "../../assets/moon.jpg";

/* -------------------- MOON -------------------- */
function MoonMesh() {
  const coreRef = useRef();

  /* 🌕 Load Moon Texture */
  const moonTexture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(moonTextureImg);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, []);

  /* 🌕 Moon Core Material with subtle emissive */
  const coreMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: moonTexture,
        emissiveMap: moonTexture,
        emissive: new THREE.Color("#cccccc"),
        emissiveIntensity: 0.25,
        roughness: 0.9,
        metalness: 0,
        toneMapped: false,
      }),
    [moonTexture]
  );

  /* 🌀 Rotation Animation */
  useFrame((_, delta) => {
    if (!coreRef.current) return;
    coreRef.current.rotation.x += delta * 0.08;
    coreRef.current.rotation.y += delta * 0.04;
  });

  return (
    <group
      position={[-5.5, 0, 0]}
      scale={3.0}
      rotation={[THREE.MathUtils.degToRad(10), THREE.MathUtils.degToRad(-15), 0]}
    >
      <mesh ref={coreRef} material={coreMaterial} renderOrder={10}>
        <sphereGeometry args={[1, 64, 64]} />
      </mesh>
    </group>
  );
}

/* -------------------- CANVAS -------------------- */
export default function Moon() {
  return (
    <Canvas
      className="absolute inset-0 z-30 pointer-events-none" // 🔑 ABOVE stars
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[-5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-6, 1, 3]} intensity={1.5} color="#ffffff" />

      <MoonMesh />
    </Canvas>
  );
}
