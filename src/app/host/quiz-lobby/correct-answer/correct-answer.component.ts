import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-correct-answer',
  templateUrl: './correct-answer.component.html',
  styleUrls: ['./correct-answer.component.scss'],
})
export class CorrectAnswerComponent implements OnInit {
  @Output() answerFinishedEmitter = new EventEmitter();
  @Input() correctAnswer: any;
  @Input() image: string;

  title = true;
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.title = false;
      // this.showResults();
    }, 3000);
  }

  // showResults(): void {
  //   setTimeout(() => {
  //     this.answerFinishedEmitter.emit();
  //   }, 7000);
  // }
}
