import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Participant } from '../types';

interface WinnerDisplayProps {
  winner: Participant | null;
  isSpinning: boolean;
}

const WinnerDisplay: React.FC<WinnerDisplayProps> = ({ winner, isSpinning }) => {
  return (
    <div className="mt-8 min-h-[120px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {isSpinning ? (
          <motion.div
            key="spinning"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center"
          >
            <motion.div
              className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
            />
            <h3 className="text-2xl font-bold text-gray-600 animate-pulse">
              Выбираем участника...
            </h3>
          </motion.div>
        ) : winner ? (
          <motion.div
            key={`winner-${winner.id}`}
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            className="text-center"
          >
            <motion.h3
              className="text-3xl font-bold text-red-600 mb-4"
            >
              ВЫБЫВАЕТ
            </motion.h3>

            <motion.div
              className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-8 py-4 rounded-2xl shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center justify-center space-x-3">
                <div
                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: winner.color }}
                />
                <span className="text-2xl font-bold">
                  {winner.name}
                </span>
              </div>
            </motion.div>

            <motion.p
              className="text-sm text-gray-500 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Участник исключен из дальнейшей игры
            </motion.p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default WinnerDisplay;