import React from 'react';
import { motion } from 'framer-motion';
import './App.css';
import WheelComponent from './components/WheelComponent';
import ParticipantsList from './components/ParticipantsList';
import Controls from './components/Controls';
import ParticipantInput from './components/ParticipantInput';
import WinnerDisplay from './components/WinnerDisplay';
import WinnerScoreBoard from './components/WinnerScoreBoard';
import { useParticipants } from './hooks/useParticipants';
import { useWheelGame } from './hooks/useWheelGame';
import { Participant } from './types';

function App() {
  const {
    participants,
    originalParticipants,
    participantsInput,
    addParticipants,
    eliminateParticipant,
    resetParticipants,
    clearParticipantsOnly,
    getActiveParticipants,
    getWinnersWithScores,
    clearAllScores
  } = useParticipants();

  const {
    isSpinning,
    rotation,
    selectedParticipant,
    spinDuration,
    setSpinDuration,
    spin,
    reset
  } = useWheelGame();

  const handleSpin = () => {
    const activeParticipants = getActiveParticipants();
    if (activeParticipants.length === 0) return;

    // Централизованная логика определения победителя
    spin(activeParticipants, (selected: Participant) => {
      console.log('Participant selected by wheel:', selected.name);
      eliminateParticipant(selected.id);
    });
  };

  const handleReset = () => {
    reset();
    resetParticipants();
  };

  const activeParticipants = getActiveParticipants();

  const participantsForWheel = activeParticipants.length > 0 ? activeParticipants : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-200 p-4">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 pt-4">
          {/* Left Sidebar - Input Section + Winner Score Board */}
          <div className="xl:col-span-1 space-y-6">
            <ParticipantInput
              onAddParticipants={addParticipants}
              spinDuration={spinDuration}
              onSpinDurationChange={setSpinDuration}
              participantsInput={participantsInput}
            />

            {/* Winner Score Board */}
            <WinnerScoreBoard
              winnerScores={getWinnersWithScores()}
              onClearScores={clearAllScores}
            />
          </div>

          {/* Center - Wheel Section */}
          <div className="xl:col-span-3 flex justify-center">
            <div className="w-fit">
              <motion.div
                className="bg-white rounded-xl shadow-2xl text-center border border-gray-200 overflow-visible"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  width: '781px',
                  padding: '16px'
                }}
              >
                <div className="flex flex-col items-center">
                  <WheelComponent
                    participants={participantsForWheel}
                    rotation={rotation}
                    isSpinning={isSpinning}
                    selectedParticipant={selectedParticipant}
                  />

                  <div className="w-full min-h-[120px] flex items-center justify-center">
                    <WinnerDisplay
                      winner={selectedParticipant}
                      isSpinning={isSpinning}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            <ParticipantsList
              participants={participants}
              winners={[]}
              onClearParticipants={clearParticipantsOnly}
            />

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Управление
              </h3>
              <Controls
                onSpin={handleSpin}
                onReset={handleReset}
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