import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private db: AngularFireDatabase) {}

  getLobby(id): any {
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

  // createPlayer(name: string): any {
  //   let object = {};
  //   object['name'] = name;
  //   object['score'] = 0;
  //   return this.db.list('/players').push(object);
  // }

  addPlayer(lobbyId, playerName): any {
    let player = {};
    player['name'] = playerName;
    player['score'] = 0;
    return this.db.list('/lobbies/' + lobbyId + '/players').push(player);
  }
}
