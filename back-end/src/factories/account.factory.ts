import { AccountController } from "../controllers/account.controller";
import { database } from "../database";
import { AccountService } from "../services/account.service";

export class AccountFactory {
  public static create() {
    const accountService = new AccountService(database);
    const accountController = new AccountController(accountService);
    return accountController;
  }
}