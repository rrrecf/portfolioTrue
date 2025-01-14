"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaCode, FaRocket } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import ParticlesBackground from "../components/ParticlesBackground";
import BinaryRain from "../components/BinaryRain";
import MathFormulas from "../components/MathFormulas";

export default function HeroSection() {
  const router = useRouter();
  const [text, setText] = useState("");
  const fullText = "Développeur Full Stack Passionné";
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <BinaryRain />
      <MathFormulas />

      <div className="relative z-10 text-center px-4">
        <motion.div
          style={{ y, opacity }}
          className="space-y-6"
        >
          {/* Titre principal avec effet de dégradé moderne */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-purple-300 to-gray-100 dark:from-gray-100 dark:via-purple-200 dark:to-gray-100">
              Briand BATAILLON
            </span>
          </motion.h1>

          {/* Sous-titre avec effet machine à écrire */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl font-light"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-cyan-200 to-purple-200 font-medium">
              {text}
            </span>
          </motion.div>

          {/* Description avec effet de flou */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="max-w-2xl mx-auto text-base md:text-lg text-gray-300/90 leading-relaxed font-light"
          >
            Passionné par la création d'expériences numériques innovantes
            et le développement de solutions technologiques créatives.
          </motion.p>

          {/* Boutons d'action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/projects')}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
            >
              <FaCode />
              <span>Voir mes projets</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/contact')}
              className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium flex items-center gap-2 hover:bg-white/20 transition-all border border-white/20"
            >
              <FaRocket />
              <span>Me contacter</span>
            </motion.button>
          </motion.div>

          {/* Liens sociaux */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex justify-center gap-6 mt-8"
          >
            <SocialLink href="https://github.com/rrrecf" icon={FaGithub} />
            <SocialLink href="https://linkedin.com/in/briand-bataillon" icon={FaLinkedin} />
          </motion.div>
        </motion.div>

        {/* Indicateur de défilement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-purple-400/50 rounded-full p-1"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-purple-400/50 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}

// Composant pour les liens sociaux
function SocialLink({ href, icon: Icon }: { href: string; icon: React.ElementType }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2, rotate: 360 }}
      whileTap={{ scale: 0.9 }}
      className="text-gray-400 hover:text-purple-400 transition-colors"
    >
      <Icon size={30} />
    </motion.a>
  );
}
