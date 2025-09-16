import { useState, useCallback, useRef } from 'react';
import { Participant } from '../types';
import { calculateWinner, generateSpinRotation, easeOutCubic } from '../utils/wheel';

export const useWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<Participant | null>(null);
  const [spinDuration, setSpinDuration] = useState(5);
  const animationRef = useRef<number | null>(null);

  const spin = useCallback((
    participants: Participant[],
    onWin: (winner: Participant) => void
  ) => {
    if (participants.length === 0 || isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    const startTime = Date.now();
    const startRotation = rotation;
    const spinAmount = generateSpinRotation();
    const finalRotation = startRotation + spinAmount;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (spinDuration * 1000), 1);
      const easeProgress = easeOutCubic(progress);
      const currentRotation = startRotation + spinAmount * easeProgress;
      
      setRotation(currentRotation);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        const selectedWinner = calculateWinner(participants, finalRotation);
        if (selectedWinner) {
          setWinner(selectedWinner);
          onWin(selectedWinner);
        }
        setIsSpinning(false);
      }
    };

    animate();
  }, [isSpinning, rotation, spinDuration]);

  const reset = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsSpinning(false);
    setRotation(0);
    setWinner(null);
  }, []);

  return {
    isSpinning,
    rotation,
    winner,
    spinDuration,
    setSpinDuration,
    spin,
    reset
  };
};