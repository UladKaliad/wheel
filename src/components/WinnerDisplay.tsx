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
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-6xl mb-4"
            >
              🎲
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-600 animate-pulse">
              Выбираем победителя...
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
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360, 0]
              }}
              transition={{
                duration: 1,
                repeat: 3,
                ease: "easeInOut"
              }}
              className="text-8xl mb-4"
            >
              🏆
            </motion.div>

            <motion.h3
              className="text-3xl font-bold text-slate-700 mb-4"
            >
              🎉 ПОБЕДИТЕЛЬ! 🎉
            </motion.h3>

            <motion.div
              className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 rounded-2xl shadow-2xl winner-glow"
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
          </motion.div>
        ) : (
          <motion.div
            key="waiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-500"
          >
            <div className="text-4xl mb-2">🎯</div>
            <p className="text-lg">Добавьте участников и нажмите "ЗАПУСТИТЬ!"</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WinnerDisplay;