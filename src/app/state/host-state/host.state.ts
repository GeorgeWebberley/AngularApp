import { GameService } from './../../services/game.service';
import { SetLobby, SetPlayers, GetPlayers } from './host.action';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

export class HostStateModel {
  players: string[];
  lobbyCode: string;
  lobbyId: string;
}

@State<HostStateModel>({
  name: 'host',
  defaults: {
    players: [],
    lobbyCode: undefined,
    lobbyId: undefined,
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
    { code, id }
  ): any {
    const state = getState();
    setState({ ...state, lobbyCode: code, lobbyId: id });
  }

  @Action(SetPlayers)
  setPlayers(
    { getState, setState }: StateContext<HostStateModel>,
    { players }
  ): any {
    const state = getState();
    setState({ ...state, players: players });
  }

  // @Action(GetPlayers)
  // getPlayers(
  //   { getState, setState }: StateContext<HostStateModel>,
  //   { lobbyId }
  // ): any {
  //   return this.gameService.getPlayers(lobbyId).then((result) => {
  //     result.subscribe((value) => {
  //       console.log('value', value);
  //     });
  //     console.log('result', result);

  //     const state = getState();
  //     setState({ ...state, players: result });
  //   });
  // }
}
