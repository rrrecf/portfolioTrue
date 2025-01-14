"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  // Gestion de la visibilité du bouton "Retour en haut"
  const toggleVisibility = useCallback(() => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [toggleVisibility]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-black to-purple-900/20">
      {/* Effet de grille en arrière-plan */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Cercles décoratifs */}
      <motion.div 
        className="absolute -top-20 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div 
        className="absolute -top-20 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo et Description */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold"
            >
              <span className="text-purple-500">&lt;</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                BB
              </span>
              <span className="text-cyan-500">/&gt;</span>
            </motion.div>
            <p className="text-gray-400">
              Développeur Full Stack passionné par la création d'expériences web innovantes et performantes.
            </p>
          </div>

          {/* Liens Rapides avec navigation */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Liens Rapides</h3>
            <ul className="space-y-2">
              {[
                { label: 'Accueil', path: '/' },
                { label: 'À propos', path: '/about' },
                { label: 'Compétences', path: '/skills' },
                { label: 'Projets', path: '/projects' },
                { label: 'Contact', path: '/contact' }
              ].map((item) => (
                <motion.li 
                  key={item.label}
                  whileHover={{ x: 5 }}
                  onClick={() => router.push(item.path)}
                  className="text-gray-400 hover:text-purple-400 cursor-pointer transition-colors"
                >
                  {item.label}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Contact</h3>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/rrrecf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <FaGithub size={24} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/briand-bataillon-0bb921277"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <FaLinkedin size={24} />
              </motion.a>
              <motion.a
                href="mailto:evelinbrid@gmail.com"
                whileHover={{ y: -5, scale: 1.1 }}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <FaEnvelope size={24} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent my-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© {currentYear} Briand BATAILLON. Tous droits réservés.</p>
          <p className="mt-2 md:mt-0">
            Fait avec ❤️ et Next.js
          </p>
        </div>
      </div>

      {/* Bouton "Retour en haut" */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
