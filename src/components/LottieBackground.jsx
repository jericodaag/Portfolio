import React from 'react';
import Lottie from 'lottie-react';

export const LottieBackground = ({ animationData, className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Lottie
        animationData={animationData}
        className='w-full h-full'
        loop={true}
        autoplay={true}
      />
    </div>
  );
};

export default LottieBackground;
