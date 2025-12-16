import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStarMode } from "../../context/StarModeProvider";
import starTextureImg from "../../assets/star.png";

export default function FallingStars({
  count = 2000,
  spreadX = 25,
  spreadY = 20,
  burningColors = false,
  speedMultiplier = 0.2,
}) {
  const points = useRef();
  const materialRef = useRef();
  const { starMode } = useStarMode();

  const speeds = useRef(new Float32Array(count));
  const baseColors = useRef(new Float32Array(count * 3));
  const state = useRef(new Uint8Array(count));
  const distances = useRef(new Float32Array(count));

  const transition = useRef({
    active: false,
    radius: 0,
    target: starMode,
  });

  // ----------------------- Geometry -----------------------
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positions[i3] = THREE.MathUtils.randFloat(-spreadX, spreadX);
      positions[i3 + 1] = THREE.MathUtils.randFloat(-spreadY, spreadY);
      positions[i3 + 2] = THREE.MathUtils.randFloat(-6, 2);

      speeds.current[i] = THREE.MathUtils.randFloat(2.0, 3.5);

      let color;
      if (burningColors) {
        const t = Math.random();
        color = new THREE.Color().setHSL(0.08 + 0.05 * t, 1.0, 0.5);
      } else {
        const purple = new THREE.Color("#a855f7");
        const blue = new THREE.Color("#38bdf8");
        color = purple.clone().lerp(blue, Math.random() * 0.6);
      }

      colors[i3] = baseColors.current[i3] = color.r;
      colors[i3 + 1] = baseColors.current[i3 + 1] = color.g;
      colors[i3 + 2] = baseColors.current[i3 + 2] = color.b;

      state.current[i] = 0;
      distances.current[i] = Math.hypot(
        positions[i3],
        positions[i3 + 1]
      );
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [count, spreadX, spreadY, burningColors]);

  // ----------------------- Texture -----------------------
  const starTexture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(starTextureImg);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    return tex;
  }, []);

  // ----------------------- Update colors on mode change -----------------------
  useEffect(() => {
    if (!points.current) return;

    const colors = points.current.geometry.attributes.color.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      let color;
      if (burningColors) {
        const t = Math.random();
        color = new THREE.Color().setHSL(0.08 + 0.05 * t, 1.0, 0.5);
      } else {
        const purple = new THREE.Color("#a855f7");
        const blue = new THREE.Color("#38bdf8");
        color = purple.clone().lerp(blue, Math.random() * 0.6);
      }

      baseColors.current[i3] = color.r;
      baseColors.current[i3 + 1] = color.g;
      baseColors.current[i3 + 2] = color.b;

      if (starMode === "color") {
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
        state.current[i] = 0;
      } else {
        colors[i3] = colors[i3 + 1] = colors[i3 + 2] = 1;
        state.current[i] = 1;
      }
    }

    points.current.geometry.attributes.color.needsUpdate = true;
    transition.current.active = true;
    transition.current.radius = 0;
    transition.current.target = starMode;
  }, [burningColors, starMode, count]);

  // ----------------------- Animation -----------------------
  useFrame(() => {
    if (!points.current) return;

    const pos = points.current.geometry.attributes.position.array;
    const col = points.current.geometry.attributes.color.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const speed = speeds.current[i] * speedMultiplier;

      pos[i3] += speed * 0.03;
      pos[i3 + 1] -= speed * 0.015;

      // Respawn
      if (pos[i3] > spreadX || pos[i3 + 1] < -spreadY) {
        pos[i3] = THREE.MathUtils.randFloat(-spreadX, spreadX);
        pos[i3 + 1] = THREE.MathUtils.randFloat(-spreadY, spreadY);
        state.current[i] = 0;

        col[i3] = baseColors.current[i3];
        col[i3 + 1] = baseColors.current[i3 + 1];
        col[i3 + 2] = baseColors.current[i3 + 2];
      }

      // -------- radial smooth transition --------
      if (!burningColors && transition.current.active) {
        if (distances.current[i] < transition.current.radius) {
          if (transition.current.target === "white" && state.current[i] === 0) {
            col[i3] = col[i3 + 1] = col[i3 + 2] = 1;
            state.current[i] = 1;
          } else if (
            transition.current.target === "color" &&
            state.current[i] === 1
          ) {
            col[i3] = baseColors.current[i3];
            col[i3 + 1] = baseColors.current[i3 + 1];
            col[i3 + 2] = baseColors.current[i3 + 2];
            state.current[i] = 0;
          }
        }
      }
    }

    if (!burningColors && transition.current.active) {
      transition.current.radius += 0.06 * speedMultiplier;
      if (transition.current.radius > spreadX + spreadY) {
        transition.current.active = false;
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.geometry.attributes.color.needsUpdate = true;
  });

  // ----------------------- Render -----------------------
  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        ref={materialRef}
        size={0.35}
        sizeAttenuation
        map={starTexture}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
        onBeforeCompile={(shader) => {
          if (shader.__bgFixed) return;
          shader.__bgFixed = true;

          shader.fragmentShader = shader.fragmentShader.replace(
            "#include <map_particle_fragment>",
            `
              vec4 texelColor = texture2D(map, gl_PointCoord);
              float luminance = dot(texelColor.rgb, vec3(0.299, 0.587, 0.114));

              if (luminance < 0.12) discard;

              diffuseColor *= texelColor;
            `
          );
        }}
      />
    </points>
  );
}
