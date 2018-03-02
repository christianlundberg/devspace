import Vue from 'vue';
import Vuex from 'vuex';
import authentication from './modules/authentication';
import spaces from './modules/spaces';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        authentication,
        spaces
    }
});