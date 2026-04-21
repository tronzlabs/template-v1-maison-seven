import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";

/**
 * A minimal architectural interior built from primitives.
 * Camera choreographs itself through four rooms based on a normalized
 * scroll value (0 → 1) provided by the parent page.
 *
 * --- Shadow notes ---
 * Three.js r184 emits a deprecation warning for `PCFSoftShadowMap`
 * (WebGLShadowMap.js line 99-104) and falls back to `PCFShadowMap`
 * anyway, so we use `PCFShadowMap` directly. The perceived softness is
 * preserved through:
 *   - generous shadow-mapSize (2048²)
 *   - normalBias to hide acne cleanly
 *   - <ContactShadows> on the floor
 *   - an environment map that carries the ambient wrap
 *
 * We also deliberately do NOT use drei's <SoftShadows>: it patches
 * `THREE.ShaderChunk.shadowmap_pars_fragment` with GLSL that calls
 * `unpackRGBAToDepth(texture2D(shadowMap, …))`. Since r162 `shadowMap`
 * is a `sampler2DShadow` (texture2D returns float, not vec4), that
 * helper has no matching overload and the fragment shader refuses to
 * compile.
 */
export default function Scene3D({ scrollRef, className = "" }) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        dpr={[1, 1.6]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#F5F5F3", 1);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFShadowMap;
        }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={["#F5F5F3", 8, 26]} />

          <PerspectiveCamera makeDefault fov={36} position={[0, 1.6, 7.5]} />

          <CameraRig scrollRef={scrollRef} />

          <Lights />

          <Room />
          <Furniture />
          <FloatingObjects />

          <ContactShadows
            position={[0, 0.001, 0]}
            opacity={0.5}
            scale={24}
            blur={2.8}
            far={6}
            resolution={1024}
            color="#1C1C1C"
          />

          <Environment preset="apartment" environmentIntensity={0.55} />
        </Suspense>
      </Canvas>
    </div>
  );
}

/* ------------------------------- Camera ------------------------------- */

const STAGES = [
  { p: 0.0, pos: [0, 1.6, 7.2], look: [0, 1.2, 0] },
  { p: 0.22, pos: [-1.4, 1.55, 3.2], look: [0.4, 1.1, -0.5] },
  { p: 0.48, pos: [2.0, 1.4, 1.8], look: [-1.2, 1.0, -2.4] },
  { p: 0.72, pos: [-1.6, 1.35, -0.8], look: [1.2, 1.1, -3.0] },
  { p: 1.0, pos: [0, 2.6, -4.2], look: [0, 1.1, -6] },
];

function lerpArray(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function sampleStage(p) {
  const clamped = Math.max(0, Math.min(1, p));
  for (let i = 0; i < STAGES.length - 1; i++) {
    const a = STAGES[i];
    const b = STAGES[i + 1];
    if (clamped >= a.p && clamped <= b.p) {
      const t = (clamped - a.p) / (b.p - a.p);
      const e = t * t * (3 - 2 * t);
      return { pos: lerpArray(a.pos, b.pos, e), look: lerpArray(a.look, b.look, e) };
    }
  }
  return { pos: STAGES[STAGES.length - 1].pos, look: STAGES[STAGES.length - 1].look };
}

function CameraRig({ scrollRef }) {
  const current = useRef({ pos: [0, 1.6, 7.2], look: [0, 1.2, 0] });

  useFrame(({ camera, pointer }) => {
    const p = scrollRef?.current ?? 0;
    const target = sampleStage(p);

    const px = pointer.x * 0.25;
    const py = pointer.y * 0.12;

    const tx = target.pos[0] + px;
    const ty = target.pos[1] + py;
    const tz = target.pos[2];

    current.current.pos = [
      current.current.pos[0] + (tx - current.current.pos[0]) * 0.065,
      current.current.pos[1] + (ty - current.current.pos[1]) * 0.065,
      current.current.pos[2] + (tz - current.current.pos[2]) * 0.065,
    ];
    current.current.look = [
      current.current.look[0] + (target.look[0] - current.current.look[0]) * 0.065,
      current.current.look[1] + (target.look[1] - current.current.look[1]) * 0.065,
      current.current.look[2] + (target.look[2] - current.current.look[2]) * 0.065,
    ];

    camera.position.set(...current.current.pos);
    camera.lookAt(...current.current.look);
  });
  return null;
}

/* ------------------------------- Lights ------------------------------- */

function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} color="#FDF6E8" />

      {/* Warm sun through the window — main shadow caster */}
      <directionalLight
        position={[-6, 5.5, 4.5]}
        intensity={1.9}
        color="#F3D9A4"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-near={0.1}
        shadow-camera-far={30}
          shadow-bias={-0.0004}
          shadow-normalBias={0.03}
        />

      {/* Cool fill light (no shadow — saves a shadow pass) */}
      <directionalLight position={[5, 4, -3]} intensity={0.25} color="#BFD4E8" />

      {/* Gold pendant glow over the dining area */}
      <pointLight position={[2.4, 2.2, -1.0]} intensity={2.2} distance={4.5} decay={1.6} color="#F2CE8A" />

      {/* Bedroom warm practical */}
      <pointLight position={[-2.2, 1.2, -3.8]} intensity={1.4} distance={3.5} decay={1.7} color="#E7B574" />
    </>
  );
}

