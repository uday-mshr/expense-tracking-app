import { Request, Response } from 'express';
import { ApiController, Get, ApiOperation, ApiResponse } from '../utils/swagger.decorators';

@ApiController('/health', ['System'])
export class HealthController {
  @Get('/')
  @ApiOperation({
    summary: 'Health check',
    description: 'Check if the API is running'
  })
  @ApiResponse({
    statusCode: '200',
    description: 'Service is healthy',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        timestamp: { type: 'string' },
        uptime: { type: 'number' }
      }
    }
  })
  async health(_req: Request, res: Response) {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  }
}

export default HealthController;
