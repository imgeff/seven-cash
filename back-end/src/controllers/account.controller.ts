import 'express-async-errors';
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IAccountService } from "../services/interfaces/IAccount.service";
import { IAccountController } from "./interfaces/IAccount.controller";
import { IUserEntityResponse } from '../database/entities/IUser.entity';

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

}