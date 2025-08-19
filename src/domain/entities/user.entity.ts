import { IUser } from '../contracts/IUser';

export class User {
  private entityRoot: IUser;

  constructor(entity: IUser) {
    this.entityRoot = entity;
  }

  public root(): IUser {
    return this.entityRoot;
  }
}
