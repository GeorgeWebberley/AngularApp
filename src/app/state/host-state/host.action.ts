export class SetPlayers {
  static readonly type = 'SetPlayers';
  constructor(public players: any[]) {}
}

export class SetLobby {
  static readonly type = 'SetLobby';
  constructor(public code: string) {}
}
