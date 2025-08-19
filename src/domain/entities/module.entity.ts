import { IModule } from '../contracts/IModule';

export class Module {
  private entityRoot: IModule;

  constructor(entity: IModule) {
    this.entityRoot = entity;
  }

  public root(): IModule {
    return this.entityRoot;
  }
}
