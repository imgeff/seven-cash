import { IRoute } from "./interfaces/IRoute";
import { userRouter } from "./user.route";

export const routes: IRoute[] = [
  {
    name: '/user',
    router: userRouter,
  }
]
