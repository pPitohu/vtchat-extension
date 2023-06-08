import Vue from 'vue';
import App from '@/App/App.vue';
import VueCompositionAPI from '@vue/composition-api';
import router from '@/router';
import store from '@/store';
import socketio from 'socket.io-client';
import VueSocketIOExt from 'vue-socket.io-extended';
import VueChatScroll from 'vue-chat-scroll';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import VEmojiPicker from 'v-emoji-picker';
import { parseSessionVariable } from '@/helpers/parseSessionVariable';
global.jQuery = require('jquery');
const $ = global.jQuery;

Vue.use(VueCompositionAPI);
Vue.config.productionTip = false;

const session = parseSessionVariable() as any;

const host = 'https://vtchat-websocket.onrender.com';
// const host = 'http://localhost:1111';

const SocketInstance = socketio(host, {
  auth: {
    username: session.username,
    id: session.vime_id,
    rank: session.rank || 'PLAYER'
  }
});

Vue.use(VueSocketIOExt, SocketInstance, {
  store,
  actionPrefix: 'SOCKET_',
  eventToActionTransformer: (actionName: string) => actionName
});
Vue.use(VueChatScroll);
Vue.use(Vuesax);
Vue.use(VEmojiPicker);

const load = () => {
  document.head.innerHTML +=
    '<link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css">';
  // $.holdReady(true); apply if open button not appears on the page
  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
    mounted() {
      // $.holdReady(false);
    }
  });
  document.body.appendChild(app.$mount().$el);
};

load();