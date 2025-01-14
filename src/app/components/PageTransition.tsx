"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useSound } from "../hooks/useSound";
import { useState, useEffect } from "react";
import CursorParticles from "./CursorParticles";
import DistortionEffect from "./DistortionEffect";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { playSound } = useSound();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      playSound('transition');
    }
  }, [isTransitioning, playSound]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onAnimationStart={() => setIsTransitioning(true)}
        onAnimationComplete={() => setIsTransitioning(false)}
      >
        <CursorParticles />
        <DistortionEffect />
        
        {isTransitioning && <div className="page-transition-overlay" />}
        
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 