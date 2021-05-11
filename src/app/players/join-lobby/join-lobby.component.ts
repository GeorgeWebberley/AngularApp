import { SetLobby } from '../../state/player-state/player.action';
import { SetPlayer } from '../../state/player-state/player.action';
import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

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

  constructor(
    private gameService: GameService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    // this.addQuestion();
  }

  // addQuestion(): void {
  //   this.gameService.addQuestion(
  //     1,
  //     'How old is will?',
  //     [
  //       { answerId: 1, answer: 4 },
  //       { answerId: 2, answer: 30 },
  //       { answerId: 3, answer: 32 },
  //       { answerId: 4, answer: 40 },
  //     ],
  //     3
  //   );
  //   this.gameService.addQuestion(
  //     2,
  //     'What was the name of the gay bar that will worked in when a student in cardiff?',
  //     [
  //       { answerId: 1, answer: 'Pulse' },
  //       { answerId: 2, answer: 'Pound' },
  //       { answerId: 3, answer: 'Thrust' },
  //       { answerId: 4, answer: 'OMG' },
  //     ],
  //     1
  //   );
  //   this.gameService.addQuestion(
  //     3,
  //     'What is my name?',
  //     [
  //       { answerId: 1, answer: 'Kia' },
  //       { answerId: 2, answer: 'George' },
  //       { answerId: 3, answer: 'Cleo' },
  //       { answerId: 4, answer: 'Louie' },
  //     ],
  //     2
  //   );
  // }

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
      this.gameService.addPlayer(this.key, this.playerName);

      // Set the player state
      this.store.dispatch(new SetPlayer(this.playerName));
      this.store.dispatch(new SetLobby(this.code));

      this.router.navigate(['/game/' + this.code, this.playerName]);
    }
  }
}
