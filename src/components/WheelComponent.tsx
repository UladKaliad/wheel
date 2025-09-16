import React from 'react';
import { motion } from 'framer-motion';
import { Participant } from '../types';

interface WheelComponentProps {
  participants: Participant[];
  rotation: number;
  isSpinning: boolean;
  selectedParticipant: Participant | null;
}

const WheelComponent: React.FC<WheelComponentProps> = ({
  participants,
  rotation,
  isSpinning,
  selectedParticipant
}) => {
  if (participants.length === 0) {
    return (
      <div className="relative w-[717px] h-[717px] mx-auto mb-6">
        <div className="w-full h-full rounded-full border-8 border-gray-300 bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500 text-center px-4 text-xl">
            Добавьте участников<br />для запуска колеса
          </p>
        </div>

        {/* Стрелка указатель - увеличена еще на 40% */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="w-0 h-0 border-l-[27px] border-r-[27px] border-t-[45px] border-l-transparent border-r-transparent border-t-red-600 drop-shadow-lg"></div>
        </div>
      </div>
    );
  }

  const sectorAngle = 360 / participants.length;

  return (
    <div className="relative w-[717px] h-[717px] mx-auto mb-6">
      {/* Стрелка указатель - увеличена на 40% от предыдущего размера */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="w-0 h-0 border-l-[27px] border-r-[27px] border-t-[45px] border-l-transparent border-r-transparent border-t-red-600 drop-shadow-lg"></div>
      </div>

      {/* Вращающееся колесо */}
      <motion.div
        className="w-full h-full rounded-full shadow-2xl relative"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        {participants.length === 1 ? (
          /* Для одного участника */
          <div className="w-full h-full rounded-full relative border-[18px] border-gray-800">
            <div
              className="w-full h-full rounded-full relative"
              style={{ backgroundColor: participants[0].color }}
            >
              {/* Текст увеличен пропорционально */}
              <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
                <div className="text-white font-bold text-2xl text-center drop-shadow-lg">
                  {participants[0].name}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* SVG с увеличенными пропорциями на 40% */
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 448 448"
            className="rounded-full"
            style={{
              shapeRendering: 'geometricPrecision',
              imageRendering: 'crisp-edges'
            }}
          >
            {/* Черная граница - увеличена еще на 40% */}
            <circle
              cx="224"
              cy="224"
              r="224"
              fill="none"
              stroke="#1f2937"
              strokeWidth="18"
            />

            {participants.map((participant, index) => {
              const startAngle = index * sectorAngle;
              const endAngle = (index + 1) * sectorAngle;

              const startAngleRad = (startAngle * Math.PI) / 180;
              const endAngleRad = (endAngle * Math.PI) / 180;

              // Увеличенные координаты: центр 224, радиус 215 (224 - 9)
              const center = 224;
              const radius = 215;
              const x1 = center + radius * Math.cos(startAngleRad);
              const y1 = center + radius * Math.sin(startAngleRad);
              const x2 = center + radius * Math.cos(endAngleRad);
              const y2 = center + radius * Math.sin(endAngleRad);

              const largeArcFlag = sectorAngle > 180 ? 1 : 0;

              const pathData = [
                `M ${center} ${center}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`
              ].join(' ');

              // Текст на увеличенном радиусе
              const textAngle = startAngle + sectorAngle / 2;
              const textRadius = 134; // 96 * 1.4 = 134
              const textX = center + textRadius * Math.cos((textAngle * Math.PI) / 180);
              const textY = center + textRadius * Math.sin((textAngle * Math.PI) / 180);

              const isSelected = selectedParticipant?.id === participant.id && !isSpinning;

              return (
                <g key={participant.id}>
                  <path
                    d={pathData}
                    fill={participant.color}
                    stroke={participant.color}
                    strokeWidth="1.1"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    className={`transition-all duration-300 ${
                      isSelected ? 'opacity-90 drop-shadow-lg' : ''
                    }`}
                    style={{
                      shapeRendering: 'geometricPrecision'
                    }}
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="25"
                    fontWeight="bold"
                    fill="#fff"
                    style={{
                      textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                      paintOrder: 'stroke fill'
                    }}
                    transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                  >
                    {participant.name}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </motion.div>

      {/* Центральная кнопка - увеличена еще на 40% */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[71px] h-[71px] bg-white rounded-full border-[8px] border-gray-800 shadow-lg z-20"></div>
    </div>
  );
};

export default WheelComponent;