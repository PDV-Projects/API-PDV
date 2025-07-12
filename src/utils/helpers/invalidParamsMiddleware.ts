import { Response } from 'express';

export function invalidParams(res: Response): void {
  res.status(400).json({ error: 'Invalid params', code: 400 });
}
