import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import ChatPlug from '@/ChatPlug/ChatPlug.vue';
import SelectedChat from '@/SelectedChat/SelectedChat.vue';
import Dialog from '@/Dialog/Dialog.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Dialog
  },
  {
    path: '/chats/:username',
    name: 'chats',
    component: SelectedChat
  },
  {
    path: '/test',
    name: 'test',
    component: ChatPlug
  }
];

const router = new VueRouter({
  routes,
  mode: 'abstract'
});

export default router;
