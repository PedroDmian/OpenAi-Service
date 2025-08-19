export interface IUser {
  id: number;
  thread_id: string | null;
  username: string;
  authorization_level_id: number | null;
  currency_id: number | null;
  name: string;
  lastname: string;
  m_lastname: string;
  fullname: string;
  email: string;
  email_verified_at: string;
  phone: string | null;
  birthdate: string | null;
  avatar: string | null;
  user_ban_id: number | null;
  last_ip: string;
  last_login: string;
  updated_by: number | null;
  created_by: number | null;
  active: number;
  language: string | null;
  phone_verified_at: string | null;
  created_at: string;
  updated_at: string;
  authorization: string;
}
