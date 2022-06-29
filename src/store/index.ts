import Vue from 'vue';
import Vuex from 'vuex';
import user from '@/store/User/module';
import users from '@/store/Users/module';
import chats from '@/store/Chats/module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    users,
    chats
  }
});
