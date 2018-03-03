import { firebaseApp } from '../../firebase';
import 'firebase/firestore';
import { types as authenticationTypes } from './authentication';

export const types = {
    SPACES: 'spaces/ENTITIES',
    LOADING: 'spaces/LOADING',
    CREATING: 'spaces/CREATING',
    ERROR: 'spaces/ERROR',
    CREATE_SPACE: 'spaces/CREATE_SPACE',
    CREATE_SPACE_SUCCESS: 'spaces/CREATE_SPACE_SUCCESS',
    CREATE_SPACE_FAIL: 'spaces/CREATE_SPACE_FAIL',
    LOAD_SPACES: 'spaces/LOAD_SPACES',
    LOAD_SPACES_SUCCESS: 'spaces/LOAD_SPACES_SUCCESS',
    LOAD_SPACES_FAIL: 'spaces/LOAD_SPACES_FAIL',
    DELETE_SPACE: 'spaces/DELETE_SPACE',
    DELETE_SPACE_SUCCESS: 'spaces/DELETE_SPACE_SUCCESS',
    DELETE_SPACE_FAIL: 'spaces/DELETE_SPACE_FAIL'
};

const state = {
    entities: [],
    loading: false,
    creating: false,
    error: null
};

const getters = {
    [types.CREATING]: state => state.creating,
    [types.ERROR]: state => state.error,
    [types.SPACES]: state => state.entities,
    [types.LOADING]: state => state.loading
};

const mutations = {
    [types.CREATE_SPACE]: state => state.creating = true,
    [types.CREATE_SPACE_SUCCESS]: state => state.creating = false,
    [types.CREATE_SPACE_FAIL]: (state, payload) => {
        state.creating = false;
        state.error = payload
    },
    [types.LOAD_SPACES]: state => state.loading = true,
    [types.LOAD_SPACES_SUCCESS]: (state, payload) => {
        state.loading = false;
        state.entities = payload;
    },
    [types.LOAD_SPACES_FAIL]: (state, payload) => {
        state.loading = false;
        state.error = payload
    },
    [types.DELETE_SPACE]: (state, payload) => {
        const space = state.entities.find(entity => entity.data.id == payload.id);

        if(space)
            space.deleting = true;
    },
    [types.DELETE_SPACE_SUCCESS]: (state, payload) => {
        state.entities = state.entities.filter(entity => entity.data.id != payload.id);
    },
    [types.DELETE_SPACE_FAIL]: (state, payload) => {
        const space = state.entities.find(entity => entity.data.id != payload.id);
                
        if(space)
            space.deleting = false;
    }
}

const actions = {
    [types.DELETE_SPACE] : ({ commit }, payload) => {
        commit(types.DELETE_SPACE, payload);
        commit(authenticationTypes.DELETE_SPACE, payload);
        return new Promise((resolve, reject) => {
            firebaseApp.firestore().doc(`spaces/${payload.id}`).delete()
                .then(() => {
                    commit(types.DELETE_SPACE_SUCCESS, payload);
                    commit(authenticationTypes.DELETE_SPACE_SUCCESS, payload);
                    resolve();
                })
                .catch(() => {
                    commit(types.DELETE_SPACE_FAIL, payload);
                    commit(authenticationTypes.DELETE_SPACE_FAIL, payload);
                    reject();
                });
        });
    },
    [types.CREATE_SPACE] : ({ commit, rootState }, payload) => {
        commit(types.CREATE_SPACE);
        return new Promise((resolve, reject) => {
            firebaseApp.firestore().collection('spaces').add({...payload, userId: rootState.authentication.user.uid})
                .then((doc) => {
                    commit(types.CREATE_SPACE_SUCCESS);
                    commit(authenticationTypes.CREATE_SPACE, {...payload, id: doc.id, userId: rootState.authentication.user.uid})
                    resolve();
                })
                .catch(error => {
                    commit(types.CREATE_SPACE_FAIL, error);
                    reject();
                });
        });
    },
    [types.LOAD_SPACES] : ({ commit }, payload) => {
        commit(types.LOAD_SPACES);
        firebaseApp.firestore().collection('spaces').get()
            .then(querySnapshot => {
                const entities = [];
                querySnapshot.forEach(doc => entities.push({deleting: false, data: {...doc.data(), id: doc.id}}));
                commit(types.LOAD_SPACES_SUCCESS, entities);
            })
            .catch(error => commit(types.LOAD_SPACES_FAIL, error));
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}