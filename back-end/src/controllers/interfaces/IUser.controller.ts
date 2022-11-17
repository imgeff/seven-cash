import {Request, Response} from 'express';

export interface IUserController {
  register(req: Request, res: Response): Promise<Response>;
  login(req: Request, res: Response): Promise<Response>;
}