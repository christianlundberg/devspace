import Vue from 'vue';
import Vuex from 'vuex';
import authentication from './modules/authentication';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        authentication
    }
});