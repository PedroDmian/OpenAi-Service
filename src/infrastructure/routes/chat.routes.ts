import { Router } from 'express';

import { HttpClientRepositoryImpl } from '../../infrastructure/repositories/httpClient.repository.impl';
import { EryRepositoryImpl } from '../../infrastructure/repositories/ery.repository.impl';

import { ChatRepositoryImpl } from '../../infrastructure/repositories/openai/chat.repository.impl';
import { ChatController } from '../../infrastructure/controllers/chat.controller';

import { ChatService } from '../../application/services/chat.service';
import { ResponseHttpService } from '../../application/services/responseHttp.service';

import { AuthenticationMiddlewares } from '../middlewares/authentication.middleware';

export const setChatRoutes = (app: Router) => {
  const httpClientRepository = new HttpClientRepositoryImpl();
  const eryRepository = new EryRepositoryImpl(httpClientRepository);
  const chatRepository = new ChatRepositoryImpl(eryRepository);

  const chatService = new ChatService(chatRepository, eryRepository);
  const responseHttpService = new ResponseHttpService();

  const chatController = new ChatController(chatService, responseHttpService);

  const middlewares = new AuthenticationMiddlewares(
    eryRepository,
    responseHttpService
  );

  app.post('/chat', middlewares.authentication, chatController.message.bind(chatController));
};
