import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ParticipantInputProps {
  onAddParticipants: (inputText: string) => void;
  spinDuration: number;
  onSpinDurationChange: (duration: number) => void;
  participantsInput?: string;
}

const ParticipantInput: React.FC<ParticipantInputProps> = ({
  onAddParticipants,
  spinDuration,
  onSpinDurationChange,
  participantsInput = ''
}) => {
  const [inputText, setInputText] = useState(participantsInput);
  const [durationInput, setDurationInput] = useState(spinDuration.toString());

  useEffect(() => {
    setInputText(participantsInput);
  }, [participantsInput]);

  const handleSubmit = () => {
    onAddParticipants(inputText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  const handleDurationChange = (value: string) => {
    setDurationInput(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 1) {
      onSpinDurationChange(numValue);
    }
  };

  const handleDurationBlur = () => {
    const numValue = parseFloat(durationInput);
    if (isNaN(numValue) || numValue < 1) {
      setDurationInput('1');
      onSpinDurationChange(1);
    } else {
      setDurationInput(numValue.toString());
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Добавить участников
      </h2>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Введите имена участников&#10;(разделите запятой или новой строкой)&#10;&#10;Пример:&#10;Анна, Борис, Виктор&#10;или&#10;Анна&#10;Борис&#10;Виктор"
        className="w-full h-32 p-4 border-2 border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 text-sm"
      />

      <motion.button
        onClick={handleSubmit}
        disabled={!inputText.trim()}
        className={`w-full mt-4 py-3 px-6 rounded-lg font-semibold transition duration-200 ${
          inputText.trim()
            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg transform hover:scale-105'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        whileHover={inputText.trim() ? { scale: 1.02 } : {}}
        whileTap={inputText.trim() ? { scale: 0.98 } : {}}
      >
        Добавить участников
      </motion.button>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Время вращения (в секундах):
        </label>
        <div className="flex items-center space-x-3">
          <input
            type="number"
            min="1"
            step="0.1"
            value={durationInput}
            onChange={(e) => handleDurationChange(e.target.value)}
            onBlur={handleDurationBlur}
            className="w-20 px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center font-semibold"
          />
          <span className="text-sm text-gray-600">секунд</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Минимум: 1 секунда (можно указать десятые доли)
        </p>
      </div>
    </motion.div>
  );
};

export default ParticipantInput;