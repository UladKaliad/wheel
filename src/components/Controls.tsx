import React from 'react';
import { motion } from 'framer-motion';

interface ControlsProps {
  onSpin: () => void;
  onReset: () => void;
  onClearAll: () => void;
  isSpinning: boolean;
  hasParticipants: boolean;
  canReset: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  onSpin,
  onReset,
  onClearAll,
  isSpinning,
  hasParticipants,
  canReset
}) => {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={onSpin}
        disabled={!hasParticipants || isSpinning}
        className={`w-full py-4 px-6 rounded-xl font-bold text-xl transition duration-300 ${
          !hasParticipants || isSpinning
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg'
        }`}
        whileHover={hasParticipants && !isSpinning ? { scale: 1.02 } : {}}
        whileTap={hasParticipants && !isSpinning ? { scale: 0.98 } : {}}
      >
        {isSpinning ? (
          <div className="flex items-center justify-center space-x-3">
            <motion.div
              className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>Вращается...</span>
          </div>
        ) : (
          '🎯 ЗАПУСТИТЬ!'
        )}
      </motion.button>

      <motion.button
        onClick={onReset}
        disabled={!canReset || isSpinning}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition duration-200 ${
          !canReset || isSpinning
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-slate-500 hover:bg-slate-600 text-white'
        }`}
        whileHover={canReset && !isSpinning ? { scale: 1.02 } : {}}
        whileTap={canReset && !isSpinning ? { scale: 0.98 } : {}}
      >
        🔄 Сброс
      </motion.button>

      <motion.button
        onClick={onClearAll}
        disabled={isSpinning}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition duration-200 ${
          isSpinning
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-red-500 hover:bg-red-600 text-white'
        }`}
        whileHover={!isSpinning ? { scale: 1.02 } : {}}
        whileTap={!isSpinning ? { scale: 0.98 } : {}}
      >
        🗑️ Очистить всё
      </motion.button>
    </motion.div>
  );
};

export default Controls;