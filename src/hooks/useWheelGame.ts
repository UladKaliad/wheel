import { useState, useCallback, useRef } from 'react';
import { Participant } from '../types';
import { calculateSelectedParticipant, generateWheelSpinRotation, easeOutCubic } from '../utils/wheelCalculator';

export const useWheelGame = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [spinDuration, setSpinDuration] = useState(5);
  const animationRef = useRef<number | null>(null);

  const spin = useCallback((
    participants: Participant[],
    onParticipantSelected: (participant: Participant) => void
  ) => {
    if (participants.length === 0 || isSpinning) return;

    console.log('Starting spin with participants:', participants.map(p => p.name));

    setIsSpinning(true);
    setSelectedParticipant(null);

    const startTime = Date.now();
    const startRotation = rotation;
    const spinAmount = generateWheelSpinRotation();
    const finalRotation = startRotation + spinAmount;

    console.log('Spin details:', {
      startRotation,
      spinAmount,
      finalRotation: finalRotation % 360
    });

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (spinDuration * 1000), 1);
      const easeProgress = easeOutCubic(progress);
      const currentRotation = startRotation + spinAmount * easeProgress;

      setRotation(currentRotation);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Используем централизованную логику для определения победителя
        const selected = calculateSelectedParticipant(participants, finalRotation);
        if (selected) {
          console.log('Final selection:', selected.name);
          setSelectedParticipant(selected);
          // Уведомляем о выбранном участнике
          onParticipantSelected(selected);
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
    setSelectedParticipant(null);
  }, []);

  return {
    isSpinning,
    rotation,
    selectedParticipant,
    spinDuration,
    setSpinDuration,
    spin,
    reset
  };
};