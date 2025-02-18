import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const MagneticButton = ({
  children,
  className = '',
  strength = 50,
  onClick,
}) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [buttonDimensions, setButtonDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isHovered, setIsHovered] = useState(false);

  // Update button dimensions when window resizes
  useEffect(() => {
    const updateDimensions = () => {
      if (buttonRef.current) {
        const { width, height } = buttonRef.current.getBoundingClientRect();
        setButtonDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Calculate magnetic effect based on mouse position
  const handleMouseMove = (e) => {
    if (!buttonRef.current || !isHovered) return;

    const { left, top } = buttonRef.current.getBoundingClientRect();

    // Calculate center of button
    const centerX = left + buttonDimensions.width / 2;
    const centerY = top + buttonDimensions.height / 2;

    // Calculate distance from mouse to center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Calculate magnetism (stronger when closer to center)
    const magnetismX = (distanceX / buttonDimensions.width) * strength;
    const magnetismY = (distanceY / buttonDimensions.height) * strength;

    setPosition({ x: magnetismX, y: magnetismY });
  };

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered, buttonDimensions]);

  return (
    <motion.button
      ref={buttonRef}
      className={className}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
