import express from 'express';
import { ErrorManager } from '../middlewares/error';
import { IRoute } from '../routes/interfaces/IRoute';
import cors from 'cors';

class App {
  public app: express.Express;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.config();
    this.routes(routes);
  }

  private config():void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private routes(routes: IRoute[]):void {
    for (const route of routes) {
      this.app.use(route.name, route.router);
    }

    this.app.use(ErrorManager.catch);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  }
}

export { App };
