import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ParticipantInputProps {
  onAddParticipants: (inputText: string) => void;
  eliminationMode: boolean;
  onToggleEliminationMode: (enabled: boolean) => void;
  spinDuration: number;
  onSpinDurationChange: (duration: number) => void;
}

const ParticipantInput: React.FC<ParticipantInputProps> = ({
  onAddParticipants,
  eliminationMode,
  onToggleEliminationMode,
  spinDuration,
  onSpinDurationChange
}) => {
  const [inputText, setInputText] = useState('');
  const [durationInput, setDurationInput] = useState(spinDuration.toString());

  const handleSubmit = () => {
    onAddParticipants(inputText);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  const handleDurationChange = (value: string) => {
    setDurationInput(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 30) {
      onSpinDurationChange(numValue);
    }
  };

  const handleDurationBlur = () => {
    const numValue = parseFloat(durationInput);
    if (isNaN(numValue) || numValue < 1) {
      setDurationInput('1');
      onSpinDurationChange(1);
    } else if (numValue > 30) {
      setDurationInput('30');
      onSpinDurationChange(30);
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
        📝 Добавить участников
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
        ➕ Добавить участников
      </motion.button>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={eliminationMode}
              onChange={(e) => onToggleEliminationMode(e.target.checked)}
              className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-gray-700">
              🏆 Режим исключения
            </span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ⏱️ Время вращения (в секундах):
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="number"
              min="1"
              max="30"
              step="0.1"
              value={durationInput}
              onChange={(e) => handleDurationChange(e.target.value)}
              onBlur={handleDurationBlur}
              className="w-20 px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center font-semibold"
            />
            <span className="text-sm text-gray-600">секунд</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Диапазон: от 1 до 30 секунд (можно указать десятые доли)
          </p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-xs text-slate-700">
          💡 <strong>Совет:</strong> Нажмите Ctrl+Enter для быстрого добавления участников
        </p>
      </div>
    </motion.div>
  );
};

export default ParticipantInput;