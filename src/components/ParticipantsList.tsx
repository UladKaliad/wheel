import React from 'react';
import { motion } from 'framer-motion';
import { Participant } from '../types';

interface ParticipantsListProps {
  participants: Participant[];
  winners: Participant[];
  onClearParticipants?: () => void;
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({
  participants,
  winners,
  onClearParticipants
}) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-gray-800">
          Участники
        </h3>
        {onClearParticipants && participants.length > 0 && (
          <button
            onClick={onClearParticipants}
            className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-full transition-colors"
            title="Очистить список участников"
          >
            Очистить
          </button>
        )}
      </div>

      {participants.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-full"></div>
          <p className="text-gray-500 text-lg">
            Добавьте участников для начала игры
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {participants.map((participant, index) => (
            <motion.div
              key={participant.id}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                participant.eliminated
                  ? 'bg-gray-50 border-gray-200'
                  : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: participant.color }}
                />
                <span
                  className={`font-medium ${
                    participant.eliminated
                      ? 'text-gray-500 line-through'
                      : 'text-gray-800'
                  }`}
                >
                  {participant.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {participant.eliminated ? (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                    Исключен
                  </span>
                ) : (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Активен
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ParticipantsList;