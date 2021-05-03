import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersRoutingModule } from './players-routing.module';
import { PlayersComponent } from './players.component';
import { JoinLobbyComponent } from './join-lobby/join-lobby.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PlayersComponent, JoinLobbyComponent],
  imports: [CommonModule, PlayersRoutingModule, ReactiveFormsModule],
})
export class PlayersModule {}
