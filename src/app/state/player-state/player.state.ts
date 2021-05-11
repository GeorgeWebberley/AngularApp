import { SetLobby, SetPlayer } from './player.action';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

export class PlayerStateModel {
  playerName: string;
  lobbyCode: string;
}

@State<PlayerStateModel>({
  name: 'player',
  defaults: {
    playerName: undefined,
    lobbyCode: undefined,
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
    { code }
  ): any {
    const state = getState();
    setState({ ...state, lobbyCode: code });
  }

  @Action(SetPlayer)
  setPlayer(
    { getState, setState }: StateContext<PlayerStateModel>,
    { name }
  ): any {
    const state = getState();
    setState({ ...state, playerName: name });
  }
}
