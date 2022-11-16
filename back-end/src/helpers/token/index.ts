import 'express-async-errors';
import { NextFunction, Request, Response } from 'express';
import { Secret, sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import { IUserEntityResponse } from '../../database/entities/IUser.entity';
import { ThrowError } from '../error';

export default class Token {
  private static secret = process.env.SECRET as Secret;
  private static jwtConfig = { algorithm: 'HS256', expiresIn: '24h' };

  // ========================= GENERATE ============================
  public static generate = (payload: IUserEntityResponse) => {
    const { secret, jwtConfig } = this;

    const token = sign(payload, secret, jwtConfig as SignOptions);
    return token;
  };

  // ========================= AUTHENTICATE ============================
  public static authenticate = (token: string) => {
    const { secret, jwtConfig } = this;

    const payload = verify(token, secret, jwtConfig as VerifyOptions);
    return payload;
  };

  // ========================= VALIDATE ============================
  public static validate = (req: Request, res: Response, next: NextFunction) => {
    const { authorization: token } = req.headers;
    if (!token) ThrowError.NotAuthorized('User');

    const payload = this.authenticate(token as string);
    req.body.payload = payload;
    next();
  };
}