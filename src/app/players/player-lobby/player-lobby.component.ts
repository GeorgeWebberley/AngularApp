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
      this.lobbyId = state.lobbyId;
      this.playerName = state.playerName;
      this.playerId = state.playerId;
    });

    this.gameService
      .getCurrentQuestion(this.lobbyId)
      .valueChanges()
      .subscribe((result) => {
        if (result === 'loading') {
          // Question object will either be string 'loading' or the question itself
          this.loading = true;
        } else {
          // Added to account for delay due to animation when showing the answers to the question
          setTimeout(() => {
            this.loading = false;
            this.currentQuestion = result;
            let timeStamp = new Date();
            this.startTime = timeStamp.getTime();
          }, 2500);
        }
      });
  }

  postAnswer(answer: number): void {
    this.loading = true;
    if (this.currentQuestion && answer == this.currentQuestion.correctAnswer) {
      let timeStamp = new Date();
      this.endTime = timeStamp.getTime();
      // User gets 40 points for correct answer, plus a score between 1-10 for the speed of their answer (making total possible score 50)
      // The total time to answer the question from the moment it appears on the screen is 11500ms
      // 11500ms = 0 bonus points -> slowest answer
      // 0ms == 10 bonus points -> fastest answer
      let totalTime = this.endTime - this.startTime;
      // Calculates a score out of 10 based on the users time
      let bonusPoints = Math.round(10 - (10 * totalTime) / 11500);

      // Add 40 for a correct answer
      let score = 40 + bonusPoints;
      this.gameService.postScore(this.lobbyId, this.playerId, score);
    }
  }
}
