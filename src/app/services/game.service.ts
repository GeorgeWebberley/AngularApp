import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private db: AngularFireDatabase) {}

  getLobby(id: string): any {
    return this.db.list('/lobbies', (ref) =>
      ref.orderByChild('lobbyCode').equalTo(id)
    );
  }

  createLobby(id: string): any {
    let object = {};
    object['lobbyCode'] = id;
    return this.db
      .list('/lobbies')
      .push(object)
      .then((ref) => {
        this.db.list('/lobbies/' + ref.key).set('id', ref.key);
      });
  }

  addPlayer(lobbyId: string, playerName: string): any {
    let player = {};
    player['name'] = playerName;
    player['score'] = 0;
    return this.db.list('/lobbies/' + lobbyId + '/players').push(player);
  }

  getQuestions(): any {
    return this.db.list('/questions');
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
