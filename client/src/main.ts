import { createApp } from 'vue'
import App from './App.vue'

import Socketio from "./plugins/Socket.io"

const app = createApp(App);

app.use(Socketio, {
  connection: "http://localhost:3000",
  options: {
    autoConnect: false,
  },
});

app.mount("#app");
