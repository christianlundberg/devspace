import { firebaseApp } from '../../firebase';
import 'firebase/firestore';

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
    }
}

const actions = {
    [types.CREATE_SPACE] : ({ commit, rootState }, payload) => {
        commit(types.CREATE_SPACE);
        firebaseApp.firestore().collection('spaces').add({...payload, userId: rootState.authentication.user.uid})
            .then(() => commit(types.CREATE_SPACE_SUCCESS))
            .catch(error => commit(types.CREATE_SPACE_FAIL, error));
    },
    [types.LOAD_SPACES] : ({ commit }, payload) => {
        commit(types.LOAD_SPACES);
        firebaseApp.firestore().collection('spaces').get()
            .then(querySnapshot => {
                const entities = [];
                querySnapshot.forEach(doc => entities.push({id: doc.id, deleting: false, data: doc.data()}));
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