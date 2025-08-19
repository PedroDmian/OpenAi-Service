import { Router } from 'express';

import { HealthRepositoryImpl } from '../../infrastructure/repositories/health.repository.impl';
import { HealthController } from '../../infrastructure/controllers/health.controller';

import { HealthCheckService } from '../../application/services/healthCheck.service';
import { ResponseHttpService } from '../../application/services/responseHttp.service';


export const setHealthRoutes = (app: Router) => {
  const healthRepository = new HealthRepositoryImpl();
  const healthCheckService = new HealthCheckService(healthRepository);
  const responseHttpService = new ResponseHttpService();

  const healthController = new HealthController(healthCheckService, responseHttpService);

  app.get('/health', healthController.getHealthCheck.bind(healthController));
};
