import Vue from 'vue';
import Vuex from 'vuex';
import authentication from './modules/authentication';
import spaces from './modules/spaces';
import activeSpace from './modules/active-space';
import activePost from './modules/active-post';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        authentication,
        spaces,
        activeSpace,
        activePost
    }
});