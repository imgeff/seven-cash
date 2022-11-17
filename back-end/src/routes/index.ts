import { IRoute } from "./interfaces/IRoute";
import { transactionRouter } from "./transaction.route";
import { userRouter } from "./user.route";

export const routes: IRoute[] = [
  {
    name: '/user',
    router: userRouter,
  },
  {
    name: '/transaction',
    router: transactionRouter
  }
]
