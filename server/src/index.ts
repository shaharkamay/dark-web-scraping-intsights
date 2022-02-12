import config from './utils/config';
import app from './app';

(() => {
  app.listen(config.server.port, () => {
    console.log(`app started on port ${config.server.port}`);
  });
})();
