import { Question } from './Question';
import { Player } from './Player';

export interface Lobby {
  id: string;
  lobbyCode: string;
  players: Player[];
  currentQuestion: Question | string; // since it can 'loading' or a question
}
