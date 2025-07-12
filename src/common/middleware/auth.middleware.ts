import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { invalidParams } from '@utils/helpers/invalidParamsMiddleware';

@Injectable()
export default class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const route = req.path;

    switch (route) {
      // case '/auth/login':
      //   this.login(req, res, next);
      //   break;
      default:
        next();
    }
  }

  private login(req: Request, res: Response, next: NextFunction) {
    const username = req.query.username;
    const password = req.query.password;

    if (username === undefined || password === undefined) {
      invalidParams(res);
      return;
    }

    req['data'] = { username, password };
    next();
  }
}
