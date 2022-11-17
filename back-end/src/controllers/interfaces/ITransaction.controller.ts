import {Request, Response} from 'express';

export interface ITransactionController {
  transfer(req: Request, res: Response): Promise<Response>;
}