import { IUser } from '../contracts/IUser';
import { IModule } from '../contracts/IModule';
import { ICatalog } from '../contracts/ICatalog';

export interface ToolGatewayRepository {
  getModulesAndPermissions(user: IUser): Promise<IModule[]>;
  actionFunction(entityArguments: any, user: IUser): Promise<any>;
  getCatalogs(entityArguments: any, user: IUser): Promise<ICatalog>;
  getThreadByUser(user: IUser): Promise<string>;
  setThreadByUser(thredId: string, user: IUser): Promise<void>;
  getUserInfo(user: Partial<IUser>): Promise<IUser>;
}
