import { AnimationOptions } from 'ngx-lottie';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
})
export class LoadingScreenComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/animations/heart.json',
  };
  constructor() {}

  ngOnInit(): void {}
}
