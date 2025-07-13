import { HttpException } from "@nestjs/common";

export class invalidParamsException extends HttpException {
  constructor() {
    super('Invalid Params', 400)
  }
}