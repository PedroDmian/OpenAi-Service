import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        [key: string]: any;
        authorization: string;
      };
    }
  }
}

import { ToolGatewayRepository } from '../../domain/repositories/toolGateway.repository';
import { BadRequest, Authentication } from '../../domain/exceptions';
import { ResponseHttpService } from '../../application/services/responseHttp.service';

export class AuthenticationMiddlewares {
  constructor(
    private readonly toolGatewayRepository: ToolGatewayRepository,
    private readonly responseHttpService: ResponseHttpService
  ) { }

  public authentication = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let token = req.headers['authorization'];

      if (!token || !token.startsWith('Bearer ')) {
        throw new Authentication('Invalid token format or missing token');
      }

      token = token.slice(7);

      const user = await this.toolGatewayRepository.getUserInfo({
        authorization: token,
      });

      if (!user) {
        throw new Authentication('User info could not be retrieved');
      }

      req.user = {
        ...user,
        authorization: token,
      };

      next();
    } catch (error: any) {
      if (error instanceof Authentication) {
        return this.responseHttpService.sendError(res, 401, 'Unauthorized', {
          message: error.message,
          details: error.details,
        });
      } else {
        this.responseHttpService.sendError(res, 401, `${error?.message}`, {
          message: 'Internal Server Error',
          details: error,
        });
      }
    }
  };
}
