import React, { useEffect, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';

export const NoiseBackground = ({
  color1 = '#0f172a',
  color2 = '#3B82F6',
  speed = 0.003,
  intensity = 30,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const noise3D = createNoise3D();

    let animationFrameId;
    let time = 0;

    // Function to handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial setup
    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation function
    const animate = () => {
      time += speed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create noise pattern
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let x = 0; x < canvas.width; x += intensity) {
        for (let y = 0; y < canvas.height; y += intensity) {
          const noiseValue =
            noise3D(x / (canvas.width / 4), y / (canvas.height / 4), time) *
              0.5 +
            0.5;

          const sizeX = Math.ceil(intensity * noiseValue);
          const sizeY = Math.ceil(intensity * noiseValue);

          // Draw a semi-transparent rectangle
          ctx.fillStyle = `rgba(255, 255, 255, ${noiseValue * 0.15})`;
          ctx.fillRect(x, y, sizeX, sizeY);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color1, color2, speed, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className='fixed inset-0 z-0'
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default NoiseBackground;
