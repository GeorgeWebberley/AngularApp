import { Answer } from './Answer';

export interface Question {
  questionId: number;
  question: string;
  correctAnswer: number;
  answers: Answer[];
  song?: string;
  image?: string;
}
