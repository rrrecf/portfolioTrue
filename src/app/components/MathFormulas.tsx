"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export default function MathFormulas() {
  const formulas = [
    "E = mc²",
    "∮ E·dℓ = -dΦB/dt",
    "∇ × E = -∂B/∂t",
    "∇ · E = ρ/ε₀",
    "∫∫∫ f(x,y,z)dV",
    "lim(x→∞) 1/x = 0",
    "d/dx[eˣ] = eˣ",
    "∑(n=1)^∞ 1/n²",
  ];

  const formulasWithPositions = useMemo(() => 
    formulas.map((formula, index) => ({
      formula,
      left: `${(index * 12) % 80 + 10}%`,
      top: `${(index * 15) % 70 + 10}%`,
      rotation: index * 45,
    })), 
  []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {formulasWithPositions.map(({ formula, left, top, rotation }, index) => (
        <motion.div
          key={index}
          className="absolute text-purple-500/30 dark:text-purple-300/30 text-2xl font-mono font-bold"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "linear"
          }}
          style={{
            left,
            top,
            transform: `rotate(${rotation}deg)`
          }}
        >
          {formula}
        </motion.div>
      ))}
    </div>
  );
} 