import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const ParticleSystem = () => {
  const particlesRef = useRef();
  const texture = useTexture('/particle.png'); // You'll need to create this
  const count = 1000;

  useEffect(() => {
    if (particlesRef.current) {
      // Initialize positions
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 10;
        positions[i3 + 1] = (Math.random() - 0.5) * 10;
        positions[i3 + 2] = (Math.random() - 0.5) * 10;
      }
      particlesRef.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );
    }
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.getElapsedTime() * 0.1;
      particlesRef.current.rotation.y = time * 0.1;

      // Animate particles for a subtle flowing effect
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];

        positions[i3] = x + Math.sin(time + x * 0.5) * 0.01;
        positions[i3 + 1] = y + Math.cos(time + y * 0.5) * 0.01;
        positions[i3 + 2] = z + Math.sin(time + z * 0.5) * 0.01;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.1}
        map={texture}
        transparent
        opacity={0.7}
        color='#3B82F6'
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const ThreeBackground = () => {
  return (
    <div className='absolute inset-0 z-0'>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <ParticleSystem />
        </Float>
        <fog attach='fog' args={['#000', 5, 15]} />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
