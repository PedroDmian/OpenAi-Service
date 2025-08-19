import { Request, Response } from 'express';

import { ChatService } from '../../application/services/chat.service';
import { ResponseHttpService } from '../../application/services/responseHttp.service';

import { BadRequest } from '../../domain/exceptions';
import { IUser } from '../../domain/contracts/IUser';

export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly responseHttpService: ResponseHttpService
  ) {}

  public async message(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as IUser;
      const { messages } = req.body;

      const message = await this.chatService.message(
        messages[messages.length - 1],
        user
      );

      this.responseHttpService.sendSuccess(
        res,
        200,
        'Mensaje enviado correctamente',
        message
      );
    } catch (error: unknown) {
      if (error instanceof BadRequest) {
        this.responseHttpService.sendError(
          res,
          400,
          `${error.message}`,
          {
            message: error.message,
            details: error.details,
          }
        );
      } else {
        this.responseHttpService.sendError(res, 500, 'Error desconocido', {
          message: 'Un error inesperado ocurrió',
        });
      }
    }
  }
}
