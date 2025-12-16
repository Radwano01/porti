import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function randBetween(min, max) {
  return min + Math.random() * (max - min);
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function makeStreakTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Head (right) is brighter; tail (left) soft.
  const g = ctx.createLinearGradient(0, 0, canvas.width, 0);
  g.addColorStop(0.0, "rgba(255,255,255,0.0)");
  g.addColorStop(0.2, "rgba(255,255,255,0.05)");
  g.addColorStop(0.55, "rgba(255,255,255,0.16)");
  g.addColorStop(0.82, "rgba(255,255,255,0.55)");
  g.addColorStop(1.0, "rgba(255,255,255,1.0)");

  // Soft core thickness
  const v = ctx.createLinearGradient(0, 0, 0, canvas.height);
  v.addColorStop(0.0, "rgba(255,255,255,0.0)");
  v.addColorStop(0.35, "rgba(255,255,255,0.75)");
  v.addColorStop(0.5, "rgba(255,255,255,1.0)");
  v.addColorStop(0.65, "rgba(255,255,255,0.75)");
  v.addColorStop(1.0, "rgba(255,255,255,0.0)");

  ctx.fillStyle = g;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "destination-in";
  ctx.fillStyle = v;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;
  return tex;
}

function makeGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, 256, 256);
  const g = ctx.createRadialGradient(128, 128, 4, 128, 128, 120);
  g.addColorStop(0, "rgba(255,255,255,0.95)");
  g.addColorStop(0.25, "rgba(255,255,255,0.55)");
  g.addColorStop(0.55, "rgba(255,255,255,0.16)");
  g.addColorStop(1, "rgba(255,255,255,0.0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;
  return tex;
}

function segmentDistanceToPointSquared(a, b, p) {
  const ab = b.clone().sub(a);
  const ap = p.clone().sub(a);
  const denom = ab.lengthSq();
  if (denom === 0) return ap.lengthSq();
  const t = THREE.MathUtils.clamp(ap.dot(ab) / denom, 0, 1);
  const closest = a.clone().addScaledVector(ab, t);
  return closest.distanceToSquared(p);
}

