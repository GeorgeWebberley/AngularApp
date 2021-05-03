import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-join-lobby',
  templateUrl: './join-lobby.component.html',
  styleUrls: ['./join-lobby.component.scss'],
})
export class JoinLobbyComponent implements OnInit {
  lobbyCodeValid = false;
  displayError = false;

  key: string;

  joinLobbyForm = new FormGroup({
    lobbyCode: new FormControl(''),
    playerName: new FormControl('', Validators.required),
  });

  test: any;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {}

  checkLobby(): void {
    const code = this.joinLobbyForm.value.lobbyCode.toUpperCase();

    let test = this.gameService.getLobby(code);
    console.log('test', test);

    this.gameService
      .getLobby(code)
      .snapshotChanges()
      .subscribe((result) => {
        if (result.length > 0) {
          console.log('CODE FOUND');
          this.displayError = false;
          this.lobbyCodeValid = true;
          this.key = result[0].key;
        } else {
          console.log('ERROR');
          this.displayError = true;
        }
      });
  }

  submit(): void {
    if (this.joinLobbyForm.invalid) {
      return;
    } else if (this.key) {
      this.gameService.addPlayer(
        this.key,
        this.joinLobbyForm.value.playerName.toUpperCase()
      );
    }
  }
}
