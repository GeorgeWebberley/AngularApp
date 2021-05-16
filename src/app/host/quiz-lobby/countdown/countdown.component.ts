import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  @Output() valueEmitter = new EventEmitter();

  index = 0;

  countdown = [3, 2, 1, 'GO!'];

  display = this.countdown[this.index];

  constructor() {}

  ngOnInit(): void {
    this.startCountDown();
  }

  startCountDown(): void {
    setInterval(() => {
      this.index++;
      if (this.index >= this.countdown.length) {
        this.valueEmitter.emit();
      }
      this.display = this.countdown[this.index];
    }, 1000);
  }
}
