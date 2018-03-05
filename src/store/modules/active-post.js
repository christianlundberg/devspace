import { firebaseApp } from '../../firebase';
import 'firebase/firestore';

export const types = {
    POST: 'activePost/ENTITY',
    LOADING: 'activePost/LOADING',
    SAVING_COMMENT: 'activePost/SAVING_COMMENT',
    COMMENTS: 'activePost/COMMENTS',
    LOAD_POST: 'activePost/LOAD_POST',
    LOAD_POST_SUCCESS: 'activePost/LOAD_POST_SUCCESS',
    LOAD_POST_FAIL: 'activePost/LOAD_POST_FAIL',
    SAVE_COMMENT: 'activePost/SAVE_COMMENT',
    SAVE_COMMENT_SUCCESS: 'activePost/SAVE_COMMENT_SUCCESS',
    SAVE_COMMENT_FAIL: 'activePost/SAVE_COMMENT_FAIL',
    LOAD_COMMENTS: 'activePost/LOAD_COMMENTS',
    LOAD_COMMENTS_SUCCESS: 'activePost/LOAD_COMMENTS_SUCCESS',
    LOAD_COMMENTS_FAIL: 'activePost/LOAD_COMMENTS_FAIL'
};

const state = {
    entity: null,
    loading: false,
    loaded: false,
    savingComment: false,
    loadingComments: false,
    comments: []
};

const getters = {
    [types.POST]: state => state.entity,
    [types.LOADING]: state => state.loading,
    [types.COMMENTS]: state => state.comments,
    [types.SAVING_COMMENT]: state => state.savingComment
};

const mutations = {
    [types.LOAD_POST]: state => state.loading = true,
    [types.LOAD_POST_SUCCESS]: (state, payload) => {
        state.loading = false;
        state.entity = payload;
    },
    [types.LOAD_POST_FAIL]: state => state.loading = false,
    [types.SAVE_COMMENT]: state => state.savingComment = true,
    [types.SAVE_COMMENT_SUCCESS]: (state, payload) => {
        state.savingComment = false;
        state.comments = [...state.comments, payload];
    },
    [types.SAVE_COMMENT_FAIL]: state => state.savingComment = false,
    [types.LOAD_COMMENTS]: state => state.loadingComments = true,
    [types.LOAD_COMMENTS_SUCCESS]: (state, payload) => {
        state.loadingComments = false;
        state.comments = payload;
    },
    [types.LOAD_COMMENTS_FAIL]: state => state.loadingComments = false,
};

const actions = {
    [types.LOAD_COMMENTS]({ commit }, payload){
        commit(types.LOAD_COMMENTS);
        return new Promise((resolve, reject) => {
            firebaseApp.firestore().collection('comments').where('postId', '==', payload).get()
                .then(querySnapshot => {
                    const comments = [];
                    querySnapshot.forEach(doc => comments.push({id: doc.id, ...doc.data()}));
                    commit(types.LOAD_COMMENTS_SUCCESS, comments);
                    resolve();
                })
                .catch(error => {
                    commit(types.LOAD_COMMENTS_FAIL);
                    reject();
                });
        });
    },
    [types.SAVE_COMMENT]({ commit, rootState }, payload){
        const comment = {postId: rootState.activePost.entity.id, author: {email: rootState.authentication.user.email, id: rootState.authentication.user.uid}, ...payload};
        commit(types.SAVE_COMMENT);
        return new Promise((resolve, reject) => {
            firebaseApp.firestore().collection('comments').add(comment)
                .then(doc => {
                    commit(types.SAVE_COMMENT_SUCCESS, {...comment, id: doc.id});
                    resolve();
                })
                .catch(error => {
                    commit(types.SAVE_COMMENT_FAIL);
                    reject(error);
                });
        });
    },
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