import { Database } from "../database";
import { IAccount } from "../database/entities/IAccount.entity";
import { ThrowError } from "../helpers/error";
import { IAccountService } from "./interfaces/IAccount.service";

export class AccountService implements IAccountService {
  private _database: Database;

  constructor(database: Database) {
    this._database = database;
  }

  public async create(): Promise<IAccount> {
    const account = await this._database.account.create({ data: {} });
    return account;
  }

  public async getBalance(id: number): Promise<number | void> {
    const account = await this._database.account.findFirst({ where: { id } });

    if (account) {
      return account.balance;
    }

    ThrowError.NotFound('Account');
  }

  public async getTransactions(id: number) {
    const accountTransactions = await this._database.account.findFirst({ 
      where: { id },
      include: { transactionCredited: true, transactionDebited: true },
    });

    if (accountTransactions === undefined) {
      ThrowError.NotFound('Account');
    }

    return accountTransactions;
  }
  
}
