import 'express-async-errors';
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IAccountService } from "../services/interfaces/IAccount.service";
import { IAccountController } from "./interfaces/IAccount.controller";
import { IUserEntityResponse } from '../database/entities/IUser.entity';

interface IGetTransactionsBody {
  payload: IUserEntityResponse;
}

export class AccountController implements IAccountController {
  private _accountService: IAccountService;

  constructor(accountService: IAccountService) {
    this._accountService = accountService;
  }

  public async getBalance(req: Request, res: Response): Promise<Response> {
    const { accountId: id }: IUserEntityResponse = req.body;

    const balance = await this._accountService.getBalance(id);

    return res.status(StatusCodes.OK).json({ balance });
  }

  public async getTransactions(req: Request, res: Response): Promise<Response> {
    const { payload: { accountId: id } }: IGetTransactionsBody = req.body;

    const accountTransactions = await this._accountService.getTransactions(id);

    return res.status(StatusCodes.OK).json(accountTransactions);
  }

}