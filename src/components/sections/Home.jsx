import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from '@react-spring/web';
import { Code, Server, Layout, Github, Linkedin, Mail } from 'lucide-react';
import Typed from 'typed.js';

// Custom cursor component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  const springProps = useSpring({
    transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0)`,
    scale: clicked ? 0.8 : 1,
    opacity: hidden ? 0 : 0.4,
    config: { tension: 400, friction: 28 }
  });

  return (
    <animated.div
      className="fixed w-8 h-8 bg-blue-500 rounded-full pointer-events-none z-50 mix-blend-plus-lighter"
      style={{
        ...springProps,
        mixBlendMode: 'exclusion'
      }}
    />
  );
};

// Simplified background animation component
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
    </div>
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
    { name: 'React.js', icon: <Code className="w-5 h-5" /> },
    { name: 'Node.js', icon: <Server className="w-5 h-5" /> },
    { name: 'UI/UX', icon: <Layout className="w-5 h-5" /> },
  ];

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      <CustomCursor />
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 py-20 mt-20 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={titleControls}
          className="text-center space-y-8"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <animated.div
              style={profileSpring}
              className="relative w-32 h-32 mx-auto"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src="/src/assets/icon.jpg"
                alt="My Icon"
                className="rounded-full object-cover w-full h-full"
              />
              <div className="absolute inset-0 rounded-full border-2 border-blue-500/50 animate-pulse" />
            </animated.div>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Hi, I'm Jerico Daag
            </span>
          </motion.h1>

          {/* Typed.js Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-12 text-xl md:text-2xl text-gray-300"
          >
            <span ref={el}></span>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed"
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
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.a
              href="#projects"
              className="group bg-blue-500 text-white py-3 px-8 rounded-lg font-medium relative overflow-hidden"
              whileHover={{ y: -5, boxShadow: '0 0 25px rgba(59,130,246,0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>

            <motion.a
              href="#contact"
              className="border border-blue-500/50 text-blue-500 py-3 px-8 rounded-lg font-medium"
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
            className="flex justify-center space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            {[ 
              { href: 'https://github.com/jericodaag', icon: <Github /> },
              { href: 'https://www.linkedin.com/in/jerico-daag/', icon: <Linkedin /> },
              { href: 'mailto:daageco@gmail.com', icon: <Mail /> },
            ].map((social) => (
              <motion.a
                key={social.href}
                href={social.href}
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Technologies Section */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <h3 className="text-xl text-gray-300 mb-4">My Tech Stack</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="flex items-center gap-2 bg-blue-500/10 text-blue-400 py-2 px-4 rounded-full"
                  whileHover={{
                    backgroundColor: 'rgba(59,130,246,0.2)',
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.4 + index * 0.1 }}
                >
                  {tech.icon}
                  <span>{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
