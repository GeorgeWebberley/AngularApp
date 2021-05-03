import { CreateLobbyComponent } from './create-lobby/create-lobby.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HostComponent } from './host.component';

const routes: Routes = [{ path: '', component: HostComponent }, { path: 'create-lobby', component: CreateLobbyComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostRoutingModule { }
