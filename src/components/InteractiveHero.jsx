import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const InteractiveHero = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });

  // Update container dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Track mouse position relative to container
  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const { left, top } = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - left,
        y: e.clientY - top,
      });
    }
  };

  // Calculate perspective transforms based on mouse position
  const calcDynamicStyles = () => {
    if (containerDimensions.width === 0) return {};

    const centerX = containerDimensions.width / 2;
    const centerY = containerDimensions.height / 2;

    // Calculate distance from center as percentage
    const moveX = (mousePosition.x - centerX) / centerX;
    const moveY = (mousePosition.y - centerY) / centerY;

    return {
      '--cursor-x': `${mousePosition.x}px`,
      '--cursor-y': `${mousePosition.y}px`,
      '--move-x': moveX.toFixed(2),
      '--move-y': moveY.toFixed(2),
    };
  };

  return (
    <motion.div
      ref={containerRef}
      className='relative overflow-hidden cursor-none'
      onMouseMove={handleMouseMove}
      style={calcDynamicStyles()}
    >
      {/* Custom cursor */}
      <motion.div
        className='w-10 h-10 rounded-full bg-blue-500/30 fixed z-50 pointer-events-none'
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: 1,
          opacity: 0.6,
        }}
        transition={{ type: 'spring', mass: 0.1, stiffness: 150 }}
      />
      <motion.div
        className='w-4 h-4 rounded-full bg-blue-500 fixed z-50 pointer-events-none'
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: 'spring', mass: 0.05, stiffness: 300 }}
      />

      {/* Actual content with perspective effect */}
      <motion.div
        className='perspective-container'
        style={{
          transform: 'perspective(1000px)',
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          style={{
            transform: `rotateY(calc(var(--move-x) * 4deg)) rotateX(calc(var(--move-y) * -4deg))`,
            transformStyle: 'preserve-3d',
          }}
        >
          {children}
        </motion.div>
      </motion.div>

      {/* Spotlight effect */}
      <div
        className='pointer-events-none absolute inset-0 opacity-30 mix-blend-screen'
        style={{
          background: `radial-gradient(circle 400px at var(--cursor-x) var(--cursor-y), rgba(59, 130, 246, 0.5), transparent)`,
          transition: 'transform 0.05s ease',
        }}
      />
    </motion.div>
  );
};

export default InteractiveHero;
