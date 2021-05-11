import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HostRoutingModule } from './host-routing.module';
import { HostComponent } from './host.component';
import { CreateLobbyComponent } from './create-lobby/create-lobby.component';
import { QuizLobbyComponent } from './quiz-lobby/quiz-lobby.component';

@NgModule({
  declarations: [HostComponent, CreateLobbyComponent, QuizLobbyComponent],
  imports: [CommonModule, HostRoutingModule],
})
export class HostModule {}
