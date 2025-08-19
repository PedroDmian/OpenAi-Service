import { HealthRepository } from '../../domain/repositories/health.repository';
import { IHealthStatus } from '../../domain/contracts/IHealthStatus';

export class HealthRepositoryImpl implements HealthRepository {
  public async checkHealth(): Promise<IHealthStatus> {
    return {
      status: 'ok',
      timestamp: new Date(),
    };
  }
}
