import 'express-async-errors';
import { Request, Response, NextFunction } from 'express';
import { IUserEntityRequest } from '../../database/entities/IUser.entity';
import { SchemaValidation } from '../../helpers/validation/schema';
import { UserRegisterSchema } from '../../schemas/user.schema';

export class UserValidation {
  public async register(req: Request, res: Response, next: NextFunction) {
    const { username, password }: IUserEntityRequest = req.body;
    const registrationUser = { username, password };
  
    SchemaValidation.validate(UserRegisterSchema)(registrationUser);

    return next();
  }
}