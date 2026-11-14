import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';

export interface StandardResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
  meta: {
    requestId: string;
    timestamp: string;
  };
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, StandardResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<StandardResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();
    const statusCode = response.statusCode;

    const requestId =
      (request.headers['x-request-id'] as string) ||
      `req_${Math.random().toString(36).substring(2, 10)}`;

    return next.handle().pipe(
      map((resData) => {
        // If response already has custom structure (like pagination or custom envelope)
        if (resData && resData.__isEnvelope) {
          delete resData.__isEnvelope;
          return {
            ...resData,
            meta: {
              requestId,
              timestamp: new Date().toISOString(),
              ...(resData.meta || {})
            }
          };
        }

        return {
          success: true,
          statusCode,
          data: resData,
          meta: {
            requestId,
            timestamp: new Date().toISOString()
          }
        };
      })
    );
  }
}

