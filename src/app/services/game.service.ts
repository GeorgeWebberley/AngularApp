import { Question } from './../entities/Question';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
import { Lobby } from '../entities/Lobby';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private db: AngularFireDatabase) {}

  getLobby(id: string): AngularFireList<Lobby> {
    return this.db.list('/lobbies', (ref) =>
      ref.orderByChild('lobbyCode').equalTo(id)
    );
  }

  // Creates a lobby with a lobbyCode, id and current state of the game (currentQuestion)
  // Current question will either be 'loading' or the question being asked at the moment
  createLobby(id: string): any {
    let object = {};
    object['lobbyCode'] = id;
    object['currentQuestion'] = 'loading';
    return this.db
      .list('/lobbies')
      .push(object)
      .then((ref) => {
        this.db.list('/lobbies/' + ref.key).set('id', ref.key);
      });
  }

  async addPlayer(lobbyId: string, playerName: string): Promise<any> {
    let player = {};
    player['name'] = playerName;
    player['score'] = 0;
    return await this.db.list('/lobbies/' + lobbyId + '/players').push(player);
  }

  getPlayers(lobbyId: string): any {
    return this.db.list('/lobbies/' + lobbyId + '/players');
  }

  getQuestions(): any {
    return this.db.list('/questions');
  }

  setCurrentQuestion(lobbyId: string, question: Question | string) {
    return this.db.list('/lobbies/' + lobbyId).set('currentQuestion', question);
  }

  getCurrentQuestion(lobbyId: string): AngularFireObject<Question | string> {
    return this.db.object('/lobbies/' + lobbyId + '/currentQuestion');
  }

  postScore(lobbyId: string, playerId: string, score: number) {
    return this.db
      .object('/lobbies/' + lobbyId + '/players/' + playerId + '/score')
      .query.ref.transaction((playerScore) => {
        return (playerScore += score);
      });
  }

  // async getPlayers(id): Promise<any> {
  //   return await this.getLobby(id)
  //     .valueChanges()
  //     .subscribe((result) => {
  //       if (result.length > 0) {
  //         return result[0].players;
  //       } else {
  //         return [];
  //       }
  //     });
  // }

  // addQuestion(id, question, answers, correctAnswer): any {
  //   let questionObject = {};
  //   questionObject['questionId'] = id;
  //   questionObject['question'] = question;
  //   questionObject['answers'] = answers;
  //   questionObject['correctAnswer'] = correctAnswer;
  //   this.db.list('/questions').push(questionObject);
  // }
}
