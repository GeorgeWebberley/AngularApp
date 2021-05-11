import { SetLobby, SetPlayers } from './host.action';
import { GameService } from '../../services/game.service';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

export class HostStateModel {
  players: string[];
  lobbyCode: string;
}

@State<HostStateModel>({
  name: 'host',
  defaults: {
    players: [],
    lobbyCode: undefined,
  },
})
@Injectable()
export class HostState {
  constructor(private gameService: GameService) {}

  @Selector()
  static currentPlayers(state: HostStateModel): any {
    return state.players;
  }

  @Selector()
  static currentLobby(state: HostStateModel): any {
    return state.lobbyCode;
  }

  @Action(SetLobby)
  setLobby(
    { getState, setState }: StateContext<HostStateModel>,
    { code }
  ): any {
    const state = getState();
    setState({ ...state, lobbyCode: code });
  }

  @Action(SetPlayers)
  setPlayers(
    { getState, setState }: StateContext<HostStateModel>,
    { players }
  ): any {
    const state = getState();
    setState({ ...state, players: players });
  }
}
