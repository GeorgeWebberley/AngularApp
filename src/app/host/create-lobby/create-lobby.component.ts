import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-lobby',
  templateUrl: './create-lobby.component.html',
  styleUrls: ['./create-lobby.component.scss']
})
export class CreateLobbyComponent implements OnInit {

  lobbyCode: string;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.lobbyCode = this.generateCode();
    this.gameService.createLobby(this.lobbyCode);
  }

  generateCode(): string {
    const length = 4;
    const result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   return result.join('');
  }

}
