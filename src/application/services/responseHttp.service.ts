import { Response } from 'express';

import { IResponseData } from '../../domain/contracts/IResponseHttp';

export class ResponseHttpService {
  public sendSuccess<T>(
    res: Response,
    code: number,
    message: string,
    data?: T
  ): void {
    const response: IResponseData<T> = {
      status: 'success',
      code,
      message,
      data,
    };

    res.status(code).json(response);
  }

  public sendError(
    res: Response,
    code: number,
    message: string,
    error: { message: string; details?: any[] }
  ): void {
    const response: IResponseData<null> = {
      status: 'error',
      code,
      message,
      error,
    };

    res.status(code).json(response);
  }
}
