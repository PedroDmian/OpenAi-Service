import { HealthRepository } from '../../domain/repositories/health.repository';
import { IHealthStatus } from '../../domain/contracts/IHealthStatus';

export class HealthCheckService {
  private healthRepository: HealthRepository;

  constructor(healthRepository: HealthRepository) {
    this.healthRepository = healthRepository;
  }

  public async checkHealth(): Promise<IHealthStatus> {
    return await this.healthRepository.checkHealth();
  }
}
