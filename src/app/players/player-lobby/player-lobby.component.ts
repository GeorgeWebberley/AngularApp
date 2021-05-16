import { Question } from '../../entities/Question';
import { GameService } from '../../services/game.service';
import { PlayerState } from '../../state/player-state/player.state';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-player-lobby',
  templateUrl: './player-lobby.component.html',
  styleUrls: ['./player-lobby.component.scss'],
})

// Container component for when the player is in the game and ready to answer questions.
// Will load either a loading screen, the question screen or the results screen
export class PlayerLobbyComponent implements OnInit {
  lobbyCode: string;
  lobbyId: string;
  playerName: string;
  playerId: string;

  loading: boolean;
  currentQuestion: any;

  startTime: any;
  endTime: any;

  @Select(PlayerState) playerState: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService
  ) {
    // A check to ensure the user is in the correct lobby. If they try to enter a different lobby, then they will be navigated back to the main screen
    this.route.params.subscribe((params) => {
      this.lobbyCode = params.id;
    });
  }

  ngOnInit(): void {
    this.playerState.subscribe((state) => {
      if (state.lobbyCode != this.lobbyCode) {
        this.router.navigate(['/players/join-lobby']);
      }
      console.log(state, 'state');

      this.lobbyId = state.lobbyId;
      this.playerName = state.playerName;
      this.playerId = state.playerId;
    });

    this.gameService
      .getCurrentQuestion(this.lobbyId)
      .valueChanges()
      .subscribe((result) => {
        if (result === 'loading') {
          this.loading = true;
        } else {
          this.loading = false;
          this.currentQuestion = result;
          let timeStamp = new Date();
          this.startTime = timeStamp.getTime();
        }
      });
  }

  postAnswer(answer: number): void {
    this.loading = true;
    if (this.currentQuestion && answer == this.currentQuestion.correctAnswer) {
      let timeStamp = new Date();
      this.endTime = timeStamp.getTime();

      // To update this when calculate score based on time
      let score = 1;

      this.gameService.postScore(this.lobbyId, this.playerId, score);
    }
  }

  getScore(): number {
    return 1;
  }
}
