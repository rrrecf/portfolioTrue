"use client";

import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSound } from '../hooks/useSound';
import { FaGraduationCap, FaCode, FaGoogle, FaBrain } from 'react-icons/fa';
import React from 'react';

interface JournalEntry {
  year: string;
  title: string;
  content: string;
  image?: string;
  skills: string[];
  icon: React.ReactNode;
  color: string;
}

const journalData: JournalEntry[] = [
  {
    year: "2022",
    title: "Baccalauréat Scientifique",
    content: "Obtention du Baccalauréat série C au Lycée Saint Bernard de Bangui. Cette formation scientifique m'a permis d'acquérir une solide base en mathématiques et en logique, des compétences essentielles pour le développement informatique.",
    image: "/images/image1.jpg",
    skills: ["Mathématiques", "Physique", "Sciences", "Logique"],
    icon: <FaGraduationCap className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-400"
  },
  {
    year: "2022-2024",
    title: "DTS en Développement Informatique",
    content: "Formation approfondie en développement informatique à l'IFIAG de Casablanca. Acquisition de compétences techniques en programmation et en conception d'applications. Réalisation de projets pratiques et travail en équipe.",
    image: "/images/if.jpg",
    skills: ["Java", "Web", "Bases de données", "Algorithmes", "UML"],
    icon: <FaCode className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500"
  },
  {
    year: "2023",
    title: "Certification Google",
    content: "Obtention du Certificat en Marketing Numérique de Google Atelier Numérique. Cette formation m'a permis de comprendre les enjeux du marketing digital et d'acquérir des compétences en SEO et analytics.",
    image: "/images/google.png",
    skills: ["Marketing Digital", "SEO", "Analytics", "Publicité en ligne"],
    icon: <FaGoogle className="w-8 h-8" />,
    color: "from-green-500 to-emerald-400"
  },
  {
    year: "2024",
    title: "Licence en Génie Logiciel",
    content: "Poursuite d'études en Licence Génie Logiciel à Hestim de Casablanca. Approfondissement des connaissances en architecture logicielle, méthodologies agiles et développement avancé.",
    image: "/images/hestim.jpg",
    skills: ["Architecture Logicielle", "Agile", "DevOps", "Clean Code", "Design Patterns"],
    icon: <FaBrain className="w-8 h-8" />,
    color: "from-orange-500 to-yellow-400"
  }
];

export default function InteractiveJournal() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const controls = useAnimation();
  const { playSound } = useSound();

  const flipPage = async (direction: 'next' | 'prev') => {
    if (isFlipping) return;
    setIsFlipping(true);
    playSound('click');

    await controls.start({
      rotateY: direction === 'next' ? -180 : 180,
      transition: { duration: 0.5 }
    });

    setCurrentPage(prev => 
      direction === 'next' 
        ? Math.min(prev + 1, journalData.length - 1)
        : Math.max(prev - 1, 0)
    );

    await controls.start({
      rotateY: 0,
      transition: { duration: 0 }
    });

    setIsFlipping(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative">
        {/* Timeline indicator */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-500/20 to-transparent">
          {journalData.map((_, index) => (
            <motion.div
              key={index}
              className={`absolute w-4 h-4 -left-1.5 rounded-full ${
                index === currentPage ? 'bg-purple-500' : 'bg-purple-300'
              }`}
              style={{ top: `${(index * 100) / (journalData.length - 1)}%` }}
              whileHover={{ scale: 1.2 }}
              onClick={() => setCurrentPage(index)}
            />
          ))}
        </div>

        <motion.div 
          className="relative ml-8"
          animate={controls}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className={`h-2 bg-gradient-to-r ${journalData[currentPage].color}`} />
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className={`p-3 rounded-xl bg-gradient-to-br ${journalData[currentPage].color} text-white`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {journalData[currentPage].icon}
                      </motion.div>
                      <div>
                        <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-900 to-purple-600 bg-clip-text text-transparent">
                          {journalData[currentPage].year}
                        </h3>
                        <h4 className="text-xl font-semibold text-purple-700 dark:text-purple-400">
                          {journalData[currentPage].title}
                        </h4>
      </div>
    </div>

                    <motion.p 
                      className="text-gray-700 dark:text-gray-300 leading-relaxed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {journalData[currentPage].content}
                    </motion.p>

                    <div className="flex flex-wrap gap-2">
                      {journalData[currentPage].skills.map((skill, index) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${journalData[currentPage].color} text-white shadow-lg hover:shadow-xl transition-all cursor-pointer`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {journalData[currentPage].image && (
                    <motion.div 
                      className="relative group h-[300px] md:h-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${journalData[currentPage].color} rounded-xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300`} />
                      <img
                        src={journalData[currentPage].image}
                        alt={journalData[currentPage].title}
                        className="rounded-xl shadow-xl object-cover w-full h-full relative transform -rotate-2 group-hover:rotate-0 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    </motion.div>
                  )}
                </div>
            </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 px-8">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => flipPage('prev')}
            disabled={currentPage === 0}
            className={`px-6 py-3 rounded-full text-white font-medium flex items-center space-x-2 disabled:opacity-50 bg-gradient-to-r ${journalData[currentPage].color}`}
          >
            ← Précédent
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => flipPage('next')}
            disabled={currentPage === journalData.length - 1}
            className={`px-6 py-3 rounded-full text-white font-medium flex items-center space-x-2 disabled:opacity-50 bg-gradient-to-r ${journalData[currentPage].color}`}
          >
            Suivant →
          </motion.button>
        </div>
      </div>
    </div>
  );
} 