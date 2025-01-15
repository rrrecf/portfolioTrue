"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { FaHome, FaUser, FaCode, FaEnvelope, FaBrain } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { HiMoon, HiSun } from 'react-icons/hi';

const menuItems = [
  { path: '/', label: 'Accueil', icon: FaHome },
  { path: '/about', label: 'À propos', icon: FaUser },
  { path: '/skills', label: 'Compétences', icon: FaBrain },
  { path: '/projects', label: 'Projets', icon: FaCode },
  { path: '/contact', label: 'Contact', icon: FaEnvelope }
];

interface NavItemProps {
  path: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  router: any;
}

interface MobileNavItemProps {
  path: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'py-2 bg-black/80 backdrop-blur-lg' : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/')}
            className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500"
          >
            <span className="text-purple-500">&lt;</span>
            BB
            <span className="text-cyan-500">/&gt;</span>
          </motion.button>

          {/* Navigation desktop avec thème switcher */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <NavItem 
                key={item.path}
                {...item}
                isActive={pathname === item.path}
                router={router}
              />
            ))}

            {/* Thème switcher */}
            <motion.div className="relative ml-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'dark' ? (
                      <HiMoon className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <HiSun className="w-5 h-5 text-yellow-500" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>

          {/* Menu mobile */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Thème switcher mobile */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full bg-white/5"
            >
              {theme === 'dark' ? (
                <HiMoon className="w-5 h-5 text-yellow-500" />
              ) : (
                <HiSun className="w-5 h-5 text-yellow-500" />
              )}
            </motion.button>

            {/* Bouton menu hamburger */}
            <motion.button
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-white block"
                />
                <motion.span
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 bg-white block"
                />
                <motion.span
                  animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-white block"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="fixed top-[60px] left-0 right-0 w-full md:hidden bg-black/90 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 py-2 space-y-1">
              {menuItems.map((item) => (
                <MobileNavItem
                  key={item.path}
                  {...item}
                  isActive={pathname === item.path}
                  onClick={() => {
                    router.push(item.path);
                    setIsMenuOpen(false);
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavItem({ path, label, icon: Icon, isActive, router }: NavItemProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => router.push(path)}
      className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all text-sm ${
        isActive 
          ? 'bg-purple-500/20 text-purple-400' 
          : 'text-gray-400 hover:text-purple-400'
      }`}
    >
      <Icon className="text-lg" />
      <span>{label}</span>
    </motion.button>
  );
}

function MobileNavItem({ path, label, icon: Icon, isActive, onClick }: MobileNavItemProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 ${
        isActive 
          ? 'bg-purple-500/20 text-purple-400' 
          : 'text-gray-400 hover:text-purple-400'
      }`}
    >
      <Icon className="text-xl" />
      <span>{label}</span>
    </motion.button>
  );
}
