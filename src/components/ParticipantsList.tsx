import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Participant } from '../types';

interface ParticipantsListProps {
  participants: Participant[];
  winners: Participant[];
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({
  participants,
  winners
}) => {
  const activeCount = participants.filter(p => !p.eliminated).length;

  if (participants.length === 0) {
    return (
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          👥 Участники
        </h3>
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🎭</div>
          <p className="text-gray-500 italic">Список участников пуст</p>
          <p className="text-sm text-gray-400 mt-2">
            Добавьте участников, чтобы начать игру
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        👥 Участники ({activeCount}/{participants.length})
      </h3>

      <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
        <AnimatePresence>
          {participants.map((participant, index) => (
            <motion.div
              key={participant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex items-center space-x-2 py-2 px-3 mb-1 rounded-lg ${
                participant.eliminated
                  ? 'bg-gray-100 opacity-60'
                  : 'bg-gray-50'
              }`}
            >
              <div
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: participant.color }}
              />
              <span
                className={`flex-1 ${
                  participant.eliminated
                    ? 'line-through text-gray-400'
                    : 'text-gray-800'
                }`}
              >
                {participant.name}
              </span>
              {participant.eliminated && (
                <span className="text-xs text-red-500 font-medium">
                  Исключён
                </span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {winners.length > 0 && (
        <motion.div
          className="mt-6 pt-4 border-t border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            🏆 История побед
          </h4>
          <div className="space-y-2">
            {winners.map((winner, index) => (
              <motion.div
                key={`${winner.id}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2 p-2 bg-yellow-50 rounded-lg"
              >
                <span className="text-lg">🥇</span>
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: winner.color }}
                />
                <span className="text-sm font-medium text-gray-800">
                  {winner.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ParticipantsList;