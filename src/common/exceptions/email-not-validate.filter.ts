import { HttpException } from "@nestjs/common";


export class EmailNotValidateException extends HttpException {
  constructor() {
    super('Email not validate', 452)
  }
}