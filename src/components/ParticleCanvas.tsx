import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  alpha: number;
  color: string;
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
  const mouseRef = useRef({ x: 0, y: 0 });
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

    // Mouse move
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouse);

    // Create particles
    const count = Math.min(120, Math.floor(window.innerWidth / 12));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 1000,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      vz: (Math.random() - 0.5) * 2,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const focalLength = 800;

    const project = (p: Particle) => {
      const scale = focalLength / (focalLength + p.z);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      return {
        px: cx + (p.x - cx) * scale,
        py: cy + (p.y - cy) * scale,
        scale,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const particles = particlesRef.current;

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const pa = project(a);
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const pb = project(b);
          const dx = pa.px - pb.px;
          const dy = pa.py - pb.py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(pa.px, pa.py);
            ctx.lineTo(pb.px, pb.py);
            const alpha = (1 - dist / 100) * 0.12;
            ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Update & draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        if (p.z < 0) p.z = 1000;
        if (p.z > 1000) p.z = 0;

        // Mouse repulsion
        const { px, py, scale } = project(p);
        const mdx = px - mx;
        const mdy = py - my;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 120) {
          const force = (120 - mdist) / 120;
          p.vx += (mdx / mdist) * force * 0.08;
          p.vy += (mdy / mdist) * force * 0.08;
        }

        // Dampen velocity
        p.vx *= 0.99;
        p.vy *= 0.99;

        const finalAlpha = p.alpha * scale;
        const finalRadius = p.radius * scale;

        // Glow
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, finalRadius * 4);
        gradient.addColorStop(0, `${p.color}${finalAlpha})`);
        gradient.addColorStop(1, `${p.color}0)`);

        ctx.beginPath();
        ctx.arc(px, py, finalRadius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, finalRadius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.min(finalAlpha * 2, 1)})`;
        ctx.fill();
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
        opacity: 0.7,
      }}
    />
  );
}
