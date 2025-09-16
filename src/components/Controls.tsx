import React from 'react';
import { motion } from 'framer-motion';

interface ControlsProps {
  onSpin: () => void;
  onReset: () => void;
  isSpinning: boolean;
  hasParticipants: boolean;
  canReset: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  onSpin,
  onReset,
  isSpinning,
  hasParticipants,
  canReset
}) => {
  return (
    <div className="space-y-4">
      <motion.button
        onClick={onSpin}
        disabled={!hasParticipants || isSpinning}
        className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition duration-200 ${
          hasParticipants && !isSpinning
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg transform hover:scale-105'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        whileHover={hasParticipants && !isSpinning ? { scale: 1.02 } : {}}
        whileTap={hasParticipants && !isSpinning ? { scale: 0.98 } : {}}
      >
        {isSpinning ? (
          <span className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Вращение...</span>
          </span>
        ) : (
          'Запустить колесо'
        )}
      </motion.button>

      <motion.button
        onClick={onReset}
        disabled={!canReset || isSpinning}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition duration-200 ${
          canReset && !isSpinning
            ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg transform hover:scale-105'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        whileHover={canReset && !isSpinning ? { scale: 1.02 } : {}}
        whileTap={canReset && !isSpinning ? { scale: 0.98 } : {}}
      >
        Сбросить игру
      </motion.button>

      <div className="text-center text-xs text-gray-500 mt-4">
        <p>Сброс восстанавливает всех участников</p>
      </div>
    </div>
  );
};

export default Controls;