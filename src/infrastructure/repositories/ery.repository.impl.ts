import { appConfig } from '../../shared/config/app.config';

import { ToolGatewayRepository } from '../../domain/repositories/toolGateway.repository';
import { HttpClientRepository } from '../../domain/repositories/httpClient.repository';

import { IModule } from '../../domain/contracts/IModule';
import { IUser } from '../../domain/contracts/IUser';
import { ICatalog } from '../../domain/contracts/ICatalog';

export class EryRepositoryImpl implements ToolGatewayRepository {
  private readonly baseUrl: string;

  constructor(private httpClientRepository: HttpClientRepository) {
    this.baseUrl = appConfig.API_REQUEST;
  }

  public async getUserInfo(user: IUser): Promise<IUser> {
    const userInfo = await this.httpClientRepository.get<IUser>(
      `${this.baseUrl}/api/user/info`,
      {
        headers: {
          Authorization: `Bearer ${user.authorization}`,
        },
      }
    );

    return userInfo;
  }

  public async getModulesAndPermissions(user: IUser): Promise<IModule[]> {
    const getModules = (
      await this.httpClientRepository.get<IModule[]>(
        `
      ${this.baseUrl}/api/ai/user/modules
    `,
        {
          headers: {
            Authorization: `Bearer ${user.authorization}`,
          },
        }
      )
    );

    return getModules;
  }

  public async actionFunction(
    entityArguments: any,
    user: IUser
  ): Promise<any> {
    try {
      const actionFunction = await this.httpClientRepository.post<any>(
        `${this.baseUrl}/api/ai/chat/action`,
        {
          body: entityArguments,
        },
        {
          headers: {
            Authorization: `Bearer ${user.authorization}`,
          },
        }
      );

      return actionFunction;
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
      }
    }
  }

  public async getCatalogs(
    entityArguments: any,
    user: IUser
  ): Promise<ICatalog> {
    try {
      const catalogs = await this.httpClientRepository.post<any>(
        `${this.baseUrl}/api/ai/chat/catalogs`,
        {
          body: entityArguments,
        },
        {
          headers: {
            Authorization: `Bearer ${user.authorization}`,
          },
        }
      );
      return catalogs;
    } catch (error: any) {
      return {
        data: [],
        msg: error.message,
      }
    }
  }

  public async getThreadByUser(user: IUser): Promise<string> {
    const getThreadByUser = (
      await this.httpClientRepository.get<{ thread_id: string }>(
        `
      ${this.baseUrl}/api/ai/user/thread
    `,
        {
          headers: {
            Authorization: `Bearer ${user.authorization}`,
          },
        }
      )
    ).thread_id;

    return getThreadByUser;
  }

  public setThreadByUser(threadId: string, user: IUser): Promise<void> {
    return this.httpClientRepository.post<void>(
      `${this.baseUrl}/api/ai/user/thread`,
      {
        thread_id: threadId,
      },
      {
        headers: {
          Authorization: `Bearer ${user.authorization}`,
        },
      }
    );
  }
}
