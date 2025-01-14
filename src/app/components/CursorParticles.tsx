"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CursorParticles() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      // Mise à jour des particules avec délai
      particlesRef.current.forEach((particle, index) => {
        setTimeout(() => {
          if (particle) {
            particle.style.transform = `translate(${e.clientX - index * 2}px, ${e.clientY - index * 2}px)`;
          }
        }, index * 50);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <motion.div
        ref={cursorRef}
        className="cursor-particle"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      />
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={(el) => { particlesRef.current[i] = el }}
          className="cursor-trail-particle"
          style={{
            '--index': i,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
} 