/* -------------------------------- Room -------------------------------- */

function Room() {
  const plaster = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#EFEAE1",
        roughness: 0.95,
        metalness: 0,
      }),
    []
  );

  const floor = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#D9CEB8",
        roughness: 0.75,
        metalness: 0.02,
      }),
    []
  );

  const dark = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1D1B19",
        roughness: 0.9,
      }),
    []
  );

  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, -3]} receiveShadow material={floor}>
        <planeGeometry args={[20, 20]} />
      </mesh>

      <mesh position={[0, 2.4, -8]} receiveShadow material={plaster}>
        <boxGeometry args={[20, 5, 0.2]} />
      </mesh>

      <WallWithWindow position={[-5, 0, -3]} rotation={[0, Math.PI / 2, 0]} material={plaster} />

      <mesh position={[5, 2.4, -3]} rotation-y={-Math.PI / 2} material={dark} receiveShadow>
        <boxGeometry args={[10, 5, 0.2]} />
      </mesh>

      <mesh position={[0, 0.9, -3.8]} material={plaster} castShadow receiveShadow>
        <boxGeometry args={[0.15, 1.8, 3]} />
      </mesh>

      <mesh position={[0, 0.04, -7.9]}>
        <boxGeometry args={[20, 0.08, 0.03]} />
        <meshStandardMaterial color="#C2A878" metalness={0.4} roughness={0.45} />
      </mesh>
    </group>
  );
}

function WallWithWindow({ position, rotation, material }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.45, 0]} material={material} receiveShadow>
        <boxGeometry args={[10, 0.9, 0.2]} />
      </mesh>
      <mesh position={[0, 3.8, 0]} material={material} receiveShadow>
        <boxGeometry args={[10, 1.4, 0.2]} />
      </mesh>
      <mesh position={[-3, 2.1, 0]} material={material} receiveShadow>
        <boxGeometry args={[4, 2.4, 0.2]} />
      </mesh>
      <mesh position={[3, 2.1, 0]} material={material} receiveShadow>
        <boxGeometry args={[4, 2.4, 0.2]} />
      </mesh>

      <mesh position={[0, 2.1, 0.01]}>
        <boxGeometry args={[3.05, 0.04, 0.04]} />
        <meshStandardMaterial color="#1C1C1C" />
      </mesh>
      <mesh position={[0, 2.1, 0.01]}>
        <boxGeometry args={[0.04, 2.45, 0.04]} />
        <meshStandardMaterial color="#1C1C1C" />
      </mesh>

      <mesh position={[0, 2.1, 0.04]}>
        <planeGeometry args={[3.0, 2.4]} />
        <meshStandardMaterial
          color="#FCEFD3"
          transparent
          opacity={0.25}
          emissive="#F6DFB0"
          emissiveIntensity={0.35}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

/* ----------------------------- Furniture ----------------------------- */

