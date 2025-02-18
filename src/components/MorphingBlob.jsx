import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { createNoise3D } from 'simplex-noise'; // Changed this line

// This component creates the actual blob
const Blob = ({ colors = ['#3B82F6', '#06B6D4'], position = 'center', size = 300 }) => {
  const mesh = useRef();
  const noise = useRef(createNoise3D()); // Changed this line
  
  // Rest of the Blob component code remains the same...
  const getPosition = () => {
    switch (position) {
      case 'top-right':
        return [2, 2, 0];
      case 'top-left':
        return [-2, 2, 0];
      case 'bottom-right':
        return [2, -2, 0];
      case 'bottom-left':
        return [-2, -2, 0];
      default:
        return [0, 0, 0];
    }
  };

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 0.2;
    
    if (mesh.current && mesh.current.geometry) {
      const { position } = mesh.current.geometry.attributes;
      const originalPosition = mesh.current.geometry.userData.originalPosition;
      
      for (let i = 0; i < position.count; i++) {
        const p = new THREE.Vector3(
          originalPosition.array[i * 3],
          originalPosition.array[i * 3 + 1],
          originalPosition.array[i * 3 + 2]
        );
        
        const noiseValue = noise.current(
          p.x * 0.3 + time, 
          p.y * 0.3 + time, 
          p.z * 0.3
        ) * 0.5 + 0.5;
        
        const scalar = 1 + noiseValue * 0.3;
        p.multiplyScalar(scalar);
        
        position.array[i * 3] = p.x;
        position.array[i * 3 + 1] = p.y;
        position.array[i * 3 + 2] = p.z;
      }
      
      position.needsUpdate = true;
    }
    
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(time * 0.3) * 0.2;
      mesh.current.rotation.y = Math.sin(time * 0.2) * 0.3;
    }
  });

  useEffect(() => {
    if (mesh.current && mesh.current.geometry) {
      const positionAttribute = mesh.current.geometry.attributes.position;
      const originalPosition = new THREE.BufferAttribute(
        new Float32Array(positionAttribute.array.length),
        3
      );
      originalPosition.array.set(positionAttribute.array);
      mesh.current.geometry.userData.originalPosition = originalPosition;
    }
  }, []);

  return (
    <mesh ref={mesh} position={getPosition()}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhongMaterial
        color={colors[0]}
        emissive={colors[1]}
        emissiveIntensity={0.2}
        transparent
        opacity={0.7}
        shininess={50}
      />
    </mesh>
  );
};

// Main component
export const MorphingBlob = ({ colors, position, size, className = '' }) => {
  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    position: 'absolute',
    zIndex: 0,
    pointerEvents: 'none',
  };

  // Position the container
  const getContainerPosition = () => {
    switch (position) {
      case 'top-right':
        return { top: `-${size/3}px`, right: `-${size/3}px` };
      case 'top-left':
        return { top: `-${size/3}px`, left: `-${size/3}px` };
      case 'bottom-right':
        return { bottom: `-${size/3}px`, right: `-${size/3}px` };
      case 'bottom-left':
        return { bottom: `-${size/3}px`, left: `-${size/3}px` };
      default:
        return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  return (
    <div
      className={className}
      style={{
        ...containerStyle,
        ...getContainerPosition(),
      }}
    >
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Blob colors={colors} position={position} size={size} />
      </Canvas>
    </div>
  );
};

export default MorphingBlob;