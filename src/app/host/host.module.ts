import { ResultsScreenComponent } from './quiz-lobby/results-screen/results-screen.component';
import { LottieModule } from 'ngx-lottie';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HostRoutingModule } from './host-routing.module';
import { CreateLobbyComponent } from './create-lobby/create-lobby.component';
import { QuizLobbyComponent } from './quiz-lobby/quiz-lobby.component';
import { CountdownComponent } from './quiz-lobby/countdown/countdown.component';
import { QuestionComponent } from './quiz-lobby/question/question.component';

import player from 'lottie-web';
import { CorrectAnswerComponent } from './quiz-lobby/correct-answer/correct-answer.component';
import { FinalResultsComponent } from './quiz-lobby/final-results/final-results.component';

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    CreateLobbyComponent,
    QuizLobbyComponent,
    CountdownComponent,
    QuestionComponent,
    ResultsScreenComponent,
    CorrectAnswerComponent,
    FinalResultsComponent,
  ],
  imports: [
    CommonModule,
    HostRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
})
export class HostModule {}
