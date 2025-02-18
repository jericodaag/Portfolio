import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const AnimatedProjectCard = ({
  title,
  description,
  technologies = [],
  projectUrl = '#',
  className = '',
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Handle mouse move to create the 3D effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setMousePosition({ x, y });
  };

  // Calculate the 3D rotation based on mouse position
  const rotateX = isHovered ? (mousePosition.y - 0.5) * 20 : 0;
  const rotateY = isHovered ? (mousePosition.x - 0.5) * -20 : 0;

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-xl overflow-hidden transition-all ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformOrigin: 'center center',
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 5px 20px rgba(59, 130, 246, 0.25)',
      }}
    >
      {/* Glossy overlay effect */}
      <div
        className='absolute inset-0 z-10 opacity-0 bg-gradient-to-tr from-transparent via-white to-transparent'
        style={{
          opacity: isHovered ? 0.1 : 0,
          transform: `translateX(${
            (mousePosition.x - 0.5) * 100
          }%) translateY(${(mousePosition.y - 0.5) * 100}%)`,
          transition: 'opacity 0.3s ease',
          backgroundSize: '200% 200%',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Card content */}
      <div className='p-6 border border-white/10 bg-gradient-to-b from-black/60 to-black/80 backdrop-blur-sm z-0'>
        <h3
          className='text-xl font-bold mb-2 transform-gpu'
          style={{ transform: 'translateZ(40px)' }}
        >
          {title}
        </h3>

        <p
          className='text-gray-400 mb-4 transform-gpu'
          style={{ transform: 'translateZ(30px)' }}
        >
          {description}
        </p>

        <div
          className='flex flex-wrap gap-2 mb-4 transform-gpu'
          style={{ transform: 'translateZ(25px)' }}
        >
          {technologies.map((tech, index) => (
            <motion.span
              key={index}
              className='bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm'
              whileHover={{
                backgroundColor: 'rgba(59, 130, 246, 0.3)',
                y: -3,
                boxShadow: '0 3px 10px rgba(59, 130, 246, 0.3)',
                transition: { duration: 0.2 },
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        <motion.a
          href={projectUrl}
          className='text-blue-400 hover:text-blue-300 transition-colors my-4 inline-block transform-gpu'
          style={{ transform: 'translateZ(50px)' }}
          whileHover={{
            scale: 1.05,
            x: 5,
          }}
        >
          View Project →
        </motion.a>
      </div>
    </motion.div>
  );
};

export default AnimatedProjectCard;
