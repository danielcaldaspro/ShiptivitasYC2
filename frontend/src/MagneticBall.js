import React, { useRef, useEffect } from 'react';
import './MagneticBall.css';

const MagneticBall = () => {
  const ballRef = useRef(null);
  
  const physics = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    vx: 0,
    vy: 0,
    mouseX: 0,
    mouseY: 0
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      physics.current.mouseX = e.clientX;
      physics.current.mouseY = e.clientY;
    };

    const update = () => {
      const p = physics.current;
      if (!ballRef.current) return;

      const dx = p.x - p.mouseX;
      const dy = p.y - p.mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const magnetRadius = 300;
      const pushStrength = 1.2;

      if (distance < magnetRadius && distance > 0) {
        const force = (1 - distance / magnetRadius) * pushStrength;
        p.vx += (dx / distance) * force;
        p.vy += (dy / distance) * force;
      }

      p.vx *= 0.97;
      p.vy *= 0.97;

      p.x += p.vx;
      p.y += p.vy;

      const margin = 40;
      if (p.x < margin) { p.x = margin; p.vx *= -0.6; }
      if (p.x > window.innerWidth - margin) { p.x = window.innerWidth - margin; p.vx *= -0.6; }
      if (p.y < margin) { p.y = margin; p.vy *= -0.6; }
      if (p.y > window.innerHeight - margin) { p.y = window.innerHeight - margin; p.vy *= -0.6; }

      ballRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;

      requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animationId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="Magnetic-Ball-System global" ref={ballRef}>
      <div className="Magnetic-Field layer-3"></div>
      <div className="Magnetic-Field layer-2"></div>
      <div className="Magnetic-Field layer-1"></div>
      <div className="Magnetic-Core">YC</div>
    </div>
  );
};

export default MagneticBall;
