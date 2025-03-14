import { createApp } from './server';
import { logger } from './logger';
import { App } from './server/app';

const bootstrap = () => {
  try {
    const app: App = createApp();

    const PORT = 9180;
    const HOST = 'localhost';

    app.listen(PORT, HOST);
  } catch (e) {
    logger.error((e as Error).message);
  }
};
bootstrap();
