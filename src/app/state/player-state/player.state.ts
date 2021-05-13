import { SetLobby, SetPlayer } from './player.action';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

export class PlayerStateModel {
  playerName: string;
  playerId: string;
  lobbyCode: string;
  lobbyId: string;
}

@State<PlayerStateModel>({
  name: 'player',
  defaults: {
    playerName: undefined,
    playerId: undefined,
    lobbyCode: undefined,
    lobbyId: undefined,
  },
})
@Injectable()
export class PlayerState {
  constructor() {}

  @Selector()
  static currentPlayer(state: PlayerStateModel): any {
    return state.playerName;
  }

  @Selector()
  static currentLobby(state: PlayerStateModel): any {
    return state.lobbyCode;
  }

  @Action(SetLobby)
  setLobby(
    { getState, setState }: StateContext<PlayerStateModel>,
    { code, id }
  ): any {
    const state = getState();
    setState({ ...state, lobbyCode: code, lobbyId: id });
  }

  @Action(SetPlayer)
  setPlayer(
    { getState, setState }: StateContext<PlayerStateModel>,
    { name, id }
  ): any {
    const state = getState();
    setState({ ...state, playerName: name, playerId: id });
  }
}
