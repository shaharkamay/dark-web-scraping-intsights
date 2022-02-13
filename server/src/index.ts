import config from './utils/config';
import app from './app';
import socketIo from 'socket.io';
import * as http from 'http';
import socketController from './features/socket/controller';

const server = http.createServer(app);
const io = new socketIo.Server(server, {
  path: '/socket',
});

io.on('connection', socketController);

(() => {
  server.listen(config.server.port, () => {
    console.log(`app started on port ${config.server.port}`);
  });
})();

export { io };
