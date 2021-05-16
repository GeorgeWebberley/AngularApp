import { PlayerLobbyComponent } from './player-lobby/player-lobby.component';
import { JoinLobbyComponent } from './join-lobby/join-lobby.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayersComponent } from './players.component';

const routes: Routes = [
  { path: '', component: PlayersComponent },
  { path: 'join-lobby', component: JoinLobbyComponent },
  { path: 'lobby/:id', component: PlayerLobbyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayersRoutingModule {}
