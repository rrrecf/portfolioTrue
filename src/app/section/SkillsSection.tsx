"use client";

import { motion } from 'framer-motion';
import { SiSharp, SiJavascript, SiPython, SiDart, SiPhp, SiReact, SiNextdotjs, SiFlutter, SiDotnet, SiFirebase, SiGit, SiGithub, SiElectron, SiNodedotjs, SiVuedotjs, SiMysql } from 'react-icons/si';
import { useState, useEffect } from 'react';

const skillCategories = [
  {
    title: "Langages",
    description: "Maîtrise des langages de programmation modernes",
    skills: [
      { name: "C#", icon: SiSharp, color: "hover:text-[#178600]", level: 90 },
      { name: "JavaScript", icon: SiJavascript, color: "hover:text-[#F7DF1E]", level: 85 },
      { name: "Python", icon: SiPython, color: "hover:text-[#3776AB]", level: 80 },
      { name: "Dart", icon: SiDart, color: "hover:text-[#0175C2]", level: 75 },
      { name: "PHP", icon: SiPhp, color: "hover:text-[#777BB4]", level: 70 },
    ]
  },
  {
    title: "Frameworks & Outils",
    description: "Expertise dans les frameworks et outils modernes",
    skills: [
      { name: "React.js", icon: SiReact, color: "hover:text-[#61DAFB]", level: 95 },
      { name: "Next.js", icon: SiNextdotjs, color: "hover:text-white", level: 90 },
      { name: "Flutter", icon: SiFlutter, color: "hover:text-[#02569B]", level: 85 },
      { name: ".NET", icon: SiDotnet, color: "hover:text-[#512BD4]", level: 85 },
      { name: "Firebase", icon: SiFirebase, color: "hover:text-[#FFCA28]", level: 80 },
      { name: "Git", icon: SiGit, color: "hover:text-[#F05032]", level: 90 },
      { name: "GitHub", icon: SiGithub, color: "hover:text-white", level: 90 },
      { name: "Electron", icon: SiElectron, color: "hover:text-[#47848F]", level: 85 },
      { name: "Node.js", icon: SiNodedotjs, color: "hover:text-[#339933]", level: 85 },
      { name: "Vue.js", icon: SiVuedotjs, color: "hover:text-[#4FC08D]", level: 80 },
    ]
  },
  {
    title: "Bases de Données",
    description: "Gestion efficace des données",
    skills: [
      { name: "MySQL", icon: SiMysql, color: "hover:text-[#4479A1]", level: 85 },
      { name: "SQL", icon: SiMysql, color: "hover:text-[#4479A1]", level: 85 },
    ]
  }
];

export default function SkillsSection() {
  const [activeSkills, setActiveSkills] = useState<string[]>([]);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    // Animation séquentielle des compétences
    skillCategories.forEach((category, categoryIndex) => {
      category.skills.forEach((skill, skillIndex) => {
        setTimeout(() => {
          setActiveSkills(prev => [...prev, skill.name]);
        }, (categoryIndex * 500) + (skillIndex * 200));
      });
    });
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-purple-900/10 to-black py-20 relative overflow-hidden">
      {/* Tronc de l'arbre */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "70%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute left-1/2 -translate-x-1/2 w-4 bg-gradient-to-b from-purple-600 to-purple-900 rounded-full"
        style={{ top: "20%", zIndex: 1 }}
      />

      {/* Titre */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Compétences
          </span>
        </h2>
      </motion.div>

      {/* Conteneur des compétences */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {skillCategories.map((category, categoryIndex) => (
          <div key={category.title} className="mb-20">
            <motion.h3
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: categoryIndex * 0.3 }}
              className="text-2xl font-bold text-purple-400 mb-8 text-center"
            >
              {category.title}
            </motion.h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ 
                    y: -1000,
                    rotate: Math.random() * 360,
                    opacity: 0 
                  }}
                  animate={activeSkills.includes(skill.name) ? {
                    y: 0,
                    rotate: 0,
                    opacity: 1
                  } : {}}
                  transition={{
                    type: "spring",
                    damping: 12,
                    stiffness: 100,
                    duration: 0.5,
                  }}
                  whileHover={{ scale: 1.1, y: -10 }}
                  onHoverStart={() => setHoveredSkill(skill.name)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  className="relative group"
                >
                  {/* Ligne de connexion à l'arbre */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: (categoryIndex * 0.5) + (skillIndex * 0.2) }}
                    className="absolute top-1/2 left-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-transparent origin-left"
                    style={{ zIndex: 0 }}
                  />

                  {/* Carte de compétence */}
                  <motion.div
                    className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center gap-4 border border-white/10 hover:border-purple-500/50 transition-all duration-300
                      ${hoveredSkill === skill.name ? 'shadow-lg shadow-purple-500/20' : ''}`}
                    style={{ zIndex: 2 }}
                  >
                    <skill.icon 
                      className={`text-4xl text-gray-400 transition-colors duration-300 ${skill.color}`} 
                    />
                    <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                      {skill.name}
                    </span>

                    {/* Barre de progression */}
                    <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: hoveredSkill === skill.name ? `${skill.level}%` : "0%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                      />
                    </div>

                    {/* Pourcentage */}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredSkill === skill.name ? 1 : 0 }}
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm text-purple-400"
                    >
                      {skill.level}%
                    </motion.span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Particules flottantes */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/20 rounded-full"
            animate={{
              y: [0, -1000],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: "100%",
            }}
          />
        ))}
      </div>
    </section>
  );
} 