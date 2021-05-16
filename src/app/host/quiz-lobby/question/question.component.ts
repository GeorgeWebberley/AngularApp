import { AnimationOptions } from 'ngx-lottie';
import { Answer } from './../../../entities/Answer';
import { Question } from './../../../entities/Question';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  animations: [
    trigger('centerToTop', [
      state(
        'center',
        style({
          marginTop: '40vh',
          fontFamily: 'Reggae One',
          fontSize: '10vh',
          lineHeight: '10vh',
          width: '100vw',
        })
      ),
      state(
        'top',
        style({
          fontFamily: 'Reggae One',
          fontSize: '6vh',
          lineHeight: '6vh',
          width: '60vw',
        })
      ),
      transition('center => top', [animate('2s ease')]),
    ]),
    trigger('answerPop', [
      state(
        'left',
        style({
          transform: 'translateX(-200%)',
        })
      ),
      state(
        'right',
        style({
          transform: 'translateX(200%)',
        })
      ),
      state(
        'visible',
        style({
          transform: 'translateX(0)',
        })
      ),
      transition('* => visible', [animate('0.5s 2s ease')]),
    ]),
  ],
})
export class QuestionComponent implements OnInit {
  @Input() currentQuestion: Question;
  @Output() questionFinishedEmitter = new EventEmitter();

  firstView = true;

  timer = false;

  whooshSound: any;
  countdownSound: any;
  mobile = false;

  options: AnimationOptions = {
    path: '/assets/animations/countdown.json',
  };

  constructor() {
    this.whooshSound = new Audio();
    this.whooshSound.src = 'assets/sounds/whoosh.flac';
    this.whooshSound.load();
    this.countdownSound = new Audio();
    this.countdownSound.src = 'assets/sounds/countdown.wav';
    this.countdownSound.load();
  }

  ngOnInit(): void {
    this.mobile = window.innerWidth < 500;
    setTimeout(() => {
      this.firstView = false;
      this.startTimer();
      this.startWhoosh();
    }, 1000);
  }

  startWhoosh(): void {
    setTimeout(() => {
      this.whooshSound.play();
    }, 2200);
  }

  startTimer(): void {
    setTimeout(() => {
      this.timer = true;
      this.stopTimer();
      this.startCountdownSound();
    }, 3000);
  }

  startCountdownSound(): void {
    setTimeout(() => {
      this.countdownSound.play();
    }, 7000);
  }

  stopTimer(): void {
    setTimeout(() => {
      this.timer = false;
      this.questionFinishedEmitter.emit();
    }, 10000);
  }

  answer(number): string | number {
    return this.currentQuestion.answers.find(
      (answer) => answer.answerId == number
    ).answer;
  }
}
