import Vue from 'vue';
import Vuex from 'vuex';
import user from '@/store/User/module';
import messages from '@/store/Messages/module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    messages
  }
});
