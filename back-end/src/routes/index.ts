import { IRoute } from "./interfaces/IRoute";
import { accountRouter } from "./account.route";
import { userRouter } from "./user.route";

export const routes: IRoute[] = [
  {
    name: '/user',
    router: userRouter,
  },
  {
    name: '/account',
    router: accountRouter
  }
]
