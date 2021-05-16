import { Player } from './../../../entities/Player';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-final-results',
  templateUrl: './final-results.component.html',
  styleUrls: ['./final-results.component.scss'],
  animations: [
    trigger('titleAnimation', [
      transition(':enter', [
        style({
          transform: 'translateY(-60vh)',
          height: 0,
          opacity: 0,
        }),
        animate('1s ease'),
      ]),
      transition(':leave', [
        animate(
          '1s ease',
          style({
            transform: 'translateY(60vh)',
            height: 0,
            opacity: 0,
          })
        ),
      ]),
    ]),
    trigger('podiumPop', [
      transition(':enter', [
        animate(
          '0.6s cubic-bezier(.85,.42,.94,.56)',
          keyframes([
            style({ transform: 'translateY(-500px)' }),
            style({ transform: 'translateY(0px)' }),
            style({ transform: 'translateY(-65px)' }),
            style({ transform: 'translateY(0px)' }),
            style({ transform: 'translateY(-28px)' }),
            style({ transform: 'translateY(0px)' }),
            style({ transform: 'translateY(-8px)' }),
            style({ transform: 'translateY(0px)' }),
          ])
        ),
      ]),
      transition(':leave', [
        animate(
          '0.5s ease',
          style({
            transform: 'translateY(60vh)',
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class FinalResultsComponent implements OnInit {
  @Input() players: Player[];
  @Output() finishedPodium = new EventEmitter();
  introductionText = false;
  podium = false;
  allResults = false;

  third = false;
  second = false;
  first = false;

  cheering: any;

  constructor() {}

  ngOnInit(): void {
    this.cheering = new Audio();
    this.cheering.src = 'assets/sounds/cheer.mp3';
    if (this.players) {
      this.players.sort((a, b) => (a.score > b.score ? -1 : 1));
    }
    this.startFinalResults();
  }

  startFinalResults(): void {
    this.introductionText = true;
    setTimeout(() => {
      this.introductionText = false;
      setTimeout(() => {
        this.cheering.play();
        this.startPodium();
      }, 1000);
    }, 3000);
  }

  // Timing enter and exit for podium winners
  startPodium(): void {
    this.podium = true;
    setTimeout(() => {
      this.third = true;
      setTimeout(() => {
        this.second = true;
        setTimeout(() => {
          this.first = true;
          setTimeout(() => {
            this.first = false;
            this.second = false;
            this.third = false;
            setTimeout(() => {
              this.finishedPodium.emit();
            }, 1000);
          }, 3000);
        }, 1000);
      }, 1000);
    }, 1000);
  }
}
