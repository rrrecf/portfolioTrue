"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { SiElectron, SiVuedotjs, SiNextdotjs, SiFirebase, SiSharp } from 'react-icons/si';
import ProjectModal from './ProjectModal';

export interface Project {
  id: number;
  title: string;
  description: string;
  tools: string[];
  images: string[];
  techIcons: string[];
  period?: string;
  github?: string;
  link?: string;
}

const getTechIcon = (iconName: string) => {
  const icons: { [key: string]: any } = {
    electron: SiElectron,
    vue: SiVuedotjs,
    next: SiNextdotjs,
    firebase: SiFirebase,
    csharp: SiSharp,
  };
  const Icon = icons[iconName];
  return Icon ? <Icon className="text-xl" /> : null;
};

const projects: Project[] = [
  {
    id: 1,
    title: "KayaPay",
    description: "Application mobile de paiement électronique intégrant Orange Money. Une solution innovante pour faciliter les transactions financières mobiles.",
    tools: ["React Native", "Node.js", "Orange Money API"],
    images: ["/images/projet3.webp"],
    techIcons: [],
    period: "2024"
  },
  {
    id: 2,
    title: "Application de Gestion d'École",
    description: "Co-fondation d'une application multiplateforme (win,mac,linux) permettant la gestion complète des établissements scolaires. Interface intuitive et fonctionnalités avancées.",
    tools: ["Electron", "Vue.js", "Node.js", "SQLite"],
    images: ["/images/projet2.png"],
    techIcons: ["electron", "vue"],
    period: "2023-2024",
    github: "https://github.com/thisisbriandb/school-management"
  },
  {
    id: 3,
    title: "AgroTech",
    description: "Plateforme web d'optimisation de la gestion agricole. Suivi des cultures, analyses prédictives et recommandations personnalisées.",
    tools: ["React", "Node.js", "MongoDB"],
    images: ["/images/agriculture.png"],
    techIcons: [],
    period: "2024",
    github: "https://github.com/thisisbriandb/school-management"
  },
  {
    id: 4,
    title: "Site Vitrine Construction",
    description: "Site vitrine moderne pour une entreprise de matériaux de construction. Design responsive et optimisé pour le SEO.",
    tools: ["Next.js", "TailwindCSS", "Framer Motion"],
    images: ["/images/projet1.png"],
    techIcons: ["next"],
    period: "2023",
    link: "https://www.jackindustries.ma/",
    github:"https://github.com/thisisbriandb/Jack-Industries"
  },
  {
    id: 5,
    title: "Gestion des Accidents",
    description: "Application desktop robuste pour la gestion et le suivi des accidents, développée avec C# .NET et SQL Server.",
    tools: ["C#", ".NET", "SQL Server", "WPF"],
    images: ["/images/image007.png"],
    techIcons: ["csharp"],
    period: "2024",
    github: "https://github.com/thisisbriandb/accident-manager"
  },
  {
    id: 6,
    title: "AI Chat Assistant",
    description: "Application web moderne utilisant l'API Gemini de Google pour un assistant conversationnel intelligent. Intégration de données météorologiques en temps réel.",
    tools: ["Next.js", "Firebase", "Google AI", "OpenWeather API"],
    images: ["/images/screenchat.png"],
    techIcons: ["next", "firebase"],
    period: "2024",
    github: "https://github.com/thisisbriandb/ai-chat-assistant"
  }
];

export default function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const projectVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          variants={projectVariants}
          onHoverStart={() => setHoveredProject(project.id)}
          onHoverEnd={() => setHoveredProject(null)}
          className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
          onClick={() => setSelectedProject(project)}
        >
          {/* Image de fond avec effet parallaxe */}
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: hoveredProject === project.id ? 1.1 : 1
            }}
            transition={{ duration: 0.4 }}
          >
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover"
              />
          </motion.div>

          {/* Overlay avec dégradé */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Contenu */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            {/* Tech Icons */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: hoveredProject === project.id ? 1 : 0,
                y: hoveredProject === project.id ? 0 : -20
              }}
              className="flex gap-3 mb-4"
            >
              {project.techIcons.map((iconName, idx) => (
                <motion.span
                  key={idx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white"
                >
                      {getTechIcon(iconName)}
                </motion.span>
              ))}
            </motion.div>

            {/* Titre et Description */}
            <motion.h3
              className="text-2xl font-bold text-white mb-2 transform origin-left"
              animate={{
                scale: hoveredProject === project.id ? 1.1 : 1
              }}
            >
              {project.title}
            </motion.h3>

            <motion.p
              className="text-gray-300 text-sm line-clamp-2 mb-4"
              animate={{
                opacity: hoveredProject === project.id ? 1 : 0.7
              }}
            >
                {project.description}
            </motion.p>

            {/* Boutons d'action */}
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: hoveredProject === project.id ? 1 : 0,
                y: hoveredProject === project.id ? 0 : 20
              }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-purple-500/20 backdrop-blur-sm text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 transition-colors flex items-center gap-2"
              >
                <FaArrowRight />
                <span>Voir détails</span>
              </motion.button>
            </motion.div>

            {/* Période */}
            <motion.div
              className="absolute top-6 right-6 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white"
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: hoveredProject === project.id ? 1 : 0,
                x: hoveredProject === project.id ? 0 : 20
              }}
            >
              {project.period}
            </motion.div>
            </div>
          </motion.div>
        ))}

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </motion.div>
  );
} 
