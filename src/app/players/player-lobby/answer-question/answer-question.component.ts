import { Question } from './../../../entities/Question';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-answer-question',
  templateUrl: './answer-question.component.html',
  styleUrls: ['./answer-question.component.scss'],
})
export class AnswerQuestionComponent implements OnInit {
  @Input() currentQuestion: Question;
  @Output() answerEmitter = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  answer(number): string | number {
    if (this.currentQuestion) {
      return this.currentQuestion.answers.find(
        (answer) => answer.answerId == number
      ).answer;
    }
  }

  userAnswered(answer: number): void {
    this.answerEmitter.emit(answer);
  }
}
