import { QuizLobbyComponent } from './quiz-lobby/quiz-lobby.component';
import { CreateLobbyComponent } from './create-lobby/create-lobby.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'create-lobby', component: CreateLobbyComponent },
  { path: 'quiz-lobby', component: QuizLobbyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HostRoutingModule {}
