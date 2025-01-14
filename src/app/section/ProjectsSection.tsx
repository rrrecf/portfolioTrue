"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import ProjectsGrid from '../components/ProjectsGrid';
import { useRef, useState, useEffect } from 'react';
import { FaCode, FaRocket, FaLightbulb } from 'react-icons/fa';

interface Particle {
  left: string;
  top: string;
  duration: number;
  delay: number;
}

function useParticles(count: number) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }).map(() => ({
      left: `${Math.floor(Math.random() * 100)}%`,
      top: `${Math.floor(Math.random() * 100)}%`,
      duration: 3 + Math.floor(Math.random() * 2),
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, [count]);

  return particles;
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  const particles = useParticles(20);

  const features = [
    {
      icon: FaCode,
      title: "Code Propre",
      description: "Architecture solide et maintenable"
    },
    {
      icon: FaRocket,
      title: "Performance",
      description: "Applications rapides et optimisées"
    },
    {
      icon: FaLightbulb,
      title: "Innovation",
      description: "Solutions créatives et modernes"
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen py-20 bg-gradient-to-b from-black via-purple-900/10 to-black overflow-hidden"
    >
      {/* Effet de grille en arrière-plan */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Cercles décoratifs animés */}
      <motion.div 
        className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        style={{ opacity }}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.div 
          style={{ y }}
          className="text-center mb-16 space-y-6"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold relative inline-block"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Mes Projets
            </span>
            <motion.span
              className="absolute inset-0 blur-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.h2>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
              >
                <feature.icon className="text-3xl text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-300 max-w-3xl mx-auto text-lg"
          >
            Découvrez une sélection de mes projets les plus significatifs,
            démontrant mes compétences en développement et ma capacité à créer
            des solutions innovantes.
          </motion.p>
        </motion.div>

        {/* Conteneur des projets avec effet de parallaxe */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
        >
          <ProjectsGrid />
        </motion.div>
      </motion.div>

      {/* Particules flottantes */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/20 rounded-full"
            animate={{
              y: [0, -30, 0],
              x: [0, 10, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
            style={{
              left: particle.left,
              top: particle.top,
            }}
          />
        ))}
      </div>
    </section>
  );
}
