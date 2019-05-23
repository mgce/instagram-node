import { ServiceError as grpcServiceError, status } from 'grpc';
import { logger } from '../utils/logger';

/**
 * https://grpc.io/grpc/node/grpc.html#~ServiceError__anchor
 */
export class GrpcError implements grpcServiceError {
  public name: string = 'ServiceError';

  constructor(public code: status, public message: any) {}
}

export function grpcError(code: status, message: any): grpcServiceError {
  logger.warning("Error in grpc serice: " + message);
  return {
    name: 'ServiceError',
    code,
    message
  };
}
