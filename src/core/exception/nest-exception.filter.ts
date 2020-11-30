import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { NestException } from './Nest.exception';
import * as fastify from 'fastify';

@Catch()
export class NestExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const response = context.getResponse<fastify.FastifyReply>();

    const status = exception.getStatus();

    if (exception instanceof NestException) {
      response.status(exception.getStatus()).send({
        code: exception.constructor.name + '-' + exception.code,
        message: exception.getResponse(),
      });
      return;
    }

    if (exception instanceof BadRequestException) {
      response.status(exception.getStatus()).send(exception.getResponse());
      return;
    }

    if (status === 500)  {
      console.error(exception);
    } else if (status === 404) {
      response.status(status).send({
        message: 'Route not found',
      });
    } 

    response.status(status).send({
      message: 'Internal server error',
    });
  }
}
