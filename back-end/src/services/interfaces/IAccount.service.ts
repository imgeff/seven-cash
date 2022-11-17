import { IAccount } from "../../database/entities/IAccount.entity";

export interface IAccountService {
  create(): Promise<IAccount>;
  update({ id, balance }: IAccount): Promise<IAccount>;
}