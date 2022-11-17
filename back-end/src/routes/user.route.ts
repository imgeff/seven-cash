import { Router } from "express";
import { UserFactory } from "../factories/user.factory";
import { UserValidation } from "../middlewares/validation/user.validation";

export const userRouter = Router();

const userController = UserFactory.create();

const userValidation = new UserValidation();

userRouter.post('/register', userValidation.register, userController.register.bind(userController));

userRouter.post('/login', userValidation.login, userController.login.bind(userController));
