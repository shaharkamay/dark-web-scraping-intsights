import config from './utils/config';
import app from './app';

(() => {
  console.log(config.db.url);
  app.listen(config.server.port, () => {
    console.log(`app started on port ${config.server.port}`);
  });
})();
