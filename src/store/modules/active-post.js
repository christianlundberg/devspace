import { firebaseApp } from '../../firebase';
import 'firebase/firestore';

export const types = {
    POST: 'activePost/ENTITY',
    LOADING: 'activePost/LOADING',
    LOAD_POST: 'activePost/LOAD_POST',
    LOAD_POST_SUCCESS: 'activePost/LOAD_POST_SUCCESS',
    LOAD_POST_FAIL: 'activePost/LOAD_POST_FAIL',
};

const state = {
    entity: null,
    loading: false,
    loaded: false
};

const getters = {
    [types.POST]: state => state.entity,
    [types.LOADING]: state => state.loading
};

const mutations = {
    [types.LOAD_POST]: state => state.loading = true,
    [types.LOAD_POST_SUCCESS]: (state, payload) => {
        state.loading = false;
        state.entity = payload;
    },
    [types.LOAD_POST_FAIL]: state => state.loading = false
};

const actions = {
    [types.LOAD_POST]({ commit }, payload){
        commit(types.LOAD_POST);
        return new Promise((resolve, reject) => {
            firebaseApp.firestore().doc(`posts/${payload}`).get()
                .then(doc => {
                    commit(types.LOAD_POST_SUCCESS, {...doc.data(), id: doc.id});
                    resolve();
                })
                .catch(error => {
                    commit(types.LOAD_POST_FAIL);
                    reject(error);
                });
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};