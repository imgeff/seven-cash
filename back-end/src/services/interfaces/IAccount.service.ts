import { Account, Transaction } from "@prisma/client";
import { IAccount } from "../../database/entities/IAccount.entity";

export interface IAccountService {
  create(): Promise<IAccount>;
  update({ id, balance }: IAccount): Promise<IAccount>;
  getBalance(id: number): Promise<number | void>;
  getTransactions(id: number): Promise<(Account & { 
    debitTransactions: Transaction[];
    creditTransactions: Transaction[];
  }) | null>;
  getCashOutTransactions(id: number): Promise<(Account & { 
    debitTransactions: Transaction[];
  }) | null>;
  getCashInTransactions(id: number): Promise<(Account & { 
    creditTransactions: Transaction[];
  }) | null>;
  getTransactionsByDate(id: number, date: string): Promise<(Account & { 
    debitTransactions: Transaction[];
    creditTransactions: Transaction[];
  }) | null>;
}