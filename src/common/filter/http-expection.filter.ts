import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    // Aqui está o segredo: extrair o corpo da resposta
    const exceptionResponse = exception.getResponse();

    // Prepara a mensagem de erro
    // Se for um objeto (nosso caso), pegamos a propriedade message ou o próprio objeto
    const message =
      typeof exceptionResponse === 'object'
        ? (exceptionResponse as any).message || exception.message
        : exceptionResponse;

    // Extrai os erros extras, se existirem
    const errors =
      typeof exceptionResponse === 'object'
        ? (exceptionResponse as any).errors
        : undefined;

    response.status(status).json({
      statusCode: status,
      message: message,
      errors: errors, // Adiciona o campo errors aqui no JSON final
      timeStamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

