import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HostRoutingModule } from './host-routing.module';
import { HostComponent } from './host.component';
import { CreateLobbyComponent } from './create-lobby/create-lobby.component';


@NgModule({
  declarations: [HostComponent, CreateLobbyComponent],
  imports: [
    CommonModule,
    HostRoutingModule
  ]
})
export class HostModule { }
