"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import InteractiveJournal from '../components/InteractiveJournal';
import { useRef, useMemo } from 'react';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  const gridY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const gridScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Générer les valeurs aléatoires de manière stable
  const gridItems = useMemo(() => 
    Array.from({ length: 100 }, () => ({
      rotation: Math.floor(Math.random() * 360),
      opacity: 0.5 + Math.random() * 0.5
    })),
  []);

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black relative py-20 overflow-hidden"
    >
      <motion.div 
        style={{ y: gridY, scale: gridScale }}
        className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(50px,1fr))] opacity-10"
      >
        {gridItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ 
              opacity: item.opacity,
              rotate: item.rotation,
            }}
            transition={{ 
              duration: 1,
              delay: i * 0.01,
              ease: "easeOut"
            }}
            className="aspect-square border border-purple-500/20"
          />
        ))}
      </motion.div>

      <motion.div
        style={{ opacity, scale, y }}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 10
          }}
          className="relative text-4xl md:text-6xl font-bold text-center"
        >
          <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Mon Parcours
          </span>
          <motion.span
            className="absolute inset-0 text-purple-500/10 blur-sm"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Mon Parcours
          </motion.span>
        </motion.h2>

        <div className="flex justify-center">
          <InteractiveJournal />
        </div>
      </motion.div>
    </section>
  );
}
