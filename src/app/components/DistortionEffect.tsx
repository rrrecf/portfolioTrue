"use client";

import { useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function DistortionEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      mouseX.set((clientX / innerWidth) * 2 - 1);
      mouseY.set((clientY / innerHeight) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef}
      className="distortion-container"
      style={{
        filter: `url('#distortionFilter')`,
      }}
    >
      <svg className="hidden">
        <filter id="distortionFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.01 0.003" 
            numOctaves="5" 
            seed="2" 
            stitchTiles="stitch"
          />
          <feDisplacementMap 
            in="SourceGraphic" 
            scale="30"
          />
        </filter>
      </svg>
    </div>
  );
} 