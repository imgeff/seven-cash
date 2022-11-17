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

  public async update({ id, balance }: IAccount): Promise<IAccount> {
    const accountUpdated = await this._database.account.update({ 
      where: { id },
      data: { balance }
    });

    return accountUpdated;
  }

  public async getTransactions(id: number) {
    const accountTransactions = await this._database.account.findFirst({ 
      where: { id },
      include: { creditTransactions: true, debitTransactions: true },
    });

    if (accountTransactions === undefined) {
      ThrowError.NotFound('Account');
    }

    return accountTransactions;
  }

  public async getCashOutTransactions(id: number) {
    const accountCashOutTransactions = await this._database.account.findFirst({ 
      where: { id },
      include: { debitTransactions: true },
    });

    if (accountCashOutTransactions === undefined) {
      ThrowError.NotFound('Account');
    }

    return accountCashOutTransactions;
  }

  public async getCashInTransactions(id: number) {
    const accountCashInTransactions = await this._database.account.findFirst({ 
      where: { id },
      include: { creditTransactions: true },
    });

    if (accountCashInTransactions === undefined) {
      ThrowError.NotFound('Account');
    }

    return accountCashInTransactions;
  }

  public async getTransactionsByDate(id: number, date: string) {
    const dateLimitStart = new Date(`${date} 00:00:00`).toISOString();
    const dateLimitEnd = new Date(`${date} 23:59:59`).toISOString();

    const accountTransactions = await this._database.account.findFirst({ 
      where: { id },
      include: { 
        creditTransactions: {
          where: { createdAt: { gte: dateLimitStart, lte: dateLimitEnd } },
        },
        debitTransactions: {
          where: { createdAt: { gte: dateLimitStart, lte: dateLimitEnd } },
        },
      },
    });

    if (accountTransactions === undefined) {
      ThrowError.NotFound('Account');
    }

    return accountTransactions;
  }
  
}
