import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const SectionTransition = ({
  children,
  id,
  className = '',
  transitionColor = '#000',
  transitionHeight = '100px',
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Transform for the top wave
  const topWavePathD = useTransform(
    scrollYProgress,
    [0, 0.5],
    [
      `M0 0 L100 0 L100 100 Q50 50 0 100 L0 0 Z`,
      `M0 0 L100 0 L100 0 Q50 0 0 0 L0 0 Z`,
    ]
  );

  // Transform for the bottom wave
  const bottomWavePathD = useTransform(
    scrollYProgress,
    [0.5, 1],
    [
      `M0 100 L100 100 L100 0 Q50 50 0 0 L0 100 Z`,
      `M0 100 L100 100 L100 100 Q50 100 0 100 L0 100 Z`,
    ]
  );

  return (
    <section id={id} ref={ref} className={`relative ${className}`}>
      {/* Top wave transition */}
      <div
        className='absolute top-0 left-0 right-0 overflow-hidden'
        style={{ height: transitionHeight, zIndex: 5 }}
      >
        <motion.svg
          width='100%'
          height={transitionHeight}
          viewBox='0 0 100 100'
          preserveAspectRatio='none'
        >
          <motion.path d={topWavePathD} fill={transitionColor} />
        </motion.svg>
      </div>

      {/* Main content */}
      <div className='relative z-1'>{children}</div>

      {/* Bottom wave transition */}
      <div
        className='absolute bottom-0 left-0 right-0 overflow-hidden'
        style={{ height: transitionHeight, zIndex: 5 }}
      >
        <motion.svg
          width='100%'
          height={transitionHeight}
          viewBox='0 0 100 100'
          preserveAspectRatio='none'
        >
          <motion.path d={bottomWavePathD} fill={transitionColor} />
        </motion.svg>
      </div>
    </section>
  );
};

export default SectionTransition;
