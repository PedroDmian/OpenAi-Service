import axios from 'axios';

import { HttpClientRepository } from '../../domain/repositories/httpClient.repository';

export class HttpClientRepositoryImpl implements HttpClientRepository {
  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await axios.get<T>(url, { ...params });

    return response.data;
  }

  async post<T>(
    url: string,
    data?: Record<string, any>,
    config?: Record<string, any>
  ): Promise<T> {
    const response = await axios.post<T>(url, data, config);

    return response.data;
  }
}
