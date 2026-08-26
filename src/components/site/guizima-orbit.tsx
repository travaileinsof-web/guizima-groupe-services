"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function GuizimaPrism() {
  const prism = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!prism.current) return;
    prism.current.rotation.y += delta * 0.16;
    prism.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.35}>
      <mesh ref={prism} rotation={[0.12, 0.45, 0]} castShadow>
        <octahedronGeometry args={[1.65, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          resolution={256}
          thickness={0.7}
          roughness={0.16}
          anisotropy={0.25}
          chromaticAberration={0.06}
          distortion={0.12}
          distortionScale={0.3}
          temporalDistortion={0.08}
          color="#d5a84b"
          transmission={0.86}
        />
      </mesh>
      <mesh rotation={[0.12, 0.45, 0]} scale={1.08}>
        <octahedronGeometry args={[1.65, 1]} />
        <meshBasicMaterial color="#f0c66a" wireframe transparent opacity={0.24} />
      </mesh>
    </Float>
  );
}

export function GuizimaOrbit() {
  return (
    <div className="pointer-events-none absolute right-[-7rem] top-1/2 hidden h-[38rem] w-[38rem] -translate-y-1/2 lg:block xl:right-[-2rem]" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6.2], fov: 32 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.65} />
        <directionalLight position={[3, 4, 5]} intensity={3} color="#f6d58c" />
        <pointLight position={[-3, -2, 2]} intensity={5} color="#248a72" />
        <GuizimaPrism />
        <ContactShadows position={[0, -2.1, 0]} opacity={0.35} scale={5} blur={2.8} far={4} />
        <Environment preset="city" environmentIntensity={0.55} />
      </Canvas>
      <div className="absolute inset-[18%] rounded-full border border-gold/20" />
      <div className="absolute inset-[8%] rounded-full border border-emerald/15 [transform:rotate(28deg)_scaleY(.38)]" />
    </div>
  );
}
