import { IAccount } from "../../database/entities/IAccount.entity";

export interface IAccountService {
  create(): Promise<IAccount>;
  getBalance(id: number): Promise<number | void>;
}