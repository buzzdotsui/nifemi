import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  baseRadius: number;
  alpha: number;
  color: string;
  isGlobe: boolean;
}

const COLORS = [
  'rgba(201,168,76,',   // gold
  'rgba(226,192,109,',  // gold light
  'rgba(160,122,48,',   // gold dark
  'rgba(255,255,255,',  // white
];

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ lastY: 0, speed: 0 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initial mouse positions in center
    mouseRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      targetX: window.innerWidth / 2,
      targetY: window.innerHeight / 2,
    };

    // Track mouse coordinate targets
    const onMouse = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener('mousemove', onMouse);

    // Initialize 3D particles
    const particles: Particle[] = [];
    
    // 1. Volumetric Sphere (Globe)
    // We will place it at the center/right of the viewport
    const globeParticleCount = Math.min(180, Math.floor(window.innerWidth / 8));
    const globeRadius = Math.min(320, window.innerWidth * 0.28);

    // Fibonacci lattice for uniform distribution on sphere
    for (let i = 0; i < globeParticleCount; i++) {
      const theta = Math.acos(1 - (2 * (i + 0.5)) / globeParticleCount);
      const phi = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = globeRadius * Math.sin(theta) * Math.cos(phi);
      const y = globeRadius * Math.sin(theta) * Math.sin(phi);
      const z = globeRadius * Math.cos(theta);

      particles.push({
        x,
        y,
        z,
        baseRadius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.4 + 0.25,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        isGlobe: true,
      });
    }

    // 2. Ambient background stars (drift in 3D)
    const ambientCount = 60;
    for (let i = 0; i < ambientCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * window.innerWidth * 1.5,
        y: (Math.random() - 0.5) * window.innerHeight * 1.5,
        z: (Math.random() - 0.5) * 1000,
        baseRadius: Math.random() * 1.2 + 0.4,
        alpha: Math.random() * 0.3 + 0.1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        isGlobe: false,
      });
    }

    particlesRef.current = particles;

    // 3D rotation angles
    let angleX = 0.0003;
    let angleY = 0.0005;
    
    // Rotation speeds
    let rotSpeedX = 0.0002;
    let rotSpeedY = 0.0004;

    const focalLength = 700;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2 + (window.innerWidth > 900 ? canvas.width * 0.18 : 0); // Offset to right for desktop layout
      const cy = canvas.height / 2;

      // Smooth mouse tracking
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Update scroll velocity
      const scroll = scrollRef.current;
      const currentScrollY = window.scrollY;
      scroll.speed += (currentScrollY - scroll.lastY - scroll.speed) * 0.1;
      scroll.lastY = currentScrollY;

      // Decay scroll speed back to 0
      scroll.speed *= 0.92;

      // Base rot speed + mouse movement influence + scroll influence
      const targetRotSpeedY = 0.0005 + (mouse.x - canvas.width / 2) * 0.000002 + Math.abs(scroll.speed) * 0.0003;
      const targetRotSpeedX = 0.0003 + (mouse.y - canvas.height / 2) * 0.000002;

      rotSpeedY += (targetRotSpeedY - rotSpeedY) * 0.05;
      rotSpeedX += (targetRotSpeedX - rotSpeedX) * 0.05;

      angleX += rotSpeedX;
      angleY += rotSpeedY;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Projects 3D to 2D
      const projected = particlesRef.current.map((p) => {
        let x = p.x;
        let y = p.y;
        let z = p.z;

        if (p.isGlobe) {
          // Rotate sphere particles
          // Y-axis rotation
          const x1 = x * cosY - z * sinY;
          const z1 = x * sinY + z * cosY;

          // X-axis rotation
          const y2 = y * cosX - z1 * sinX;
          const z2 = y * sinX + z1 * cosX;

          x = x1;
          y = y2;
          z = z2;
        } else {
          // Ambient slow movement
          z -= 0.5; // slowly move forward
          if (z < -focalLength) z = 500; // wrap z coordinate
          p.z = z;
        }

        // Project coordinate using perspective scale
        const scale = focalLength / (focalLength + z);
        
        // Offset coordinates relative to sphere center (or viewport center for stars)
        const px = (p.isGlobe ? cx : canvas.width / 2) + x * scale;
        const py = (p.isGlobe ? cy : canvas.height / 2) + y * scale;

        return {
          px,
          py,
          scale,
          z,
          p,
        };
      });

      // Depth Sort (draw back elements first, front elements last)
      projected.sort((a, b) => b.z - a.z);

      // Draw Connections for Sphere nodes (only in 3D depth range)
      const globeNodes = projected.filter((item) => item.p.isGlobe);
      for (let i = 0; i < globeNodes.length; i++) {
        const nodeA = globeNodes[i];
        
        // Limit connections to speed up draw call
        let connections = 0;
        for (let j = i + 1; j < globeNodes.length; j++) {
          if (connections > 4) break; // limit connections per particle to keep performance
          
          const nodeB = globeNodes[j];
          
          // Compute 3D distance between nodes
          const dx = nodeA.p.x - nodeB.p.x;
          const dy = nodeA.p.y - nodeB.p.y;
          const dz = nodeA.p.z - nodeB.p.z;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3D < globeRadius * 0.4) {
            const dx2D = nodeA.px - nodeB.px;
            const dy2D = nodeA.py - nodeB.py;
            const dist2D = Math.sqrt(dx2D * dx2D + dy2D * dy2D);

            if (dist2D < 140) {
              ctx.beginPath();
              ctx.moveTo(nodeA.px, nodeA.py);
              ctx.lineTo(nodeB.px, nodeB.py);
              
              // Fade out connections that are deep in the background
              const avgZ = (nodeA.z + nodeB.z) / 2;
              const zAlpha = Math.max(0.01, (globeRadius - avgZ) / (2 * globeRadius));
              const alpha = (1 - dist2D / 140) * 0.12 * zAlpha;

              ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
              ctx.lineWidth = 0.4 * Math.min(nodeA.scale, nodeB.scale);
              ctx.stroke();
              connections++;
            }
          }
        }
      }

      // Draw Projected Particles
      for (const item of projected) {
        const { px, py, scale, z, p } = item;

        // Skip drawing if outside viewport boundaries
        if (px < 0 || px > canvas.width || py < 0 || py > canvas.height) continue;

        // Visual properties based on depth
        const finalAlpha = p.alpha * scale;
        // z varies from -globeRadius (front) to +globeRadius (back)
        const frontRatio = p.isGlobe ? (globeRadius - z) / (2 * globeRadius) : scale;
        const finalRadius = p.baseRadius * scale * (p.isGlobe ? (0.5 + frontRatio) : 1);

        // Core dot
        ctx.beginPath();
        ctx.arc(px, py, finalRadius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.min(finalAlpha * 2.2, 0.95)})`;
        ctx.fill();

        // Subtle bloom/glow for front elements
        if (finalRadius > 1.2) {
          const gradient = ctx.createRadialGradient(px, py, 0, px, py, finalRadius * 3.5);
          gradient.addColorStop(0, `${p.color}${finalAlpha * 0.45})`);
          gradient.addColorStop(1, `${p.color}0)`);
          
          ctx.beginPath();
          ctx.arc(px, py, finalRadius * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.8,
      }}
    />
  );
}
