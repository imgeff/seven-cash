import { ITransactionEntity, ITransactionEntityRequest } from "../../database/entities/ITransaction.entity";

export interface ITransactionService {
  transfer(debitedAccountId: number, dataTransfer:ITransactionEntityRequest): Promise<ITransactionEntity>
}