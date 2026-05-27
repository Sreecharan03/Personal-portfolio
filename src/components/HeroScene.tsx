"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Group } from "three";

function RibbonCluster() {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.09;
    group.current.rotation.x = Math.sin(Date.now() * 0.0002) * 0.18;
  });

  return (
    <group ref={group}>
      {[...Array(18)].map((_, idx) => {
        const angle = (idx / 18) * Math.PI * 2;
        const radius = 1.6 + (idx % 4) * 0.18;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle * 1.8) * 0.45;
        const z = Math.sin(angle) * radius * 0.6;
        return (
          <Float
            key={idx}
            speed={1 + (idx % 3) * 0.2}
            rotationIntensity={0.8}
            floatIntensity={1.2}
          >
            <mesh position={[x, y, z]}>
              <icosahedronGeometry args={[0.16 + (idx % 5) * 0.02, 0]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? "#c9788d" : "#d8a46b"}
                roughness={0.25}
                metalness={0.3}
                transparent
                opacity={0.88}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 4, 3]} intensity={1.1} />
      <pointLight position={[-4, -2, 2]} intensity={0.8} color="#d8a46b" />
      <RibbonCluster />
    </Canvas>
  );
}
