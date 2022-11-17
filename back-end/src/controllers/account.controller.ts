import 'express-async-errors';
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IAccountService } from "../services/interfaces/IAccount.service";
import { IAccountController } from "./interfaces/IAccount.controller";
import { IUserEntityResponse } from '../database/entities/IUser.entity';
import { ThrowError } from '../helpers/error';

interface IPayloadBody {
  payload: IUserEntityResponse;
}

export class AccountController implements IAccountController {
  private _accountService: IAccountService;

  constructor(accountService: IAccountService) {
    this._accountService = accountService;
  }

  public async getBalance(req: Request, res: Response): Promise<Response> {
    const { payload: { accountId: id } }: IPayloadBody = req.body;

    const balance = await this._accountService.getBalance(id);

    return res.status(StatusCodes.OK).json({ balance });
  }

  public async getTransactions(req: Request, res: Response): Promise<Response> {
    const { payload: { accountId: id } }: IPayloadBody = req.body;

    const accountTransactions = await this._accountService.getTransactions(id);

    return res.status(StatusCodes.OK).json(accountTransactions);
  }

  public async getCashOutTransactions(req: Request, res: Response): Promise<Response> {
    const { payload: { accountId: id } }: IPayloadBody = req.body;

    const accountCashOutTransactions = await this._accountService.getCashOutTransactions(id);

    return res.status(StatusCodes.OK).json(accountCashOutTransactions);
  }

  public async getCashInTransactions(req: Request, res: Response): Promise<Response> {
    const { payload: { accountId: id } }: IPayloadBody = req.body;

    const accountCashInTransactions = await this._accountService.getCashInTransactions(id);

    return res.status(StatusCodes.OK).json(accountCashInTransactions);
  }

  public async getTransactionsByDate(req: Request, res: Response): Promise<Response> {
    const { date } = req.query;
    const { payload: { accountId: id } }: IPayloadBody = req.body;

    if (!date) ThrowError.NotFound('', 'Invalid date!');

    const accountTransactions = await this._accountService.getTransactionsByDate(id, date as string);

    return res.status(StatusCodes.OK).json(accountTransactions);
  }

}