"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaCode, FaRocket } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import ParticlesBackground from "../components/ParticlesBackground";
import BinaryRain from "../components/BinaryRain";
import MathFormulas from "../components/MathFormulas";

const titleVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

interface SocialLinkProps {
  href: string;
  icon: React.ElementType;
}

export default function HeroSection() {
  const router = useRouter();
  const [text, setText] = useState("");
  const fullText = "Développeur Full Stack Passionné";
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Animation du texte avec effet machine à écrire amélioré
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(prev => {
          const nextChar = fullText[currentIndex - 1];
          return `${prev}${nextChar || ''}`;
        });
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black perspective-1000 px-4">
      <ParticlesBackground />
      <BinaryRain />
      <MathFormulas />
      
      {/* Effet de grille cyberpunk */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      {/* Cercles lumineux animés - ajustés pour mobile */}
      <motion.div 
        className="absolute w-[200px] md:w-[800px] h-[200px] md:h-[800px] rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="relative z-10 text-center space-y-6 md:space-y-8 max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="space-y-4"
        >
          {/* Titre principal responsive */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 cyberpunk-glitch">
              Briand
            </span>
            <br className="md:hidden" /> {/* Saut de ligne sur mobile */}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 cyberpunk-glitch">
              BATAILLON
            </span>
          </h1>
          
          {/* Sous-titre responsive */}
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 font-light px-4">
            {text}
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="ml-1 text-purple-500"
            >
              |
            </motion.span>
          </div>
        </motion.div>

        {/* Boutons d'action responsifs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 px-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/projects')}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg text-white font-medium flex items-center justify-center gap-2 hover:from-purple-700 hover:to-purple-900 transition-all text-sm sm:text-base"
          >
            <FaCode className="text-lg sm:text-xl" />
            Voir mes Projets
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/contact')}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 to-cyan-800 rounded-lg text-white font-medium flex items-center justify-center gap-2 hover:from-cyan-700 hover:to-cyan-900 transition-all text-sm sm:text-base"
          >
            <FaRocket className="text-lg sm:text-xl" />
            Me Contacter
          </motion.button>
        </div>

        {/* Réseaux sociaux responsifs */}
        <motion.div 
          className="flex justify-center gap-4 sm:gap-6 mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <SocialLink href="https://github.com/rrrecf" icon={FaGithub} />
          <SocialLink href="https://www.linkedin.com/in/briand-bataillon-0bb921277" icon={FaLinkedin} />
        </motion.div>

        {/* Indicateur de défilement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-purple-500 rounded-full p-1"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-purple-500 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}

// Composant pour les liens sociaux
function SocialLink({ href, icon: Icon }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2, rotate: 360 }}
      whileTap={{ scale: 0.9 }}
      className="text-gray-400 hover:text-purple-500 transition-colors"
    >
      <Icon size={30} />
    </motion.a>
  );
}
