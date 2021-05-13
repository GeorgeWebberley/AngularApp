export class SetPlayers {
  static readonly type = 'SetPlayers';
  constructor(public players: any[]) {}
}

export class GetPlayers {
  static readonly type = 'SetPlayers';
  constructor(public lobbyId: string) {}
}

export class SetLobby {
  static readonly type = 'SetLobby';
  constructor(public code: string, public id: string) {}
}
