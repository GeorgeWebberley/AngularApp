import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-join-lobby',
  templateUrl: './join-lobby.component.html',
  styleUrls: ['./join-lobby.component.scss'],
})
export class JoinLobbyComponent implements OnInit {
  lobbyCodeValid: false;

  joinLobbyForm = new FormGroup({
    lobbyCode: new FormControl(''),
    playerName: new FormControl(''),
  });

  test: any;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.test = this.gameService
      .getLobby('KKGL')
      .valueChanges()
      .subscribe((action) => {
        console.log('action', action);
      });
  }

  checkLobby(value): boolean {
    return false;
  }

  onSubmit(): boolean {
    return false;
  }
}
