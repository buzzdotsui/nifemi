import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function TiltCard({ children, className = '', style = {} }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  // Normalize mouse coordinates to [0, 1]
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 30, stiffness: 220, mass: 0.5 };
  const rxSpring = useSpring(x, springConfig);
  const rySpring = useSpring(y, springConfig);

  // Map normalized mouse position to rotation degrees
  // e.g. moving mouse right (x -> 1) rotates around Y axis positively, moving up (y -> 0) rotates around X axis positively
  const rotateX = useTransform(rySpring, [0, 1], [12, -12]);
  const rotateY = useTransform(rxSpring, [0, 1], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Position of the mouse relative to the card's top-left corner
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Set normalized coordinates
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    x.set(0.5);
    y.set(0.5);
  };

  // Connect glare position to the mouse springs
  const glareX = useTransform(rxSpring, [0, 1], ['0%', '100%']);
  const glareY = useTransform(rySpring, [0, 1], ['0%', '100%']);

  return (
    <motion.div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: rotateX,
        rotateY: rotateY,
        position: 'relative',
        ...style,
      }}
    >
      {/* Glare/Shine Effect */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255, 255, 255, 0.08) 0%, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 10,
          borderRadius: 'inherit',
          opacity: hovering ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />
      <div style={{ transform: 'translateZ(10px)', height: '100%', width: '100%', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </motion.div>
  );
}
