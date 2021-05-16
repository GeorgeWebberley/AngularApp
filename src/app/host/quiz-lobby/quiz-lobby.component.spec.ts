import { PlayerState } from './../../state/player-state/player.state';
import { HostState } from './../../state/host-state/host.state';
import { environment } from './../../../environments/environment.prod';
import { AngularFireModule } from '@angular/fire';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizLobbyComponent } from './quiz-lobby.component';
import { NgxsModule } from '@ngxs/store';

describe('QuizLobbyComponent', () => {
  let component: QuizLobbyComponent;
  let fixture: ComponentFixture<QuizLobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizLobbyComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        NgxsModule.forRoot([HostState, PlayerState], {
          developmentMode: !environment.production,
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
