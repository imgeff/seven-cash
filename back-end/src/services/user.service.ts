import { Database } from "../database";
import { hashSync } from "bcryptjs";
import { IUserEntityRequest, IUserEntityResponse } from "../database/entities/IUser.entity";
import { IUserService } from "./interfaces/IUser.service";
import { AccountService } from "./account.service";
import { ThrowError } from "../helpers/error";

export class UserService implements IUserService {
  private _database: Database;

  constructor(database: Database) {
    this._database = database;
  }

  public async register(user: IUserEntityRequest): Promise<IUserEntityResponse> {
    const userAlreadyExists = await this._database.user.findFirst({ where: { username: user.username }});
    if (userAlreadyExists) ThrowError.Conflict('User');

    user.password = hashSync(user.password);
    const account = await new AccountService(this._database).create();
    const { id, accountId, username } = await this._database.user.create({ data: { ...user, accountId: account.id }});
    const userCreated = { id, accountId, username }
    return userCreated;
  }
  
}
