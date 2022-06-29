/* eslint-disable no-undef */
import Vue from 'vue';
import App from '@/App/App.vue';
import VueCompositionAPI from '@vue/composition-api';
import router from '@/router';
import store from '@/store';
import socketio from 'socket.io-client';
import VueSocketIOExt from 'vue-socket.io-extended';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import { parseSessionVariable } from '@/helpers/parseSessionVariable';
global.jQuery = require('jquery');
const $ = global.jQuery;

Vue.use(VueCompositionAPI);
Vue.config.productionTip = false;

const session = parseSessionVariable() as any;

const host = 'https://vtchat-websocket.herokuapp.com';
// const host = 'http://localhost:1111';

const SocketInstance = socketio(host, {
  auth: {
    username: session.username,
    id: session.vime_id,
    rank: session.rank
  }
});

Vue.use(VueSocketIOExt, SocketInstance, {
  store,
  actionPrefix: 'SOCKET_',
  eventToActionTransformer: (actionName: string) => actionName
});

Vue.use(Vuesax);

const load = () => {
  $.holdReady(true);
  document.head.innerHTML +=
    '<link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css">';
  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
    mounted() {
      console.log('mounted');
      $.holdReady(false);
    }
  });
  document.body.appendChild(app.$mount().$el);
};
load();
