
import React from 'react';
import { motion } from 'framer-motion';
import { WinnerScore } from '../hooks/useParticipants';

interface WinnerScoreBoardProps {
  winnerScores: WinnerScore[];
  onClearScores?: () => void;
}

const WinnerScoreBoard: React.FC<WinnerScoreBoardProps> = ({
  winnerScores,
  onClearScores
}) => {
  if (winnerScores.length === 0) {
    return (
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Таблица победителей
        </h3>
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-full"></div>
          <p className="text-gray-500 text-lg">
            Пока нет победителей
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-gray-800">
          Таблица победителей
        </h3>
        {onClearScores && (
          <button
            onClick={onClearScores}
            className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-full transition-colors"
            title="Очистить всю статистику"
          >
            Очистить
          </button>
        )}
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {winnerScores.map((winner, index) => (
          <motion.div
            key={winner.name}
            className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${
              index === 0
                ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300 shadow-md'
                : index === 1
                ? 'bg-gradient-to-r from-gray-50 to-slate-100 border-gray-300'
                : index === 2
                ? 'bg-gradient-to-r from-orange-50 to-amber-100 border-orange-300'
                : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-600 min-w-[24px] text-center">
                  {index + 1}
                </span>
              </div>
              <div
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: winner.color }}
              />
              <span className="font-semibold text-gray-800">
                {winner.name}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <motion.div
                className="text-2xl font-bold text-indigo-600"
                key={winner.score}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {winner.score}
              </motion.div>
              <span className="text-sm text-gray-500">
                {winner.score === 1 ? 'победа' : winner.score < 5 ? 'победы' : 'побед'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WinnerScoreBoard;