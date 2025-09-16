import React from 'react';
import { motion } from 'framer-motion';
import './App.css';
import WheelComponent from './components/WheelComponent';
import ParticipantsList from './components/ParticipantsList';
import Controls from './components/Controls';
import ParticipantInput from './components/ParticipantInput';
import WinnerDisplay from './components/WinnerDisplay';
import { useParticipants } from './hooks/useParticipants';
import { useWheel } from './hooks/useWheel';

function App() {
  const {
    participants,
    originalParticipants,
    eliminationMode,
    winners,
    setEliminationMode,
    addParticipants,
    eliminateParticipant,
    resetParticipants,
    clearAll,
    addWinner,
    getActiveParticipants
  } = useParticipants();

  const {
    isSpinning,
    rotation,
    winner,
    spinDuration,
    setSpinDuration,
    spin,
    reset
  } = useWheel();

  const handleSpin = () => {
    const activeParticipants = getActiveParticipants();
    if (activeParticipants.length === 0) return;

    spin(activeParticipants, (selectedWinner) => {
      addWinner(selectedWinner);
      if (eliminationMode) {
        eliminateParticipant(selectedWinner.id);
      }
    });
  };

  const handleReset = () => {
    reset();
    resetParticipants();
  };

  const handleClearAll = () => {
    reset();
    clearAll();
  };

  const activeParticipants = getActiveParticipants();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-200 p-4">
      <div className="max-w-7xl mx-auto">
        <motion.header
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4 drop-shadow-lg">
            🎡 Колесо Случайного Выбора
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Добавьте участников, запустите колесо и узнайте кто станет победителем!
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <ParticipantInput
              onAddParticipants={addParticipants}
              eliminationMode={eliminationMode}
              onToggleEliminationMode={setEliminationMode}
              spinDuration={spinDuration}
              onSpinDurationChange={setSpinDuration}
            />
          </div>

          {/* Wheel Section */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white rounded-xl shadow-2xl p-8 text-center border border-gray-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <WheelComponent
                participants={activeParticipants}
                rotation={rotation}
                isSpinning={isSpinning}
                winner={winner}
              />

              <WinnerDisplay
                winner={winner}
                isSpinning={isSpinning}
              />

              {eliminationMode && activeParticipants.length > 0 && (
                <motion.div
                  className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-indigo-700 font-medium">
                    🏆 Режим исключения активен
                  </p>
                  <p className="text-indigo-600 text-sm mt-1">
                    Участников осталось: <span className="font-bold">{activeParticipants.length}</span>
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ParticipantsList
              participants={participants}
              winners={winners}
            />

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                🎮 Управление
              </h3>
              <Controls
                onSpin={handleSpin}
                onReset={handleReset}
                onClearAll={handleClearAll}
                isSpinning={isSpinning}
                hasParticipants={activeParticipants.length > 0}
                canReset={originalParticipants.length > 0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;