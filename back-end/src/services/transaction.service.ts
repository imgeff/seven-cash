import { Account, User } from "@prisma/client";
import { Database } from "../database";
import { ITransactionEntityRequest, ITransactionEntity } from "../database/entities/ITransaction.entity";
import { ThrowError } from "../helpers/error";
import { AccountService } from "./account.service";
import { ITransactionService } from "./interfaces/ITransaction.service";
import { UserService } from "./user.service";

export class TransactionService implements ITransactionService {
  private _database: Database;

  constructor(database: Database) {
    this._database = database;
  }

  public async transfer(debitedAccountId: number, { username, value }: ITransactionEntityRequest): Promise<ITransactionEntity> {
    const accountService = new AccountService(this._database);
    const debitAccountBalance = await accountService.getBalance(debitedAccountId);
    if (debitAccountBalance < value) {
      ThrowError.NotAuthorized('' ,'Unauthorized transfer due to insufficient balance!');
    }

    const creditUser = await new UserService(this._database).getByUsername(username) as User & { account: Account };
    const creditAccount = { ...creditUser.account, balance: creditUser.account.balance + value};
    const debitAccount = { id: debitedAccountId, balance: debitAccountBalance as number - value };
    await accountService.update(debitAccount);
    await accountService.update(creditAccount);
    const transaction  = await this._database.transaction.create({ 
      data: { debitedAccountId, creditedAccountId: creditUser.accountId, value },
    });
    return transaction;
  }
}