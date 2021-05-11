import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersRoutingModule } from './players-routing.module';
import { PlayersComponent } from './players.component';
import { JoinLobbyComponent } from './join-lobby/join-lobby.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AnswerQuestionsComponent } from './answer-questions/answer-questions.component';

@NgModule({
  declarations: [PlayersComponent, JoinLobbyComponent, AnswerQuestionsComponent],
  imports: [CommonModule, PlayersRoutingModule, ReactiveFormsModule],
})
export class PlayersModule {}
