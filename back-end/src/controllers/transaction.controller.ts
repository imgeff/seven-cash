import 'express-async-errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ITransactionController } from './interfaces/ITransaction.controller';
import { ITransactionService } from '../services/interfaces/ITransaction.service';
import { IUserEntityResponse } from '../database/entities/IUser.entity';
import { ITransactionEntityRequest } from '../database/entities/ITransaction.entity';

export interface ITransferBody extends ITransactionEntityRequest {
  payload: IUserEntityResponse;
}

export class TransactionController implements ITransactionController {
  private _transactionService: ITransactionService;

  constructor(transactionService: ITransactionService) {
    this._transactionService = transactionService;
  }

  public async transfer(req: Request, res: Response): Promise<Response> {
    const { payload: { accountId: debitedAccountId }, username, value }: ITransferBody = req.body;
    const transaction = await this._transactionService.transfer(debitedAccountId, { username, value });

    return res.status(StatusCodes.CREATED).json(transaction);
  }
  
}
