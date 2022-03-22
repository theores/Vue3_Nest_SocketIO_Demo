import { io } from 'socket.io-client';

export default {
  install: (app: any, { connection, options }: { connection: any, options: any }) => {
    const socket = io(connection, options);
    app.config.globalProperties.$socket = socket;

    app.provide('socket', socket);
  },
};
