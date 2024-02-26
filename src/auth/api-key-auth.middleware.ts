import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as process from 'process';

@Injectable()
export class ApiKeyAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    if (apiKey === process.env.SECRET_KEY) {
      next();
    } else {
      res
        .status(401)
        .json({ message: 'Error de Autorización - Verifique el SECRET_KEY' });
    }
  }
}
