import { App } from '../../api/app';
import { routes } from '../../routes';

export const app = new App(routes).app;
