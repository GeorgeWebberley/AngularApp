import { Router } from '@angular/router';
import { SetLobby, SetPlayers } from './../../state/host-state/host.action';
import { Player } from './../../entities/Player';
import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-create-lobby',
  templateUrl: './create-lobby.component.html',
  styleUrls: ['./create-lobby.component.scss'],
  animations: [
    trigger('nameEnter', [
      transition(':enter', [
        animate(
          '1s cubic-bezier(0.250, 0.460, 0.450, 0.940)',
          keyframes([
            style({ transform: 'rotate(-360deg)', opacity: 0 }),
            style({ transform: 'rotate({{rotate}})', opacity: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class CreateLobbyComponent implements OnInit {
  lobbyCode: string;
  lobbyId: string;
  players: Player[];
  error = false;
  backgroundSong: any;
  beep: any;

  playerArray = [];

  constructor(
    private gameService: GameService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.backgroundSong = new Audio();
    this.backgroundSong.src = 'assets/sounds/jazz.mp3';
    this.backgroundSong.loop = true;
    this.backgroundSong.play();

    this.lobbyCode = this.generateCode();
    this.gameService.createLobby(this.lobbyCode).then(
      this.gameService
        .getLobby(this.lobbyCode)
        .valueChanges()
        .subscribe((result) => {
          if (result.length > 0) {
            this.lobbyId = result[0].id;
            this.players = result[0].players;
            if (this.players) {
              Object.values(this.players).forEach((player) => {
                if (
                  !this.playerArray.some(
                    (existingPlayer) => existingPlayer.name === player.name
                  )
                ) {
                  // Play a random sound (from beep1 to beep7) when a new player is added
                  this.beep = new Audio();
                  const randomInteger = Math.floor(Math.random() * 7) + 1 // there are 6 possible beep sounds
                  this.beep.src = 'assets/sounds/beep' + randomInteger + '.wav';
                  this.beep.play();
                  // Create a player object that contains the name, score and the CSS for loading on the page
                  let playerObject = {};
                  // Css position
                  playerObject['left'] = this.getCSSPosition();
                  playerObject['top'] = this.getCSSPosition();
                  playerObject['rotation'] = this.getCSSRotation();
                  playerObject['color'] = this.getRandomColor();
                  playerObject['score'] = 0;
                  playerObject['name'] = player.name;
                  this.playerArray.push(playerObject);
                  this.error = false;
                }
              });
            }
          } else {
            console.log('ERROR');
          }
        })
    );
  }

  // Randomly generates a number between 0-99 (but not including 40-60 which is reserved for the central text/button)
  getCSSPosition(): number {
    let firstPosition = Math.floor(Math.random() * 2);

    // Then calculate the position (between 1-40)
    let position = Math.floor(Math.random() * 40);
    if (firstPosition == 0) {
      position += 60;
    }
    return position;
  }

  getCSSRotation(): number {
    let firstPosition = Math.floor(Math.random() * 2);

    // Then calculate the how far to rotate (between 1-30 degrees)
    let position = Math.floor(Math.random() * 30);
    if (firstPosition == 0) {
      position = position * -1;
    }
    return position;
  }

  getRandomColor(): string {
    return (
      'hsl(' +
      360 * Math.random() +
      ',' +
      '100%,' +
      (60 + 10 * Math.random()) +
      '%)'
    );
  }

  styleObject(player: any): Object {
    console.log(player);

    return {
      top: player.top + '%',
      left: player.left + '%',
      transform: 'rotate(' + player.rotation + 'deg)',
      color: player.color,
    };
  }

  generateCode(): string {
    const length = 4;
    const result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    return result.join('');
  }

  startGame(): void {
    let array = this.playerArray.map((player) => {
      return { name: player['name'], score: player['score'] };
    });
    if (array.length == 0) {
      this.error = true;
      return;
    }
    this.backgroundSong.pause();
    this.store.dispatch(new SetPlayers(array));
    this.store.dispatch(new SetLobby(this.lobbyCode, this.lobbyId));
    this.router.navigate(['/host/quiz-lobby']);
  }
}
