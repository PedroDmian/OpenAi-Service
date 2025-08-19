import { User } from '@domain/entities/user.entity';

describe('User Entity', () => {
  it('Create New User', () => {
    const user = new User({
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
      authorization: '234'
    });

    const root = user.root();

    expect(root.name).toBe('superadmin');
    expect(root.email).toBe('superadmin@teknik.mx');
  });
});
