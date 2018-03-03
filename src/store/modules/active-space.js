import { firebaseApp } from '../../firebase';
import 'firebase/firestore';

export const types = {
    SPACE: 'activeSpace/ENTITY',
    LOADING: 'activeSpace/LOADING',
    POSTING: 'activeSpace/POSTING',
    CREATE_POST: 'activeSpace/CREATE_POST',
    CREATE_POST_SUCCESS: 'activeSpace/CREATE_POST_SUCCESS',
    CREATE_POST_FAIL: 'activeSpace/CREATE_POST_FAIL'
}

const state = {
    entity: null,
    posts: [],
    loading: false,
    loaded: true,
    posting: false
};

const getters = {
    [types.SPACE] : state => state.entity,
    [types.LOADING] : state => state.loading,
    [types.POSTING] : state => state.posting
};

const mutations = {
    [types.CREATE_POST] : state => state.posting = true,
    [types.CREATE_POST_SUCCESS](state, payload){
        state.posting = false;
        state.posts = [...state.posts, payload];
    },
    [types.CREATE_POST_FAIL] : state => state.posting = false,
};

const actions = {
    [types.CREATE_POST]({ commit }, payload){
        commit(type.CREATE_POST);
        return new Promise((resolve, reject) => {
            firebaseApp.firestore().collection('posts').add(payload)
                .then(doc => {
                    commit(types.CREATE_POST_SUCCESS, {...payload, id: doc.id});
                    resolve();
                })
                .catch(error => {
                    commit(types.CREATE_POST_FAIL);
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
}