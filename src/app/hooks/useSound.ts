import { useCallback } from 'react';

type SoundEffect = 'hover' | 'click' | 'transition';

const sounds = {
  hover: '/sounds/hover.wav',
  click: '/sounds/click.wav',
  transition: '/sounds/transition.wav',
};

export function useSound() {
  const playSound = useCallback((effect: SoundEffect) => {
    const audio = new Audio(sounds[effect]);
    audio.volume = 0.2; // Volume subtil
    audio.play().catch(() => {
      // Gestion des erreurs de lecture
    });
  }, []);

  return { playSound };
} 