import { firebaseApp } from '../../firebase';

const state = {
    user: null,
    error: null,
    loaded: false,
    creating: false,
    loggingIn: false,
    loggingOut: false
};

const getters = {
    user: state => state.user,
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
    loadUser(state, payload){
        state.user = payload;
        state.error = null;
        state.loaded = true;
        state.creating = false;
        state.loggingIn = false;
        state.loggingOut = false;
    }
};

const actions = {
    login({ commit }, payload){
        commit('login');
        firebaseApp.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .catch(error => commit('loginFail', error));
    },
    logout({ commit }){
        commit('logout');
        firebaseApp.auth().signOut()
            .catch(error => commit('logoutFail', error));
    },
    signUp({ commit }, payload){
        commit('signUp');
        firebaseApp.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .catch(error => commit('signUpFail', error));
    }
};

export const types = {
    LOGIN: 'authentication/LOGIN',
    LOAD_USER: 'authentication/LOAD_USER'
};

export default {
    state,
    getters,
    mutations,
    actions
};