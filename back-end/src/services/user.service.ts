import { Database } from "../database";
import { compareSync, hashSync } from "bcryptjs";
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

  public async login({ username, password }: IUserEntityRequest): Promise<IUserEntityResponse> {
    const userExists = await this._database.user.findFirst({ where: { username } });
    let userResponse;

    if (userExists !== null) {
      const user = userExists;
      const passwordIsCorrect = compareSync(password, user.password);
      if (passwordIsCorrect) {
        const { id, accountId, username } = user;
        userResponse = { id, accountId, username };
      } else {
        ThrowError.NotAuthorized('', 'Incorrect username or password');
      }
    } else {
      ThrowError.NotFound('User');
    }

    return userResponse as IUserEntityResponse;
  }

  public async getByUsername(username: string) {
    const user = await this._database.user.findFirst({
      where: { username },
      include: { account: true }
    });
    if (!user) {
      ThrowError.NotFound('User');
    }
    return user;
  }
  
}
