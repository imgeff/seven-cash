import { Router } from "express";
import { TransactionFactory } from "../factories/transaction.factory";
import Token from "../helpers/token";
import { TransactionValidation } from "../middlewares/validation/transaction.validation";

export const transactionRouter = Router();

const transactionController = TransactionFactory.create();

const transactionValidation = new TransactionValidation();

transactionRouter.post(
  '/transfer',
  Token.validate,
  transactionValidation.transfer,
  transactionController.transfer.bind(transactionController),
);
