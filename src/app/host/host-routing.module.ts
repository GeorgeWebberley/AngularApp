import { QuizLobbyComponent } from './quiz-lobby/quiz-lobby.component';
import { CreateLobbyComponent } from './create-lobby/create-lobby.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HostComponent } from './host.component';

const routes: Routes = [
  { path: '', component: HostComponent },
  { path: 'create-lobby', component: CreateLobbyComponent },
  { path: 'quiz-lobby', component: QuizLobbyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HostRoutingModule {}
