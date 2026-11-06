import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angleSpeed: number;
  opacity: number;
  type: 'petal' | 'heart' | 'sparkle';
  color: string;
}

export const RosePetalsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(16, 185, 129, 0.55)', // Vibrant Emerald Green
      'rgba(52, 211, 153, 0.50)', // Soft Mint Emerald
      'rgba(5, 150, 105, 0.55)', // Deep Emerald Green
      'rgba(225, 29, 72, 0.45)', // Rose red
      'rgba(244, 63, 94, 0.40)', // Soft crimson
      'rgba(245, 158, 11, 0.40)', // Warm gold
    ];

    const particleCount = window.innerWidth < 768 ? 24 : 45;
    const particles: Particle[] = [];

    const createParticle = (): Particle => {
      const typeRand = Math.random();
      const type: 'petal' | 'heart' | 'sparkle' =
        typeRand < 0.55 ? 'petal' : typeRand < 0.85 ? 'heart' : 'sparkle';

      return {
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: type === 'heart' ? 12 + Math.random() * 10 : 8 + Math.random() * 12,
        speedY: 0.6 + Math.random() * 1.4,
        speedX: (Math.random() - 0.5) * 0.8,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.03,
        opacity: 0.3 + Math.random() * 0.5,
        type,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    for (let i = 0; i < particleCount; i++) {
      const p = createParticle();
      p.y = Math.random() * height; // Distribute across initial screen
      particles.push(p);
    }

    const drawPetal = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      angle: number,
      color: string,
      opacity: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.globalAlpha = opacity;
      context.fillStyle = color;

      context.beginPath();
      context.moveTo(0, 0);
      context.bezierCurveTo(size / 2, -size / 2, size, -size / 4, size, size / 2);
      context.bezierCurveTo(size / 2, size, -size / 4, size / 2, 0, 0);
      context.fill();

      context.restore();
    };

    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      angle: number,
      color: string,
      opacity: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(angle * 0.4);
      context.globalAlpha = opacity;
      context.fillStyle = color;

      const scale = size / 20;
      context.beginPath();
      context.moveTo(0, 0);
      context.bezierCurveTo(-5 * scale, -10 * scale, -15 * scale, -5 * scale, -15 * scale, 5 * scale);
      context.bezierCurveTo(-15 * scale, 15 * scale, 0, 20 * scale, 0, 25 * scale);
      context.bezierCurveTo(0, 20 * scale, 15 * scale, 15 * scale, 15 * scale, 5 * scale);
      context.bezierCurveTo(15 * scale, -5 * scale, 5 * scale, -10 * scale, 0, 0);
      context.fill();

      context.restore();
    };

    const drawSparkle = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number
    ) => {
      context.save();
      context.translate(x, y);
      context.globalAlpha = opacity;
      context.fillStyle = color;

      context.beginPath();
      context.arc(0, 0, size * 0.25, 0, Math.PI * 2);
      context.fill();

      context.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.angle) * 0.8 + p.speedX;
        p.angle += p.angleSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        if (p.type === 'petal') {
          drawPetal(ctx, p.x, p.y, p.size, p.angle, p.color, p.opacity);
        } else if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.angle, p.color, p.opacity);
        } else {
          drawSparkle(ctx, p.x, p.y, p.size, p.color, p.opacity);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: 0.85 }}
    />
  );
};
