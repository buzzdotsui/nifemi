import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticProps {
  children: React.ReactElement;
}

export default function Magnetic({ children }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion values for translate X and Y
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Set up spring animation for elastic pull
  const springConfig = { damping: 18, stiffness: 160, mass: 0.12 };
  const tx = useSpring(x, springConfig);
  const ty = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Center point of the element
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;
    
    // Distance from center to mouse
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // If cursor is within activation radius, attract element
    // Threshold set to 150px
    if (distance < 150) {
      // Scale down movement (e.g. max 35-40% of the distance) to keep it subtle
      x.set(dx * 0.35);
      y.set(dy * 0.35);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: tx,
        y: ty,
        display: 'inline-block',
      }}
    >
      {children}
    </motion.div>
  );
}
