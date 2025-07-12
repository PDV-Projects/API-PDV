import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { timeStamp } from "console";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const Request = ctx.getRequest();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timeStamp: new Date().toISOString(),
      path: Request.url,
    })   
  }
}