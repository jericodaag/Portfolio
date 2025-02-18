import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

export const EnhancedRevealOnScroll = ({
  children,
  direction = 'up',
  delay = 0.2,
  duration = 0.6,
  staggerChildren = 0.1,
  threshold = 0.1,
  className = '',
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, threshold });
  const controls = useAnimation();

  // Determine animation based on direction
  const getAnimationVariants = () => {
    const distance = 50;

    switch (direction) {
      case 'up':
        return {
          hidden: { y: distance, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case 'down':
        return {
          hidden: { y: -distance, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case 'left':
        return {
          hidden: { x: -distance, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case 'right':
        return {
          hidden: { x: distance, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case 'scale':
        return {
          hidden: { scale: 0.8, opacity: 0 },
          visible: { scale: 1, opacity: 1 },
        };
      case 'rotate':
        return {
          hidden: { rotate: -5, opacity: 0 },
          visible: { rotate: 0, opacity: 1 },
        };
      default:
        return {
          hidden: { y: distance, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
          },
        },
      }}
      initial='hidden'
      animate={controls}
      className={className}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div
          variants={getAnimationVariants()}
          transition={{
            duration,
            delay: delay + i * staggerChildren,
            ease: [0.25, 0.1, 0.25, 1.0], // Custom easing
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default EnhancedRevealOnScroll;
