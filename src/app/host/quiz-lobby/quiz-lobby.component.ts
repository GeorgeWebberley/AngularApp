import { Router } from '@angular/router';
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
  finalResults = false;

  questions: Question[];
  questionNumber = 0;
  currentQuestion: any;
  correctAnswer: any;

  lobbyId: string;
  lobbyCode: string;
  players: Player[];
  oldScores: Player[];

  backgroundSong: any;
  audiofader: any;

  exitButton = false;

  // testPlayers: any;

  @Select(HostState) state: Observable<any>;

  constructor(
    private gameService: GameService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gameService
      .getQuestions()
      .valueChanges()
      .subscribe((data) => {
        this.questions = data;
        console.log('questions', this.questions);
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

    // TESTING

    // this.testPlayers = [
    //   {
    //     name: 'George',
    //     score: 5,
    //   },
    //   {
    //     name: 'Kia',
    //     score: 6,
    //   },
    //   {
    //     name: 'Cleo',
    //     score: 8,
    //   },
    //   {
    //     name: 'Louie',
    //     score: 3,
    //   },
    //   {
    //     name: 'Will',
    //     score: 1,
    //   },
    //   {
    //     name: 'Tom',
    //     score: 5,
    //   },
    //   {
    //     name: 'Benji',
    //     score: 6,
    //   },
    //   {
    //     name: 'Benji',
    //     score: 6,
    //   },
    //   {
    //     name: 'Benji',
    //     score: 6,
    //   },
    //   {
    //     name: 'Benji',
    //     score: 6,
    //   },
    //   {
    //     name: 'Benji',
    //     score: 6,
    //   },
    //   {
    //     name: 'Benji',
    //     score: 6,
    //   },
    //   {
    //     name: 'Benji',
    //     score: 6,
    //   },
    //   {
    //     name: 'Benji',
    //     score: 6,
    //   },
    //   {
    //     name: 'Benji',
    //     score: 6,
    //   },
    //   {
    //     name: 'Benji',
    //     score: 6,
    //   },
    //   {
    //     name: 'Benji',
    //     score: 6,
    //   },
    //   {
    //     name: 'Benji',
    //     score: 6,
    //   },
    //   {
    //     name: 'Benji',
    //     score: 6,
    //   },
    //   {
    //     name: 'Benji',
    //     score: 6,
    //   },
    //   {
    //     name: 'Benji',
    //     score: 6,
    //   },
    //   {
    //     name: 'Benji',
    //     score: 6,
    //   },
    //   {
    //     name: 'Benji',
    //     score: 6,
    //   },
    //   {
    //     name: 'Benji',
    //     score: 6,
    //   },
    //   {
    //     name: 'Benji',
    //     score: 6,
    //   },
    // ];

    // ----------------------------

    this.showCountdownScreen();
  }

  startNextQuestion(): void {
    this.questionNumber++;
    this.currentQuestion = this.getNextQuestion();
    this.backgroundSong = new Audio();
    if (this.currentQuestion.song) {
      this.backgroundSong.src = 'assets/sounds/' + this.currentQuestion.song;
    } else {
      this.backgroundSong.src = 'assets/sounds/jazz.mp3';
    }
    this.backgroundSong.volume = 1;
    this.backgroundSong.play();
    this.showQuestionScreen();
    this.gameService.setCurrentQuestion(this.lobbyId, this.currentQuestion);
  }

  fadeAndStopSong(): void {
    this.audiofader = setInterval(() => {
      // When volume at 0.1 stop all the intervalling
      if (this.backgroundSong.volume <= 0.1) {
        this.backgroundSong.pause();
        clearInterval(this.audiofader);
      } else {
        this.backgroundSong.volume -= 0.1;
      }
    }, 200);
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
    if (this.questionNumber + 1 <= this.questions.length) {
      this.fadeAndStopSong();
      this.showCountdownScreen();
    } else {
      this.showFinalResults();
    }
  }

  answerFinished(): void {
    this.showResultsScreen();
  }

  podiumFinished(): void {
    this.exitButton = true;
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

  showFinalResults(): void {
    this.questionScreen = false;
    this.countdownScreen = false;
    this.resultsScreen = false;
    this.answerScreen = false;
    this.finalResults = true;
  }

  endGame(): void {
    this.backgroundSong.pause();
    this.router.navigate(['/home']);
  }
}
