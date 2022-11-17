import { Router } from "express";
import { AccountFactory } from "../factories/account.factory";
import Token from "../helpers/token";

export const accountRouter = Router();

const accountController = AccountFactory.create();

accountRouter.get('/balance', Token.validate, accountController.getBalance.bind(accountController));

accountRouter.get('/transactions', Token.validate, accountController.getTransactions.bind(accountController));

accountRouter.get('/transactions/cashout', Token.validate, accountController.getCashOutTransactions.bind(accountController));

accountRouter.get('/transactions/filter', Token.validate, accountController.getTransactionsByDate.bind(accountController));
