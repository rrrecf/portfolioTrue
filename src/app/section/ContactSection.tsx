"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaPaperPlane } from 'react-icons/fa';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import confetti from 'canvas-confetti';

const contactInfo = [
  {
    icon: FaEnvelope,
    label: "Email",
    value: "evelinbrid@gmail.com",
    link: "mailto:evelinbrid@gmail.com",
    color: "hover:text-purple-500",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: FaPhone,
    label: "Téléphone",
    value: "+212764235945",
    link: "tel:+212764235945",
    color: "hover:text-cyan-500",
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: "github.com/thisisbriandb",
    link: "https://github.com/rrrecf",
    color: "hover:text-gray-400",
    gradient: "from-gray-600 to-gray-400"
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "Briand Bataillon",
    link: "https://www.linkedin.com/in/briand-bataillon-0bb921277",
    color: "hover:text-blue-500",
    gradient: "from-blue-500 to-cyan-500"
  }
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  return (
    <section className="min-h-screen relative bg-gradient-to-b from-black via-purple-900/10 to-black py-20 overflow-hidden">
      {/* Cercles décoratifs animés */}
      <motion.div 
        className="absolute top-20 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [180, 0, 180],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Contactez-moi
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            N'hésitez pas à me contacter pour discuter de vos projets
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Cartes de contact */}
          <div className="grid gap-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className={`group relative bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 
                  transition-all duration-300 ${hoveredCard === index ? 'transform -translate-y-1' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${info.gradient}`}>
                    <info.icon className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-300 font-medium mb-1">{info.label}</h3>
                    <p className={`text-gray-400 ${info.color} transition-colors`}>
                      {info.value}
                    </p>
                  </div>
                </div>
                
                {/* Particules au survol */}
                {hoveredCard === index && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -inset-px bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl blur-sm"
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Formulaire de contact */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6 bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10"
          >
            <div>
              <label className="block text-gray-300 mb-2" htmlFor="name">
                Nom
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2" htmlFor="email">
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2" htmlFor="message">
                Message
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg flex items-center justify-center gap-2 text-white font-medium
                ${isSubmitting ? 'bg-gray-500' : 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700'}
                transition-all duration-300 disabled:cursor-not-allowed`}
            >
              <FaPaperPlane className={`${isSubmitting ? 'animate-ping' : 'animate-none'}`} />
              {isSubmitting ? 'Envoi...' : 'Envoyer'}
            </motion.button>

            {/* Message de statut amélioré */}
            <AnimatePresence mode="wait">
              {submitStatus !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`fixed bottom-8 right-8 p-4 rounded-lg shadow-lg flex items-center gap-3
                    ${submitStatus === 'success' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                    }`}
                >
                  {submitStatus === 'success' ? (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <motion.path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                        </svg>
                      </motion.div>
                      <span className="font-medium">Message envoyé avec succès !</span>
                    </>
                  ) : (
                    <>
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </motion.div>
                      <span className="font-medium">Une erreur est survenue. Veuillez réessayer.</span>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
