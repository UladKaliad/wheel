
import { Participant } from '../types';

/**
 * Вычисляет какой участник находится под стрелкой (вверху колеса)
 * @param participants - активные участники
 * @param rotation - текущий поворот колеса в градусах
 * @returns выбранный участник
 */
export const calculateSelectedParticipant = (
  participants: Participant[],
  rotation: number
): Participant | null => {
  if (participants.length === 0) return null;

  const numberOfParticipants = participants.length;
  const sectorSize = 360 / numberOfParticipants;

  // Нормализуем поворот колеса
  const normalizedRotation = ((rotation % 360) + 360) % 360;

  // Стрелка находится вверху (270° в SVG системе координат)
  // Первый участник (индекс 0) начинается справа (0° в SVG)
  // При повороте колеса на R градусов, участник который был на позиции A
  // теперь находится на позиции (A + R) % 360

  // Находим какой участник сейчас находится под стрелкой (270°)
  // Инвертируем поворот, так как колесо крутится, а стрелка стоит
  const positionUnderArrow = (270 - normalizedRotation + 360) % 360;

  // Определяем индекс участника
  // В SVG участники идут по часовой стрелке, начиная с 0°
  let participantIndex = Math.floor(positionUnderArrow / sectorSize);

  // Убеждаемся, что индекс в допустимых пределах
  participantIndex = participantIndex % numberOfParticipants;

  console.log('🎯 Wheel calculation:', {
    rotation: normalizedRotation.toFixed(1),
    positionUnderArrow: positionUnderArrow.toFixed(1),
    sectorSize: sectorSize.toFixed(1),
    calculatedIndex: participantIndex,
    totalParticipants: numberOfParticipants,
    selectedParticipant: participants[participantIndex]?.name,
    participantsList: participants.map((p, i) => `${i}: ${p.name}`)
  });

  return participants[participantIndex];
};

/**
 * Генерирует случайный поворот для колеса
 */
export const generateWheelSpinRotation = (): number => {
  // Минимум 3 полных оборота + случайный угол
  const baseRotations = 3 * 360;
  const randomRotation = Math.random() * 360;
  return baseRotations + randomRotation;
};

/**
 * Функция плавного замедления (easing)
 */
export const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};