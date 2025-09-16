import { Participant } from '../types';

export const calculateWinner = (
  participants: Participant[],
  finalRotation: number
): Participant | null => {
  if (participants.length === 0) return null;

  const segmentAngle = (2 * Math.PI) / participants.length;
  const normalizedRotation = (finalRotation % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
  const pointerAngle = Math.PI / 2;
  const adjustedAngle = (pointerAngle - normalizedRotation + 2 * Math.PI) % (2 * Math.PI);
  const winnerIndex = Math.floor(adjustedAngle / segmentAngle);

  return participants[winnerIndex] || null;
};

export const generateSpinRotation = (): number => {
  const fullRotations = Math.random() * 10 + 10;
  const randomAngle = Math.random() * 2 * Math.PI;
  return fullRotations * 2 * Math.PI + randomAngle;
};

export const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};
