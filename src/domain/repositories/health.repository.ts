import { IHealthStatus } from '../../domain/contracts/IHealthStatus';

export interface HealthRepository {
  checkHealth(): Promise<IHealthStatus>;
}
