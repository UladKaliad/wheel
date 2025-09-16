
import { useState, useCallback, useEffect, useRef } from 'react';
import { Participant } from '../types';
import { generateUniqueColors } from '../utils/colors';

// Функции для работы с куки
const setCookie = (name: string, value: string, days: number = 30) => {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    return cookieValue ? decodeURIComponent(cookieValue) : null;
  }
  return null;
};

export interface WinnerScore {
  name: string;
  score: number;
  color: string;
}

export const useParticipants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [originalParticipants, setOriginalParticipants] = useState<Participant[]>([]);
  const [winnerScores, setWinnerScores] = useState<WinnerScore[]>([]);
  const [participantsInput, setParticipantsInput] = useState('');

  // Ref для предотвращения двойного добавления победителя
  const gameInProgressRef = useRef<boolean>(false);

  // Загружаем все данные из куки при инициализации
  useEffect(() => {
    const savedInput = getCookie('participantsInput');
    if (savedInput) {
      setParticipantsInput(savedInput);
    }

    const savedScores = getCookie('winnerScores');
    if (savedScores) {
      try {
        const scores = JSON.parse(savedScores);
        setWinnerScores(scores);
      } catch (e) {
        console.error('Error parsing saved scores:', e);
      }
    }

    const savedParticipants = getCookie('participants');
    if (savedParticipants) {
      try {
        const participants = JSON.parse(savedParticipants);
        setParticipants(participants);
      } catch (e) {
        console.error('Error parsing saved participants:', e);
      }
    }

    const savedOriginalParticipants = getCookie('originalParticipants');
    if (savedOriginalParticipants) {
      try {
        const originalParticipants = JSON.parse(savedOriginalParticipants);
        setOriginalParticipants(originalParticipants);
      } catch (e) {
        console.error('Error parsing saved original participants:', e);
      }
    }

    const savedGameInProgress = getCookie('gameInProgress');
    if (savedGameInProgress) {
      gameInProgressRef.current = savedGameInProgress === 'true';
    }
  }, []);

  // Сохраняем состояние в куки при изменении
  useEffect(() => {
    if (participants.length > 0) {
      setCookie('participants', JSON.stringify(participants));
    }
  }, [participants]);

  useEffect(() => {
    if (originalParticipants.length > 0) {
      setCookie('originalParticipants', JSON.stringify(originalParticipants));
    }
  }, [originalParticipants]);

  useEffect(() => {
    setCookie('winnerScores', JSON.stringify(winnerScores));
  }, [winnerScores]);

  const getActiveParticipants = useCallback(() => {
    return participants.filter(p => !p.eliminated);
  }, [participants]);

  const addParticipants = useCallback((inputText: string) => {
    if (!inputText.trim()) return;

    // Сохраняем введенный текст в куки
    setCookie('participantsInput', inputText);
    setParticipantsInput(inputText);

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

    // Сбрасываем флаг игры при добавлении новых участников
    gameInProgressRef.current = false;
    setCookie('gameInProgress', 'false');
  }, []);

  const eliminateParticipant = useCallback((participantId: number) => {
    setParticipants(prev => {
      const updated = prev.map(p =>
        p.id === participantId ? { ...p, eliminated: true } : p
      );

      // Проверяем, остался ли только один активный участник
      const activeParticipants = updated.filter(p => !p.eliminated);

      // ИСПРАВЛЕНИЕ: Добавляем победителя когда исключили последнего участника (остался 0)
      // А не когда остался 1 участник
      if (activeParticipants.length === 0 && !gameInProgressRef.current) {
        // Находим последнего исключенного участника - он и есть победитель
        const justEliminated = prev.find(p => p.id === participantId);
        if (justEliminated) {
          // Устанавливаем флаг, что игра завершена
          gameInProgressRef.current = true;
          setCookie('gameInProgress', 'true');

          console.log('Final winner detected:', justEliminated.name);

          // Добавляем победителя в статистику
          setWinnerScores(prevScores => {
            const existingWinner = prevScores.find(score => score.name === justEliminated.name);

            if (existingWinner) {
              console.log(`Updating existing winner ${justEliminated.name}: ${existingWinner.score} -> ${existingWinner.score + 1}`);
              return prevScores.map(score =>
                score.name === justEliminated.name
                  ? { ...score, score: score.score + 1 }
                  : score
              );
            } else {
              console.log(`Adding new winner ${justEliminated.name} with score 1`);
              return [...prevScores, {
                name: justEliminated.name,
                score: 1,
                color: justEliminated.color
              }];
            }
          });
        }
      }

      return updated;
    });
  }, []);

  const resetParticipants = useCallback(() => {
    setParticipants(prev =>
      originalParticipants.map(original => ({
        ...original,
        eliminated: false
      }))
    );

    // Сбрасываем флаг игры при сбросе участников
    gameInProgressRef.current = false;
    setCookie('gameInProgress', 'false');
  }, [originalParticipants]);

  // НОВАЯ ФУНКЦИЯ: Очищает участников, но СОХРАНЯЕТ введенный текст
  const clearParticipantsOnly = useCallback(() => {
    setParticipants([]);
    setOriginalParticipants([]);
    gameInProgressRef.current = false;

    // Очищаем только куки участников, НО СОХРАНЯЕМ participantsInput
    setCookie('participants', JSON.stringify([]));
    setCookie('originalParticipants', JSON.stringify([]));
    setCookie('gameInProgress', 'false');
    // participantsInput НЕ очищаем!
  }, []);

  // СУЩЕСТВУЮЩАЯ ФУНКЦИЯ: Полная очистка всего (для других случаев)
  const clearParticipants = useCallback(() => {
    setParticipants([]);
    setOriginalParticipants([]);
    setParticipantsInput('');
    gameInProgressRef.current = false;

    // Очищаем все куки, включая введенный текст
    setCookie('participants', JSON.stringify([]));
    setCookie('originalParticipants', JSON.stringify([]));
    setCookie('participantsInput', '');
    setCookie('gameInProgress', 'false');
  }, []);

  const getFinalWinner = useCallback(() => {
    const activeParticipants = getActiveParticipants();
    // ИСПРАВЛЕНИЕ: Показываем финального победителя только когда никого не осталось
    // И игра была завершена
    if (activeParticipants.length === 0 && gameInProgressRef.current) {
      // Находим последнего исключенного
      const sortedByElimination = [...participants].reverse();
      return sortedByElimination.find(p => p.eliminated) || null;
    }
    return null;
  }, [participants, getActiveParticipants]);

  const getWinnersWithScores = useCallback(() => {
    // Возвращаем только тех, кто имеет счет > 0, отсортированных по убыванию
    return winnerScores
      .filter(winner => winner.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [winnerScores]);

  const clearAllScores = useCallback(() => {
    setWinnerScores([]);
    setCookie('winnerScores', JSON.stringify([]));
  }, []);

  return {
    participants,
    originalParticipants,
    winnerScores,
    participantsInput,
    addParticipants,
    eliminateParticipant,
    resetParticipants,
    clearParticipants,        // Полная очистка (с текстом)
    clearParticipantsOnly,    // НОВАЯ: Очистка только участников (текст сохраняется)
    getActiveParticipants,
    getFinalWinner,
    getWinnersWithScores,
    clearAllScores
  };
};