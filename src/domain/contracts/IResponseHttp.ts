export interface IResponseData<T> {
  status: 'success' | 'error';
  code: number;
  message: string;
  data?: T;
  error?: {
    message: string;
    details?: any[];
  };
}
