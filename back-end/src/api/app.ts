import express from 'express';
import { ErrorManager } from '../middlewares/error';
import { IRoute } from '../routes/interfaces/IRoute';

class App {
  public app: express.Express;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.config();
    this.routes(routes);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
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
