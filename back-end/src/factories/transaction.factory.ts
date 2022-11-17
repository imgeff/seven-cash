import { TransactionController } from "../controllers/transaction.controller";
import { TransactionService } from "../services/transaction.service";
import { database } from "../database";

export class TransactionFactory {
  public static create() {
    const transactionService = new TransactionService(database);
    const transactionController = new TransactionController(transactionService);
    return transactionController;
  }
} 