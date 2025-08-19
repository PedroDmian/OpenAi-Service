import { Request, Response } from 'express';

import { HealthCheckService } from '../../application/services/healthCheck.service';
import { ResponseHttpService } from '../../application/services/responseHttp.service';

import {
  BadRequest
} from '../../domain/exceptions';

export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly responseHttpService: ResponseHttpService
  ) { }

  public async getHealthCheck(req: Request, res: Response): Promise<void> {
    try {
      const healthStatus = await this.healthCheckService.checkHealth();

      this.responseHttpService.sendSuccess(
        res,
        200,
        `Estado de salud verificado correctamente`,
        healthStatus
      );
    } catch (error: unknown) {
      if (error instanceof BadRequest) {
        this.responseHttpService.sendError(
          res,
          400,
          'Error al verificar el estado de salud',
          {
            message: error.message,
            details: error.details,
          }
        );
      } else {
        this.responseHttpService.sendError(res, 500, 'Error desconocido', {
          message: 'Un error inesperado ocurrió',
        });
      }
    }
  }
}
