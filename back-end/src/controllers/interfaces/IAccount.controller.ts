import { Request, Response } from "express";

export interface IAccountController {
  getBalance(req: Request, res: Response): Promise<Response>;
}