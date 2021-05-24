import { PlayerLobbyComponent } from './player-lobby/player-lobby.component';
import { JoinLobbyComponent } from './join-lobby/join-lobby.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'join-lobby', component: JoinLobbyComponent },
  { path: 'lobby/:id', component: PlayerLobbyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayersRoutingModule {}
