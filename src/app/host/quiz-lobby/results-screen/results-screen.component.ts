import { Player } from './../../../entities/Player';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

// const combinedList = [
//   {
//     name: 'George',
//     score: 4,
//   },
//   {
//     name: 'Kia',
//     score: 2,
//   },
//   {
//     name: 'Louie',
//     score: 6,
//   },
//   {
//     name: 'Cleo',
//     score: 1,
//   },
// ];

@Component({
  selector: 'app-results-screen',
  templateUrl: './results-screen.component.html',
  styleUrls: ['./results-screen.component.scss'],
  animations: [
    trigger('rowEnter', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-100vh)' }),
            stagger(-300, [
              animate(
                '0.5s',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class ResultsScreenComponent implements OnInit {
  @Input() players: Player[];
  @Input() exitButton: boolean;
  @Output() resultsFinishedEmitter = new EventEmitter();

  startAnimation = false;
  displayButton = false;

  constructor() {}

  ngOnInit(): void {
    if (this.players) {
      this.players.sort((a, b) => (a.score > b.score ? -1 : 1));
    }
    setTimeout(() => {
      this.startAnimation = true;
      this.pause();
    }, 1500);
  }

  pause(): void {
    setTimeout(() => {
      if (this.exitButton) {
        this.displayButton = true;
      } else {
        this.resultsFinishedEmitter.emit();
      }
    }, 3000);
  }

  exitGame(): void {
    console.log('GAME FINISHED!!');
  }
}