export default function Meteors({
  count = 14,
  avoidPosition = [2.6, 2.85, 8.7],
  avoidRadius = 1.25,
}) {
  const groupRef = useRef();
  const streakRefs = useRef([]);
  const glowRefs = useRef([]);
  const matsRef = useRef([]);

  const streakTexture = useMemo(() => makeStreakTexture(), []);
  const glowTexture = useMemo(() => makeGlowTexture(), []);
  const avoidVec = useMemo(
    () => new THREE.Vector3(avoidPosition[0], avoidPosition[1], avoidPosition[2]),
    [avoidPosition]
  );

  // World-space region: keep in upper black area.
  const region = useMemo(
    () => ({
      startX: [-9.5, 9.5],
      startY: [6.0, 9.2],
      startZ: [8.8, 12.2],
      endX: [-9.5, 9.5],
      endY: [1.2, 3.9],
      endZ: [6.0, 10.0],
    }),
    []
  );

  const meteorData = useMemo(() => {
    const items = new Array(count).fill(null).map(() => ({
      start: new THREE.Vector3(),
      end: new THREE.Vector3(),
      // slight curve control
      curve: new THREE.Vector3(),
      duration: 0,
      delay: 0,
      t: 0,
      length: 0,
      width: 0,
      baseOpacity: 0,
      roll: 0,
    }));
    return items;
  }, [count]);

  const tmpA = useMemo(() => new THREE.Vector3(), []);
  const tmpB = useMemo(() => new THREE.Vector3(), []);
  const tmpP = useMemo(() => new THREE.Vector3(), []);
  const tmpDir = useMemo(() => new THREE.Vector3(), []);
  const tmpCamInv = useMemo(() => new THREE.Quaternion(), []);

  const tmpGlowOffset = useMemo(() => new THREE.Vector3(), []);

  const spawn = (m, initial = false) => {
    // Try a few times to avoid Saturn corridor
    for (let attempt = 0; attempt < 12; attempt++) {
      m.start.set(
        randBetween(region.startX[0], region.startX[1]),
        randBetween(region.startY[0], region.startY[1]),
        randBetween(region.startZ[0], region.startZ[1])
      );
      m.end.set(
        randBetween(region.endX[0], region.endX[1]),
        randBetween(region.endY[0], region.endY[1]),
        randBetween(region.endZ[0], region.endZ[1])
      );

      // Always travel downward, but allow diagonals left/right.
      if (m.end.y > m.start.y - 3.2) continue;
      if (m.end.distanceToSquared(m.start) < 45) continue;

      const d2 = segmentDistanceToPointSquared(m.start, m.end, avoidVec);
      if (d2 < Math.pow(avoidRadius + 0.7, 2)) continue;

      // Subtle curve perpendicular to travel for "cinematic" movement (not wobbly)
      tmpDir.copy(m.end).sub(m.start).normalize();
      tmpA.set(-tmpDir.y, tmpDir.x, 0).normalize();
      m.curve.copy(tmpA).multiplyScalar(randBetween(-0.42, 0.42));
      m.curve.z += randBetween(-0.18, 0.18);

      m.duration = randBetween(5.5, 8.5);
      m.delay = initial ? randBetween(0, 6) : randBetween(0.4, 2.5);
      m.t = 0;
      m.length = randBetween(1.2, 2.6);
      m.width = randBetween(0.045, 0.085);
      m.baseOpacity = randBetween(0.65, 0.95);
      m.roll = randBetween(-0.25, 0.25);
      return;
    }

    // fallback
    m.start.set(-8, 7.5, 11);
    m.end.set(8, 2.5, 7);
    m.curve.set(0.12, -0.05, 0.05);
    m.duration = 7.0;
    m.delay = initial ? randBetween(0, 4) : 1.2;
    m.t = 0;
    m.length = 2.0;
    m.width = 0.06;
    m.baseOpacity = 0.85;
    m.roll = 0;
  };

  // Initial spawn
  useMemo(() => {
    for (let i = 0; i < meteorData.length; i++) spawn(meteorData[i], true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state, delta) => {
    const cam = state.camera;
    tmpCamInv.copy(cam.quaternion).invert();

    for (let i = 0; i < meteorData.length; i++) {
      const m = meteorData[i];
      const streak = streakRefs.current[i];
      const glow = glowRefs.current[i];
      const mat = matsRef.current[i];
      if (!streak || !glow || !mat) continue;

      if (m.delay > 0) {
        m.delay -= delta;
        // keep hidden while waiting
        mat.opacity = 0;
        glow.material.opacity = 0;
        continue;
      }

      m.t += delta / m.duration;
      if (m.t >= 1) {
        spawn(m);
        continue;
      }

      const u = easeInOutCubic(m.t);

      // Position along start->end with subtle curve
      tmpP.copy(m.start).lerp(m.end, u);
      const curveAmount = Math.sin(u * Math.PI) * 0.55;
      tmpP.addScaledVector(m.curve, curveAmount);

      // Make streak face camera (billboard), then rotate in camera plane to align with motion.
      // Approximate velocity by sampling forward position.
      const u2 = Math.min(1, u + 0.002);
      tmpA.copy(m.start).lerp(m.end, u2).addScaledVector(m.curve, Math.sin(u2 * Math.PI) * 0.55);
      tmpDir.copy(tmpA).sub(tmpP);
      if (tmpDir.lengthSq() < 1e-8) tmpDir.set(1, 0, 0);

      // Convert direction into camera space to get a stable screen-plane angle.
      tmpDir.applyQuaternion(tmpCamInv).normalize();
      const angle = Math.atan2(tmpDir.y, tmpDir.x) + m.roll;

      // Fade in/out (professional cadence)
      const fadeIn = THREE.MathUtils.clamp(m.t / 0.12, 0, 1);
      const fadeOut = THREE.MathUtils.clamp((1 - m.t) / 0.18, 0, 1);
      const alpha = m.baseOpacity * Math.min(fadeIn, fadeOut);

      // Update transforms
      streak.position.copy(tmpP);
      streak.quaternion.copy(cam.quaternion);
      streak.rotation.z = angle;
      streak.scale.set(m.length, m.width, 1);

      // Head glow offset in camera plane, transformed to world.
      tmpGlowOffset
        .set(Math.cos(angle), Math.sin(angle), 0)
        .multiplyScalar(m.length * 0.48)
        .applyQuaternion(cam.quaternion);
      glow.position.copy(tmpP).add(tmpGlowOffset);
      glow.quaternion.copy(cam.quaternion);
      glow.scale.set(m.width * 6.5, m.width * 6.5, 1);

      // Material opacity
      mat.opacity = alpha;
      glow.material.opacity = alpha * 0.75;
    }
  });

  return (
    <group ref={groupRef} renderOrder={5}>
      {meteorData.map((m, i) => (
        <group key={i}>
          <mesh
            ref={(r) => {
              streakRefs.current[i] = r;
            }}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              ref={(mat) => {
                matsRef.current[i] = mat;
              }}
              map={streakTexture}
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              depthTest={false}
              toneMapped={false}
              color={new THREE.Color("#ffffff")}
            />
          </mesh>

          <mesh
            ref={(r) => {
              glowRefs.current[i] = r;
            }}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              map={glowTexture}
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              depthTest={false}
              toneMapped={false}
              color={new THREE.Color("#ffffff")}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}