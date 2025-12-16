import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import saturnTexture from "../../assets/saturnTexture.jpg";
import saturnRing from "../../assets/saturnRing.jpg";

export default function Saturn() {
  const groupRef = useRef();
  const planetRef = useRef();
  const ringRef = useRef();

  const planetMap = useMemo(
    () => new THREE.TextureLoader().load(saturnTexture),
    []
  );
  const ringMap = useMemo(
    () => new THREE.TextureLoader().load(saturnRing),
    []
  );

  useFrame((_, delta) => {
    planetRef.current.rotation.y += delta * 0.1;
    ringRef.current.rotation.z += delta * 0.03;
  });

  return (
    <group
      ref={groupRef}
      rotation={[0, -0.35, 0.15]} // 👈 subtle left curvature
    >
      {/* Planet */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={planetMap}
          roughness={0.6}
          metalness={0}
        />
      </mesh>

      {/* Rings */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.4, 2.6, 128]} />
        <meshStandardMaterial
          map={ringMap}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <directionalLight position={[5, 4, 6]} intensity={1.5} />
      <ambientLight intensity={0.3} />
    </group>
  );
}
