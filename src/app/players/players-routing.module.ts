import { AnswerQuestionsComponent } from './answer-questions/answer-questions.component';
import { JoinLobbyComponent } from './join-lobby/join-lobby.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayersComponent } from './players.component';

const routes: Routes = [
  { path: '', component: PlayersComponent },
  { path: 'join-lobby', component: JoinLobbyComponent },
  { path: 'questions', component: AnswerQuestionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayersRoutingModule {}
