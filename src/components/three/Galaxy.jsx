import { useMemo, useRef } from "react";
import { useFrame, Canvas } from "@react-three/fiber";
import * as THREE from "three";
import starTextureImg from "../../assets/star.png";
import { useStarMode } from "../../context/StarModeProvider";
import Saturn from "./Saturn"; // import your SaturnScene

export default function Galaxy({
  count = 12000,
  radius = 12,
  branches = 5,
  spin = 1,
  randomness = 0.4,
}) {
  const points = useRef();
  const { setStarMode } = useStarMode();

  const radii = useRef(new Float32Array(count));
  const state = useRef(new Uint8Array(count)); // 0=color, 1=white
  const baseColors = useRef(new Float32Array(count * 3));

  // Timeline flags (IMPORTANT)
  const flags = useRef({
    whiteSet: false,
    colorSet: false,
  });

  // ----------------------- Geometry -----------------------
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const purple = new THREE.Color("#a855f7");
    const blue = new THREE.Color("#38bdf8");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const r = Math.random() * radius;
      radii.current[i] = r;
      state.current[i] = 0;

      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = r * spin;

      const rand = () =>
        Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1);

      positions[i3] =
        Math.cos(branchAngle + spinAngle) * r + rand() * randomness * r;
      positions[i3 + 1] = rand() * randomness * r * 0.25;
      positions[i3 + 2] =
        Math.sin(branchAngle + spinAngle) * r + rand() * randomness * r;

      const t = Math.pow(r / radius, 1.7);
      const color = purple.clone().lerp(blue, t * 0.6);

      const brightnessMultiplier = i % 10 === 0 ? 1.5 : 1;
      colors[i3] = baseColors.current[i3] = THREE.MathUtils.clamp(
        color.r * brightnessMultiplier,
        0,
        1
      );
      colors[i3 + 1] = baseColors.current[i3 + 1] = THREE.MathUtils.clamp(
        color.g * brightnessMultiplier,
        0,
        1
      );
      colors[i3 + 2] = baseColors.current[i3 + 2] = THREE.MathUtils.clamp(
        color.b * brightnessMultiplier,
        0,
        1
      );
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [count, radius, branches, spin, randomness]);

  const starTexture = useMemo(
    () => new THREE.TextureLoader().load(starTextureImg),
    []
  );

  // ----------------------- Timeline -----------------------
  const timeline = useRef({
    phase: "delay-color",
    timer: 0,
    radius: 0,
  });

  const SPEED = 0.04;
  const DELAY = 4;

  useFrame((_, delta) => {
    if (!points.current) return;

    points.current.rotation.y += 0.0004;

    const colors = points.current.geometry.attributes.color.array;
    timeline.current.timer += delta;

    if (timeline.current.phase === "delay-color") {
      if (timeline.current.timer >= DELAY) {
        timeline.current.phase = "to-white";
        timeline.current.radius = 0;
        timeline.current.timer = 0;
        flags.current.whiteSet = false;
      }
      return;
    }

    if (timeline.current.phase === "to-white") {
      if (!flags.current.whiteSet) {
        setStarMode("white"); 
        flags.current.whiteSet = true;
      }

      timeline.current.radius += SPEED;

      for (let i = 0; i < count; i++) {
        if (state.current[i] !== 0) continue;
        if (radii.current[i] > timeline.current.radius) continue;

        const i3 = i * 3;
        colors[i3] = colors[i3 + 1] = colors[i3 + 2] = 1;
        state.current[i] = 1;
      }

      if (timeline.current.radius > radius + 1) {
        timeline.current.phase = "delay-white";
        timeline.current.timer = 0;
      }
    } else if (timeline.current.phase === "delay-white") {
      if (timeline.current.timer >= DELAY) {
        timeline.current.phase = "to-color";
        timeline.current.radius = 0;
        flags.current.colorSet = false;
      }
    } else if (timeline.current.phase === "to-color") {
      if (!flags.current.colorSet) {
        setStarMode("color"); 
        flags.current.colorSet = true;
      }

      timeline.current.radius += SPEED;

      for (let i = 0; i < count; i++) {
        if (state.current[i] !== 1) continue;
        if (radii.current[i] > timeline.current.radius) continue;

        const i3 = i * 3;
        colors[i3] = baseColors.current[i3];
        colors[i3 + 1] = baseColors.current[i3 + 1];
        colors[i3 + 2] = baseColors.current[i3 + 2];

        state.current[i] = 0;
      }

      if (timeline.current.radius > radius + 1) {
        timeline.current.phase = "delay-color";
        timeline.current.timer = 0;
        timeline.current.radius = 0;
      }
    }

    points.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <>
      <points ref={points} geometry={geometry}>
        <pointsMaterial
          size={0.065}
          sizeAttenuation
          vertexColors
          map={starTexture}
          transparent
          alphaTest={0.02}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* ---------- Add SaturnScene here ---------- */}
    <group
      position={[12.0, 5, -2]}   // TOP RIGHT
      scale={[1.2, 1.2, 1.2]}     // BIGGER
    >
      <Saturn />
    </group>
    </>
  );
}
