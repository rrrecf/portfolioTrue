"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaTimes, FaTools, FaCalendar } from 'react-icons/fa';
import Image from "next/image";
import { Project } from "./ProjectsGrid";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 100, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg rounded-2xl overflow-hidden"
        >
          {/* Barre de progression en haut */}
          <motion.div 
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1 }}
          />

          <div className="relative">
            {/* Image de couverture avec overlay */}
            <div className="relative h-64 md:h-96">
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
              
              {/* Titre flottant sur l'image */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute bottom-0 left-0 right-0 p-8"
              >
                <h2 className="text-4xl font-bold text-white mb-2">
                  {project.title}
                </h2>
                <p className="text-gray-300 text-lg">
                  {project.description}
                </p>
              </motion.div>
            </div>

            {/* Contenu détaillé */}
            <div className="p-8 space-y-8">
              {/* Technologies */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-3"
              >
                <div className="flex items-center gap-2 text-purple-400 mb-2 w-full">
                  <FaTools />
                  <span className="font-semibold">Technologies</span>
                </div>
                {project.tools.map((tool, index) => (
                  <motion.span
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="px-4 py-2 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:border-purple-500/50 transition-colors"
                  >
                    {tool}
                  </motion.span>
                ))}
              </motion.div>

              {/* Période */}
              {project.period && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-2 text-cyan-400"
                >
                  <FaCalendar />
                  <span>{project.period}</span>
                </motion.div>
              )}

              {/* Actions */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                {project.github && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg text-white hover:from-purple-700 hover:to-purple-900 transition-all"
                  >
                    <FaGithub size={20} />
                    <span>Voir sur GitHub</span>
                  </motion.a>
                )}
                {project.link && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-800 rounded-lg text-white hover:from-cyan-700 hover:to-cyan-900 transition-all"
                  >
                    <FaExternalLinkAlt size={16} />
                    <span>Voir le projet</span>
                  </motion.a>
                )}
              </motion.div>
            </div>

            {/* Bouton de fermeture */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <FaTimes size={20} />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 