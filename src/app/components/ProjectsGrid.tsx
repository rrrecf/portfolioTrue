"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
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
    github: "https://github.com/rrrecf/school-management"
  },
  {
    id: 3,
    title: "AgroTech",
    description: "Plateforme web d'optimisation de la gestion agricole. Suivi des cultures, analyses prédictives et recommandations personnalisées.",
    tools: ["React", "Node.js", "MongoDB"],
    images: ["/images/agriculture.png"],
    techIcons: [],
    period: "2024"
  },
  {
    id: 4,
    title: "Site Vitrine Construction",
    description: "Site vitrine moderne pour une entreprise de matériaux de construction. Design responsive et optimisé pour le SEO.",
    tools: ["Next.js", "TailwindCSS", "Framer Motion"],
    images: ["/images/projet1.png"],
    techIcons: ["next"],
    period: "2023",
    link: "https://construction-materiaux.com"
  },
  {
    id: 5,
    title: "Gestion des Accidents",
    description: "Application desktop robuste pour la gestion et le suivi des accidents, développée avec C# .NET et SQL Server.",
    tools: ["C#", ".NET", "SQL Server", "WPF"],
    images: ["/images/image007.png"],
    techIcons: ["csharp"],
    period: "2024",
    github: "https://github.com/rrrecf/accident-manager"
  },
  {
    id: 6,
    title: "AI Chat Assistant",
    description: "Application web moderne utilisant l'API Gemini de Google pour un assistant conversationnel intelligent. Intégration de données météorologiques en temps réel.",
    tools: ["Next.js", "Firebase", "Google AI", "OpenWeather API"],
    images: ["/images/screenchat.png"],
    techIcons: ["next", "firebase"],
    period: "2024",
    github: "https://github.com/rrrecf/ai-chat-assistant"
  }
];

const projectVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

export default function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          custom={index}
          variants={projectVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ y: -10, scale: 1.02 }}
          className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl cursor-pointer border border-white/10 hover:border-purple-500/50 transition-colors duration-300"
          onClick={() => setSelectedProject(project)}
        >
          <div className="relative h-48 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <motion.img
              src={project.images[0]}
              alt={project.title}
              className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                {project.title}
              </h3>
              <div className="flex gap-2">
                {project.techIcons.map((iconName, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="text-gray-400 group-hover:text-purple-400 transition-colors"
                  >
                    {getTechIcon(iconName)}
                  </motion.span>
                ))}
              </div>
            </div>

            <p className="text-gray-400 mb-4 line-clamp-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tools.map((tool, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="px-3 py-1 text-sm bg-purple-500/10 text-purple-300 rounded-full hover:bg-purple-500/20 transition-colors"
                >
                  {tool}
                </motion.span>
              ))}
            </div>

            {project.period && (
              <p className="text-sm text-gray-500">
                {project.period}
              </p>
            )}
          </div>
        </motion.div>
      ))}

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
} 