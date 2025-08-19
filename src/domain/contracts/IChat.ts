export interface IChat {
  content: string;
  role: 'user' | 'assistant' | 'system';
  created_at: string;
  typeFormat: 'text' | 'image' | 'audio' | 'video' | 'file';
  uri?: string;
}
