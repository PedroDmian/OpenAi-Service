import { IChat } from '../contracts/IChat';

export class Chat {
  private entityRoot: IChat;

  constructor(entity: IChat) {
    this.entityRoot = entity;
  }

  public root(): IChat {
    return this.entityRoot;
  }
}
