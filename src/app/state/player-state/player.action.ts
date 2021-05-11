export class SetPlayer {
  static readonly type = 'SetPlayer';
  constructor(public name: string) {}
}

export class SetLobby {
  static readonly type = 'SetLobby';
  constructor(public code: string) {}
}
