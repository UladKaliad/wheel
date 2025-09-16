import { useState, useCallback } from 'react';
import { Participant } from '../types';
import { generateUniqueColors } from '../utils/colors';

export const useParticipants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [originalParticipants, setOriginalParticipants] = useState<Participant[]>([]);
  const [eliminationMode, setEliminationMode] = useState(false);
  const [winners, setWinners] = useState<Participant[]>([]);

  const addParticipants = useCallback((inputText: string) => {
    if (!inputText.trim()) return;

    const names = inputText
      .split(/[,\n]/)
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (names.length === 0) return;

    const colors = generateUniqueColors(names.length);
    const newParticipants: Participant[] = names.map((name, index) => ({
      id: Date.now() + index,
      name,
      color: colors[index],
      eliminated: false
    }));

    setParticipants(newParticipants);
    setOriginalParticipants(newParticipants);
    setWinners([]);
  }, []);

  const eliminateParticipant = useCallback((participantId: number) => {
    setParticipants(prev =>
      prev.map(p =>
        p.id === participantId ? { ...p, eliminated: true } : p
      )
    );
  }, []);

  const resetParticipants = useCallback(() => {
    setParticipants(prev =>
      originalParticipants.map(original => ({
        ...original,
        eliminated: false
      }))
    );
    setWinners([]);
  }, [originalParticipants]);

  const clearAll = useCallback(() => {
    setParticipants([]);
    setOriginalParticipants([]);
    setWinners([]);
  }, []);

  const addWinner = useCallback((winner: Participant) => {
    setWinners(prev => [...prev, winner]);
  }, []);

  const getActiveParticipants = useCallback(() => {
    return participants.filter(p => !p.eliminated);
  }, [participants]);

  return {
    participants,
    originalParticipants,
    eliminationMode,
    winners,
    setEliminationMode,
    addParticipants,
    eliminateParticipant,
    resetParticipants,
    clearAll,
    addWinner,
    getActiveParticipants
  };
};
