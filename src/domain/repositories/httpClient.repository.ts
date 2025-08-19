export interface HttpClientRepository {
  get<T>(url: string, params?: Record<string, any>): Promise<T>;
  post<T>(
    url: string,
    data?: Record<string, any>,
    config?: Record<string, any>
  ): Promise<T>;
}
