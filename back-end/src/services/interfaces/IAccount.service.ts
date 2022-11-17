import { Account, Transaction } from "@prisma/client";
import { IAccount } from "../../database/entities/IAccount.entity";

export interface IAccountService {
  create(): Promise<IAccount>;
  getBalance(id: number): Promise<number | void>;
  getTransactions(id: number): Promise<(Account & { 
    transactionDebited: Transaction[];
    transactionCredited: Transaction[];
  }) | null>;
  getCashOutTransactions(id: number): Promise<(Account & { 
    transactionDebited: Transaction[];
  }) | null>;
  getCashInTransactions(id: number): Promise<(Account & { 
    transactionCredited: Transaction[];
  }) | null>;
  getTransactionsByDate(id: number, date: string): Promise<(Account & { 
    transactionDebited: Transaction[];
    transactionCredited: Transaction[];
  }) | null>;
}