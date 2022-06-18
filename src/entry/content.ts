import Vue from 'vue';
import App from '@/App/App.vue';
import VueCompositionAPI from '@vue/composition-api';
import router from '@/router';
import store from '@/store';
import socketio from 'socket.io-client';
import VueSocketIOExt from 'vue-socket.io-extended';

Vue.use(VueCompositionAPI);
Vue.config.productionTip = false;

const SocketInstance = socketio('http://localhost:1111');

Vue.use(VueSocketIOExt, SocketInstance, {
  store,
  actionPrefix: 'SOCKET_', // keep prefix in uppercase
  eventToActionTransformer: (actionName: string) => actionName // cancel camel case
});

const app = new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount();

document.body.appendChild(app.$el);
