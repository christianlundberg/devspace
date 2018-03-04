import { firebaseApp } from '../../firebase';
import 'firebase/firestore';

export const types = {
    CREATE_SPACE: 'authentication/CREATE_SPACE',
    DELETE_SPACE: 'authentication/DELETE_SPACE',
    DELETE_SPACE_SUCCESS: 'authentication/DELETE_SPACE_SUCCESS',
    DELETE_SPACE_FAIL: 'authentication/DELETE_SPACE_FAIL'
};

const state = {
    user: null,
    error: null,
    loading: false,
    loaded: false,
    creating: false,
    loggingIn: false,
    loggingOut: false
};

const getters = {
    user: state => state.user,
    loading: state => state.loading,
    error: state => state.error,
    loggingIn: state => state.loggingIn,
    creating: state => state.creating
};

const mutations = {
    signUp(state){
        state.creating = true;
    },
    signUpFail(state, payload){
        state.error = payload;
        state.creating = false;
    },
    login(state){
        state.loggingIn = true;
    },
    loginFail(state, payload){
        state.error = payload;
        state.loggingIn = false;
    },
    logout(state){
        state.loggingOut = true;
    },
    logoutFail(state, payload){
        state.error = payload;
        state.loggingOut = false;
    },
    loadUser(state){
        state.loading = true;
    },
    loadUserSuccess(state, payload){
        state.loading = true
        state.user = payload;
        state.error = null;
        state.loaded = true;
        state.creating = false;
        state.loggingIn = false;
        state.loggingOut = false;
    },
    loadUserFail(state, payload){
        state.loading = false;
        state.error = payload;
    },
    [types.CREATE_SPACE](state, payload){
        state.user.spaces.push({data: payload, deleting: false});
    },
    [types.DELETE_SPACE](state, payload){
        state.user.spaces.find(entity => entity.data.id == payload.id).deleting = true;
    },
    [types.DELETE_SPACE_SUCCESS](state, payload){
        state.user.spaces = state.user.spaces.filter(entity => entity.data.id != payload.id);
    },
    [types.DELETE_SPACE_FAIL](state, payload){
        state.user.spaces.find(entity => entity.data.id == payload.id).deleting = false;
    }
};

const actions = {
    loadUser({ commit }, payload){
        commit('loadUser');
        return new Promise((resolve, reject) => {
            
            if(!payload){
                commit('loadUserSuccess', payload);
                resolve();
                return;
            }

            firebaseApp.firestore().doc(`users/${payload.uid}`).get()
                .then(snapshot => {
                    const doc = snapshot.data();
                    commit('loadUserSuccess', {email: payload.email, uid: payload.uid, spaces: ((doc && doc.spaces) || []).map(space => ({deleting: false, data: space}))});
                    resolve();
                })
                .catch(error => {
                    commit('loadUserFail', error);
                    reject();
                });
        });
    },
    login({ commit, dispatch }, payload){
        commit('login');
        return new Promise((resolve, reject) => {
            firebaseApp.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => dispatch('loadUser', user))
                .then(() => resolve())
                .catch(error => {
                    commit('loginFail', error);
                    reject(error);
                });
        });
    },
    logout({ commit }){
        commit('logout');
        return new Promise((resolve, reject) => {
            firebaseApp.auth().signOut()
                .then(() => {
                    commit('loadUserSuccess', null);
                    resolve();
                })
                .catch(error => {
                    commit('logoutFail', error);
                    reject(error);
                });
        });
        
    },
    signUp({ commit }, payload){
        commit('signUp');
        return new Promise((resolve, reject) => {
            firebaseApp.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    commit('loadUserSuccess', {uid: user.uid, email: user.email, spaces: []})
                    resolve();
                })
                .catch(error => {
                    commit('signUpFail', error);
                    reject();
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