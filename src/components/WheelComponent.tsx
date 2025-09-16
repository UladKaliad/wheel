import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Participant } from '../types';

interface WheelComponentProps {
  participants: Participant[];
  rotation: number;
  isSpinning: boolean;
  winner: Participant | null;
}

const WheelComponent: React.FC<WheelComponentProps> = ({
  participants,
  rotation,
  isSpinning,
  winner
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const radius = 180;
  const centerX = 200;
  const centerY = 200;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Очистка canvas
    ctx.clearRect(0, 0, 400, 400);

    if (participants.length === 0) {
      // Рисуем пустое колесо
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#F3F4F6';
      ctx.fill();
      ctx.strokeStyle = '#D1D5DB';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#6B7280';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Добавьте', centerX, centerY - 8);
      ctx.fillText('участников', centerX, centerY + 12);
      return;
    }

    const segmentAngle = (2 * Math.PI) / participants.length;

    // Рисуем сегменты
    participants.forEach((participant, index) => {
      const startAngle = rotation + index * segmentAngle - Math.PI / 2;
      const endAngle = rotation + (index + 1) * segmentAngle - Math.PI / 2;

      // Рисуем сегмент
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      // Подсвечиваем победителя
      if (winner && winner.id === participant.id) {
        ctx.fillStyle = participant.color;
        ctx.fill();
        ctx.strokeStyle = '#FCD34D';
        ctx.lineWidth = 5;
        ctx.stroke();

        // Дополнительное свечение
        ctx.shadowColor = '#FCD34D';
        ctx.shadowBlur = 20;
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else {
        ctx.fillStyle = participant.color;
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Рисуем текст
      const textAngle = startAngle + segmentAngle / 2;
      const textRadius = radius * 0.7;
      const textX = centerX + Math.cos(textAngle) * textRadius;
      const textY = centerY + Math.sin(textAngle) * textRadius;

      ctx.save();
      ctx.translate(textX, textY);
      ctx.rotate(textAngle + Math.PI / 2);

      // Определяем контрастный цвет для текста
      const rgb = participant.color.match(/\w\w/g);
      if (rgb) {
        const [r, g, b] = rgb.map(x => parseInt(x, 16));
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        ctx.fillStyle = brightness > 128 ? '#000000' : '#FFFFFF';
      } else {
        ctx.fillStyle = '#FFFFFF';
      }

      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';

      // Обрезаем длинные имена
      let displayName = participant.name;
      if (displayName.length > 10) {
        displayName = displayName.substring(0, 8) + '...';
      }

      ctx.fillText(displayName, 0, 0);
      ctx.restore();
    });

    // Рисуем центральный круг
    ctx.beginPath();
    ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI);
    ctx.fillStyle = '#374151';
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Рисуем указатель
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 15);
    ctx.lineTo(centerX - 15, centerY - radius - 35);
    ctx.lineTo(centerX + 15, centerY - radius - 35);
    ctx.closePath();
    ctx.fillStyle = '#EF4444';
    ctx.fill();
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Добавляем тень указателю
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetY = 2;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

  }, [participants, rotation, winner]);

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`relative ${isSpinning ? 'animate-pulse' : ''}`}>
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="drop-shadow-2xl rounded-full"
        />
        {isSpinning && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-purple-500 border-opacity-50"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default WheelComponent;
