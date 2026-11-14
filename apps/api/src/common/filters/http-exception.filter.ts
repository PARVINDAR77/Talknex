import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    let message = 'Internal server error';
    let errors: any = undefined;

    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const resObj = exceptionResponse as Record<string, any>;
      message = resObj.message || message;
      if (Array.isArray(resObj.message)) {
        errors = resObj.message.map((msg: string) => ({ message: msg }));
        message = resObj.message.join(', ');
      } else if (resObj.errors) {
        errors = resObj.errors;
      }
    } else if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const requestId =
      (request.headers['x-request-id'] as string) ||
      `req_${Math.random().toString(36).substring(2, 10)}`;

    this.logger.error(
      `[${requestId}] ${request.method} ${request.url} - Status ${status} - Error: ${message}`,
      exception instanceof Error ? exception.stack : undefined
    );

    response.status(status).json({
      success: false,
      statusCode: status,
      error:
        exception instanceof HttpException
          ? exception.name
          : 'InternalServerError',
      message,
      ...(errors ? { errors } : {}),
      meta: {
        requestId,
        timestamp: new Date().toISOString()
      }
    });
  }
}

