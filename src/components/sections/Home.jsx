import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from '@react-spring/web';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import Typed from 'typed.js';
import { Code, Server, Layout, Github, Linkedin, Mail } from 'lucide-react';

const ParticlesBackground = () => {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <Particles
      id='tsparticles'
      init={particlesInit}
      options={{
        background: {
          color: {
            value: 'transparent',
          },
        },
        particles: {
          number: {
            value: 50,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: '#3B82F6',
          },
          links: {
            enable: true,
            color: '#3B82F6',
            opacity: 0.2,
          },
          move: {
            enable: true,
            speed: 1,
          },
          size: {
            value: 2,
          },
          opacity: {
            value: 0.3,
          },
        },
      }}
    />
  );
};

export const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const typedRef = useRef(null);
  const el = useRef(null);

  const titleControls = useAnimation();
  const profileSpring = useSpring({
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    config: { tension: 300, friction: 10 },
  });

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        'Full Stack Developer',
        'React.js Expert',
        'UI/UX Enthusiast',
        'MERN Stack Developer',
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
    });

    typedRef.current = typed;

    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    if (inView) {
      titleControls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: 'easeOut' },
      });
    }
  }, [inView, titleControls]);

  const technologies = [
    { name: 'React.js', icon: <Code className='w-5 h-5' /> },
    { name: 'Node.js', icon: <Server className='w-5 h-5' /> },
    { name: 'UI/UX', icon: <Layout className='w-5 h-5' /> },
  ];

  return (
    <section className='min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-900 to-black'>
      <ParticlesBackground />

      <div className='container mx-auto px-4 py-20 relative z-10'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={titleControls}
          className='text-center space-y-8'
        >
          {/* Profile Image */}
          <animated.div
            style={profileSpring}
            className='relative w-32 h-32 mx-auto'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src='/src/assets/icon.jpg'
              alt='My Icon'
              className='rounded-full object-cover w-full h-full'
            />
            <div className='absolute inset-0 rounded-full border-2 border-blue-500/50 animate-pulse' />
          </animated.div>

          {/* Animated Title */}
          <motion.h1
            className='text-5xl md:text-7xl font-bold'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className='bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent'>
              Hi, I'm Jerico Daag
            </span>
          </motion.h1>

          {/* Typed.js Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='h-12 text-xl md:text-2xl text-gray-300'
          >
            <span ref={el}></span>
          </motion.div>

          {/* Description */}
          <motion.p
            className='text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Full-stack developer specializing in MERN stack with a passion for
            creating intuitive user interfaces. Currently pursuing BS
            Information Technology with consistent academic excellence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className='flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.a
              href='#projects'
              className='group bg-blue-500 text-white py-3 px-8 rounded-lg font-medium relative overflow-hidden'
              whileHover={{ y: -5, boxShadow: '0 0 25px rgba(59,130,246,0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className='relative z-10'>View Projects</span>
              <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </motion.a>

            <motion.a
              href='#contact'
              className='border border-blue-500/50 text-blue-500 py-3 px-8 rounded-lg font-medium'
              whileHover={{
                y: -5,
                boxShadow: '0 0 15px rgba(59,130,246,0.3)',
                backgroundColor: 'rgba(59,130,246,0.1)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className='flex justify-center space-x-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            {[
              { href: 'https://github.com/jericodaag', icon: <Github /> },
              {
                href: 'https://www.linkedin.com/in/jerico-daag/',
                icon: <Linkedin />,
              },
              { href: 'mailto:daageco@gmail.com', icon: <Mail /> },
            ].map((social, index) => (
              <motion.a
                key={social.href}
                href={social.href}
                className='text-gray-400 hover:text-blue-500 transition-colors duration-300'
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
