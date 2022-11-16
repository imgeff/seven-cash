import { UserController } from "../controllers/user.controller";
import { database } from "../database";
import { UserService } from "../services/user.service";

export class UserFactory {
  public static create() {
    const userService = new UserService(database);
    const userController = new UserController(userService);
    return userController;
  }
} 