function Furniture() {
  return (
    <group>
      <group position={[-1.2, 0, -1.4]}>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.35, 0.9]} />
          <meshStandardMaterial color="#E6DDCE" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.75, -0.35]} castShadow>
          <boxGeometry args={[2.6, 0.55, 0.2]} />
          <meshStandardMaterial color="#DED3C2" roughness={0.85} />
        </mesh>
        <mesh position={[-1, 0.75, 0.05]} castShadow>
          <boxGeometry args={[0.6, 0.4, 0.4]} />
          <meshStandardMaterial color="#CFC3AE" roughness={0.85} />
        </mesh>
        <mesh position={[1, 0.75, 0.05]} castShadow>
          <boxGeometry args={[0.6, 0.4, 0.4]} />
          <meshStandardMaterial color="#CFC3AE" roughness={0.85} />
        </mesh>
      </group>

      <group position={[-1.0, 0, -0.25]}>
        <mesh position={[0, 0.34, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.08, 0.7]} />
          <meshStandardMaterial color="#E3D6BF" roughness={0.55} metalness={0.05} />
        </mesh>
        <mesh position={[0, 0.17, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.34, 32]} />
          <meshStandardMaterial color="#1C1C1C" roughness={0.5} />
        </mesh>
      </group>

      <group position={[3.2, 0, -2.0]}>
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.06, 0.9]} />
          <meshStandardMaterial color="#141312" roughness={0.55} metalness={0.3} />
        </mesh>
        <mesh position={[-1.2, 0.375, 0]} castShadow>
          <boxGeometry args={[0.05, 0.75, 0.9]} />
          <meshStandardMaterial color="#0A0A09" roughness={0.5} metalness={0.4} />
        </mesh>
        <mesh position={[1.2, 0.375, 0]} castShadow>
          <boxGeometry args={[0.05, 0.75, 0.9]} />
          <meshStandardMaterial color="#0A0A09" roughness={0.5} metalness={0.4} />
        </mesh>

        <mesh position={[-0.8, 0.82, 0.1]} castShadow>
          <boxGeometry args={[0.35, 0.04, 0.25]} />
          <meshStandardMaterial color="#c2a878" roughness={0.6} />
        </mesh>
        <mesh position={[-0.8, 0.86, 0.1]} castShadow>
          <boxGeometry args={[0.32, 0.03, 0.22]} />
          <meshStandardMaterial color="#1C1C1C" roughness={0.7} />
        </mesh>
      </group>

      <group position={[-2.6, 0, -4.8]}>
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.2, 1.6]} />
          <meshStandardMaterial color="#D8CCB6" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.45, -0.15]} castShadow>
          <boxGeometry args={[2.1, 0.22, 1.3]} />
          <meshStandardMaterial color="#F2ECDF" roughness={0.95} />
        </mesh>
        <mesh position={[-0.6, 0.66, -0.45]} castShadow>
          <boxGeometry args={[0.7, 0.18, 0.4]} />
          <meshStandardMaterial color="#F6F2E6" roughness={0.98} />
        </mesh>
        <mesh position={[0.6, 0.66, -0.45]} castShadow>
          <boxGeometry args={[0.7, 0.18, 0.4]} />
          <meshStandardMaterial color="#F6F2E6" roughness={0.98} />
        </mesh>
      </group>

      <group position={[1.4, 0, -5.6]}>
        {[-0.8, 0, 0.8].map((dx, i) => (
          <group key={i} position={[dx, 0, 0]}>
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.18, 0.18, 1, 24]} />
              <meshStandardMaterial color="#EFEAE1" roughness={0.9} />
            </mesh>
            <mesh position={[0, 1.08, 0]} castShadow>
              <boxGeometry args={[0.18 + i * 0.04, 0.12, 0.18 + i * 0.04]} />
              <meshStandardMaterial color="#C2A878" metalness={0.4} roughness={0.5} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

/* --------------------------- Floating objects --------------------------- */

function FloatingObjects() {
  return (
    <group>
      <group position={[2.4, 0, -1.0]}>
        <mesh position={[0, 3.8, 0]}>
          <boxGeometry args={[0.03, 1.6, 0.03]} />
          <meshStandardMaterial color="#1C1C1C" />
        </mesh>
        <mesh position={[0, 3.0, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.22, 0.4, 24]} />
          <meshStandardMaterial
            color="#C2A878"
            emissive="#E6BE80"
            emissiveIntensity={0.55}
            metalness={0.55}
            roughness={0.35}
          />
        </mesh>
      </group>

      <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.35}>
        <group position={[-1.0, 0.5, -0.25]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.06, 0.1, 0.32, 24]} />
            <meshStandardMaterial color="#EFEAE1" roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.28, 0]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial color="#C2A878" roughness={0.4} metalness={0.5} />
          </mesh>
        </group>
      </Float>

      <Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[-3.5, 1.8, 0.3]}>
          <sphereGeometry args={[0.09, 24, 24]} />
          <meshStandardMaterial
            color="#F2CE8A"
            emissive="#F2CE8A"
            emissiveIntensity={0.55}
            roughness={0.25}
            metalness={0.25}
          />
        </mesh>
      </Float>
    </group>
  );
}
