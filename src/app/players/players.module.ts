import { LottieModule } from 'ngx-lottie';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersRoutingModule } from './players-routing.module';
import { JoinLobbyComponent } from './join-lobby/join-lobby.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerLobbyComponent } from './player-lobby/player-lobby.component';
import { LoadingScreenComponent } from './player-lobby/loading-screen/loading-screen.component';
import player from 'lottie-web';
import { AnswerQuestionComponent } from './player-lobby/answer-question/answer-question.component';

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    JoinLobbyComponent,
    PlayerLobbyComponent,
    LoadingScreenComponent,
    AnswerQuestionComponent,
  ],
  imports: [
    CommonModule,
    PlayersRoutingModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
})
export class PlayersModule {}
