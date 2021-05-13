import { Answer } from './../../entities/Answer';
import { GetPlayers } from './../../state/host-state/host.action';
import { Player } from './../../entities/Player';
import { HostState } from './../../state/host-state/host.state';
import { Question } from './../../entities/Question';
import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quiz-lobby',
  templateUrl: './quiz-lobby.component.html',
  styleUrls: ['./quiz-lobby.component.scss'],
})
export class QuizLobbyComponent implements OnInit {
  countdownScreen = false;
  resultsScreen = false;
  questionScreen = false;
  answerScreen = false;

  questions: Question[];
  questionNumber = 0;
  currentQuestion: any;
  correctAnswer: any;

  lobbyId: string;
  lobbyCode: string;
  players: Player[];
  oldScores: Player[];

  @Select(HostState) state: Observable<any>;

  constructor(private gameService: GameService, private store: Store) {}

  ngOnInit(): void {
    this.gameService
      .getQuestions()
      .valueChanges()
      .subscribe((data) => {
        this.questions = data;
      });

    this.state.subscribe((data) => {
      this.lobbyId = data.lobbyId;
      this.lobbyCode = data.lobbyCode;
      this.oldScores = data.players;

      this.gameService
        .getPlayers(this.lobbyId)
        .valueChanges()
        .subscribe((players) => {
          this.players = players;
        });
    });

    this.showCountdownScreen();
  }

  startNextQuestion(): void {
    this.questionNumber++;
    this.currentQuestion = this.getNextQuestion();

    this.showQuestionScreen();
    this.gameService.setCurrentQuestion(this.lobbyId, this.currentQuestion);
  }

  getNextQuestion(): Question {
    return this.questions.find(
      (question) => question.questionId == this.questionNumber
    );
  }

  getCorrectAnswer(): any {
    this.correctAnswer = this.currentQuestion.answers.find((answer) => {
      return answer.answerId == this.currentQuestion.correctAnswer;
    });
  }

  questionFinished(): void {
    this.gameService.setCurrentQuestion(this.lobbyId, 'loading');
    this.getCorrectAnswer();
    this.showAnswerScreen();
  }

  resultsFinished(): void {
    this.showCountdownScreen();
  }

  answerFinished(): void {
    this.showResultsScreen();
  }

  // ---------- Screen renderers -----------
  showQuestionScreen(): void {
    this.questionScreen = true;
    this.countdownScreen = false;
    this.resultsScreen = false;
    this.answerScreen = false;
  }

  showResultsScreen(): void {
    this.questionScreen = false;
    this.countdownScreen = false;
    this.resultsScreen = true;
    this.answerScreen = false;
  }

  showAnswerScreen(): void {
    this.questionScreen = false;
    this.countdownScreen = false;
    this.resultsScreen = false;
    this.answerScreen = true;
  }

  showCountdownScreen(): void {
    this.questionScreen = false;
    this.countdownScreen = true;
    this.resultsScreen = false;
    this.answerScreen = false;
  }
}
