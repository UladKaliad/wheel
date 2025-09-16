export interface Participant {
    id: number;
    name: string;
    color: string;
    eliminated: boolean;
  }

  export interface WheelState {
    isSpinning: boolean;
    rotation: number;
    winner: Participant | null;
    spinDuration: number;
  }

  export interface GameState {
    participants: Participant[];
    originalParticipants: Participant[];
    eliminationMode: boolean;
    winners: Participant[];
  }
  