import { Request, Response } from 'express';
import { ChatController } from '@infrastructure/controllers/chat.controller';
import { ChatService } from '@application/services/chat.service';
import { ResponseHttpService } from '@application/services/responseHttp.service';
import { BadRequest } from '@domain/exceptions';
import { IUser } from '@domain/contracts/IUser';

describe('ChatController', () => {
  let chatController: ChatController;
  let chatService: jest.Mocked<ChatService>;
  let responseHttpService: jest.Mocked<ResponseHttpService>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    chatService = {
      message: jest.fn(),
    } as unknown as jest.Mocked<ChatService>;

    responseHttpService = {
      sendSuccess: jest.fn(),
      sendError: jest.fn(),
    } as unknown as jest.Mocked<ResponseHttpService>;

    chatController = new ChatController(chatService, responseHttpService);

    req = {
      body: {
        messages: [
          {
            content: 'Que modulos tengo disponibles?',
            role: 'user',
          },
        ],
      },
      user: {
        id: 1,
        thread_id: 'thread_FwrZ7l2Hrh8Y4ZqnZ4hWhjT0',
        username: 'superadmintk',
        authorization_level_id: null,
        currency_id: null,
        name: 'superadmin',
        lastname: 'tk',
        m_lastname: '',
        fullname: '',
        email: 'superadmin@teknik.mx',
        email_verified_at: '2025-04-27T20:57:09.000000Z',
        phone: null,
        birthdate: null,
        avatar: null,
        user_ban_id: null,
        last_ip: '127.0.0.1',
        last_login: '2025-04-27 18:29:07',
        updated_by: null,
        created_by: null,
        active: 1,
        language: null,
        phone_verified_at: null,
        created_at: '2025-04-27T20:57:09.000000Z',
        updated_at: '2025-04-28T06:09:09.000000Z',
        authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNTViOWNlZjQyZmQ4MDI2NTBhYWY1YzZlZjI3YjIxM2QyMjg3YzQ0ZTlkMThkNzNhYjQwMmJkNjU1ZTUzNzAxYTFkYWZlMjZiYzliNjIzZGIiLCJpYXQiOjE3NDU4MDA0ODIuNjE4NDAxLCJuYmYiOjE3NDU4MDA0ODIuNjE4NDA0LCJleHAiOjE3NzczMzY0ODIuNTkzOTE1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.AT30ASuEe0bymvwfLwyxsonBpMUSehj4uqZ5Bb__v0BcXM65E9tLpyx23zmRteHltbgPyirf3pi0zlvOCsg-D5tkhL0gpxLiN2chMuB0JzCHWx3II229YxVECBbSxJi5oTjGpyfrAyaor4pypzfBoevQct_n8BCQXOBLyqRNo3v0rzh5MEUIbfqvolbic07b4pj5oxeHHkgGgwp8Vlb2xk9oolmxxzWowNaVxxVCTsykGJl-6Hyqrx-X7PLwFD_eRK1I-HdYX-H1EUq9M18eBbjpFFE4NuilzZ4tzInvLtUeAoflohlCJ7mpclelOWGuxGAENHiTZurHztAd3R4GqYvSM3_i1PjyP2jHHQzah4Txj_lUeak_-UYp8T5at4s3YP_vLVN-w1nl2dq0IzeIyj1Z2HDiyjT7rNhOPH41LPAyobmFth2wepIm5AnD7Nr00uMrP-sMmzLR8h3nFKrAHSmwBrVCn_4HN_HgmbjL0BPBuy5asjsuQjbj201FsBPqgDWg3sv6x8ZtXaMJDdVNfwSRCqvZCdDb1okKimPeP6645XsI9HV1x8AHMKA1Ztti_fnEVArVbyneoz7_uJ5yRXe5IyTvDSw6slBp0pDg9gYZHUaXXmyBY5lZyZ5HTeBZ192gvZFq58nR3rF_qwYTuz9xF5wDvACoW4QC08VMbiI',
      } as IUser,
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should send success response when message is processed successfully', async () => {
    const mockMessageResponse = { content: 'Hola' };
    chatService.message.mockResolvedValue(mockMessageResponse);

    await chatController.message(req as Request, res as Response);

    expect(responseHttpService.sendSuccess).toHaveBeenCalledWith(
      res,
      200,
      'Mensaje enviado correctamente',
      mockMessageResponse
    );
  });
});
