import { PlayerState } from './../../state/player-state/player.state';
import { HostState } from './../../state/host-state/host.state';
import { environment } from './../../../environments/environment.prod';
import { AngularFireModule } from '@angular/fire';
import { RouterModule } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerLobbyComponent } from './player-lobby.component';
import { NgxsModule } from '@ngxs/store';

describe('PlayerLobbyComponent', () => {
  let component: PlayerLobbyComponent;
  let fixture: ComponentFixture<PlayerLobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerLobbyComponent],
      imports: [
        RouterModule.forRoot([]),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        NgxsModule.forRoot([HostState, PlayerState], {
          developmentMode: !environment.production,
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
