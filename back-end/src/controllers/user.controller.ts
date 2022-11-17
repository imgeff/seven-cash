import 'express-async-errors';
import { Request, Response } from 'express';
import { IUserEntityRequest } from '../database/entities/IUser.entity';
import { IUserService } from '../services/interfaces/IUser.service';
import { IUserController } from './interfaces/IUser.controller';
import Token from '../helpers/token';
import { StatusCodes } from 'http-status-codes';

export class UserController implements IUserController {
  private _userService: IUserService;

  constructor(userService: IUserService) {
    this._userService = userService;
  }

  public async register(req: Request, res: Response): Promise<Response> {
    const { username, password }: IUserEntityRequest = req.body;

    const userCreated = await this._userService.register({ username, password });
    const token = Token.generate(userCreated);

    return res.status(StatusCodes.CREATED).json({ ...userCreated, token });
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const { username, password }: IUserEntityRequest = req.body;

    const userLogged = await this._userService.login({ username, password });
    const token = Token.generate(userLogged);

    return res.status(StatusCodes.OK).json({ ...userLogged, token });
  }
  
}
