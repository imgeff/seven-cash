import { Request, Response } from "express";

export interface IAccountController {
  getBalance(req: Request, res: Response): Promise<Response>;
  getTransactions(req: Request, res: Response): Promise<Response>;
  getCashOutTransactions(req: Request, res: Response): Promise<Response>;
  getCashInTransactions(req: Request, res: Response): Promise<Response>;
  getTransactionsByDate(req: Request, res: Response): Promise<Response>;
}