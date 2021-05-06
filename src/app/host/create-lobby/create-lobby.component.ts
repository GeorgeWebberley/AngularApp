import { Player } from './../../entities/Player';
import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-lobby',
  templateUrl: './create-lobby.component.html',
  styleUrls: ['./create-lobby.component.scss'],
})
export class CreateLobbyComponent implements OnInit {
  lobbyCode: string;
  players: Player[];

  playerArray = [];

  // bottomLeft = 0;
  // bottomRight = 0;
  // topRight = 0;
  // topLeft = 0;
  // rotateLeft = 0;
  // rotateRight = 0;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.lobbyCode = this.generateCode();
    this.gameService.createLobby(this.lobbyCode).then(
      this.gameService
        .getLobby(this.lobbyCode)
        .valueChanges()
        .subscribe((result) => {
          if (result.length > 0) {
            this.players = result[0].players;
            if (this.players) {
              Object.values(this.players).forEach((player) => {
                if (
                  !this.playerArray.some(
                    (existingPlayer) => existingPlayer.name === player.name
                  )
                ) {
                  let playerObject = {};
                  // Css position
                  playerObject['left'] = this.getCSSPosition();
                  playerObject['top'] = this.getCSSPosition();
                  playerObject['rotation'] = this.getCSSRotation();
                  playerObject['score'] = 0;
                  playerObject['name'] = player.name;
                  this.playerArray.push(playerObject);
                }
              });
              console.log(this.playerArray);
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

  styleObject(player: any): Object {
    return {
      top: player.top + '%',
      left: player.left + '%',
      transform: 'rotate(' + player.rotation + 'deg)',
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
}
