export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideUp = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -50, opacity: 0 },
};

export const binaryAnimation = {
  animate: {
    opacity: [0.1, 0.5, 0.1],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};

export const textTransition = {
  initial: { 
    opacity: 0,
    y: 20,
    filter: "blur(10px)"
  },
  animate: { 
    opacity: 1,
    y: 0,
    filter: "blur(0px)"
  },
  exit: { 
    opacity: 0,
    y: -20,
    filter: "blur(10px)"
  },
  transition: {
    duration: 0.8,
    ease: "easeOut"
  }
};
