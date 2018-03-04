import { firebaseApp } from '../../firebase';
import 'firebase/firestore';

export const types = {
    SPACE: 'activeSpace/ENTITY',
    LOADING: 'activeSpace/LOADING',
    POSTING: 'activeSpace/POSTING',
    POSTS: 'activeSpace/POSTS',
    LOADING_POSTS: 'activeSpace/LOADING_POSTS',
    CREATE_POST: 'activeSpace/CREATE_POST',
    CREATE_POST_SUCCESS: 'activeSpace/CREATE_POST_SUCCESS',
    CREATE_POST_FAIL: 'activeSpace/CREATE_POST_FAIL',
    LOAD_SPACE: 'activeSpace/LOAD_SPACE',
    LOAD_SPACE_SUCCESS: 'activeSpace/LOAD_SPACE_SUCCESS',
    LOAD_SPACE_FAIL: 'activeSpace/LOAD_SPACE_FAIL',
    LOAD_POSTS: 'activeSpace/LOAD_POSTS',
    LOAD_POSTS_SUCCESS: 'activeSpace/LOAD_POSTS_SUCCESS',
    LOAD_POSTS_FAIL: 'activeSpace/LOAD_POSTS_FAIL'
}

const state = {
    entity: null,
    posts: [],
    loading: false,
    loadingPosts: false,
    loaded: true,
    posting: false
};

const getters = {
    [types.SPACE] : state => state.entity,
    [types.LOADING] : state => state.loading,
    [types.POSTING] : state => state.posting,
    [types.LOADING_POSTS] : state => state.loadingPosts,
    [types.POSTS] : state => state.posts
};

const mutations = {
    [types.CREATE_POST] : state => state.posting = true,
    [types.CREATE_POST_SUCCESS](state, payload){
        state.posting = false;
        state.posts = [...state.posts, payload];
    },
    [types.CREATE_POST_FAIL] : state => state.posting = false,
    [types.LOAD_SPACE] : state => state.loading = true,
    [types.LOAD_SPACE_SUCCESS](state, payload){
        state.loading = false;
        state.entity = payload;
    },
    [types.LOAD_SPACE_FAIL] : state => state.loading = false,
    [types.LOAD_POSTS]: state => state.loadingPosts = true,
    [types.LOAD_POSTS_SUCCESS](state, payload){
        state.loadingPosts = false;
        state.posts = payload;
    },
    [types.LOAD_POSTS_FAIL] : state => state.loadingPosts = false
};

const actions = {
    [types.LOAD_POSTS]({ commit }, payload){
        commit(types.LOAD_POSTS);
        return new Promise((resolve, reject) => {
            firebaseApp.firestore().collection('posts').where('spaceId', '==', payload).get()
                .then(querySnapshot => {
                    const posts = [];
                    querySnapshot.forEach(doc => posts.push({...doc.data(), id: doc.id}));
                    commit(types.LOAD_POSTS_SUCCESS, posts);
                    resolve();
                })
                .catch(error => {
                    commit(types.LOAD_POSTS_FAIL);
                    reject(error);
                });
        });
    },
    [types.CREATE_POST]({ commit, rootState }, payload){
        commit(types.CREATE_POST);
        return new Promise((resolve, reject) => {
            firebaseApp.firestore().collection('posts').add({...payload, author: rootState.authentication.user})
                .then(doc => {
                    commit(types.CREATE_POST_SUCCESS, {...payload, id: doc.id});
                    resolve();
                })
                .catch(error => {
                    commit(types.CREATE_POST_FAIL);
                    reject(error);
                });
        });
    },
    [types.LOAD_SPACE]({ commit, rootState }, payload){
        commit(types.LOAD_SPACE);
        return new Promise((resolve, reject) => {
            firebaseApp.firestore().doc(`spaces/${payload}`).get()
                .then(doc => {
                    commit(types.LOAD_SPACE_SUCCESS, {...doc.data(), id: doc.id});
                    resolve();
                })
                .catch(error => {
                    commit(types.LOAD_SPACE_FAIL);
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