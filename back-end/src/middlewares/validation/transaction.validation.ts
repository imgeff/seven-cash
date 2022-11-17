import 'express-async-errors';
import { Request, Response, NextFunction } from 'express';
import { SchemaValidation } from '../../helpers/validation/schema';
import { TransferTransactionSchema } from '../../schemas/transaction.schema';
import { ITransferBody } from '../../controllers/transaction.controller';
import { ThrowError } from '../../helpers/error';

export class TransactionValidation {

  public async transfer(req: Request, _res: Response, next: NextFunction) {
    const { payload: { username: originUsername }, username, value }: ITransferBody = req.body;
    const dataTransfer = { username, value };
  
    SchemaValidation.validate(TransferTransactionSchema)(dataTransfer);

    if (originUsername === username) ThrowError.NotAuthorized('', 'Unable to transfer to yourself!');

    return next();
  }
}