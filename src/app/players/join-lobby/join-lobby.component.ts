import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-lobby',
  templateUrl: './join-lobby.component.html',
  styleUrls: ['./join-lobby.component.scss'],
})
export class JoinLobbyComponent implements OnInit {
  lobbyCodeValid = false;
  displayError = false;

  key: string;
  code: string;
  playerName: string;

  joinLobbyForm = new FormGroup({
    lobbyCode: new FormControl(''),
    playerName: new FormControl('', Validators.required),
  });

  test: any;

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {}

  checkLobby(): void {
    this.code = this.joinLobbyForm.value.lobbyCode.toUpperCase();

    let test = this.gameService.getLobby(this.code);
    console.log('test', test);

    this.gameService
      .getLobby(this.code)
      .snapshotChanges()
      .subscribe((result) => {
        if (result.length > 0) {
          this.displayError = false;
          this.lobbyCodeValid = true;
          this.key = result[0].key;
        } else {
          this.displayError = true;
        }
      });
  }

  submit(): void {
    if (this.joinLobbyForm.invalid) {
      return;
    } else if (this.key) {
      this.playerName = this.joinLobbyForm.value.playerName.toUpperCase();
      this.gameService.addPlayer(
        this.key,
        this.playerName
      );

      this.router.navigate(['/game/' + this.code, this.playerName])
    }
  }
}
