import { Database } from "../database";
import { IAccount } from "../database/entities/IAccount.entity";
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
  
}
