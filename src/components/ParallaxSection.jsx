import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ParallaxSection = ({
  children,
  bgImage,
  speed = 0.3,
  className = '',
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `${speed * 100}%`]
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `${-speed * 50}%`]
  );

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      {bgImage && (
        <motion.div
          className='absolute inset-0 w-full h-full z-0'
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: backgroundY,
          }}
        />
      )}
      <motion.div className='relative z-10' style={{ y: contentY }}>
        {children}
      </motion.div>
    </section>
  );
};

export default ParallaxSection;
