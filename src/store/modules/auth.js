//state
const getDefaultState = () => {
    return {
        access_token: null,
        token_type: null,
        expires_in: null,
        user: null
    }
}
const state = getDefaultState();

//mutations
const mutations = {
    setToken: (state, token) => {
        state.access_token = token.access_token;
        state.token_type = token.token_type;
        state.expires_in = token.expires_in;
    },
    setUser: (state, user) => {
        state.user = user;
    },
    resetState(state) {
        Object.assign(state, getDefaultState())
    }
}
const getters = {
    Authenticated: state => {
        return state.access_token != null && state.user != null;
    },
    AccessToken: state => {
        return state.access_token;
    },
    Token: state => {
        return state.token_type + ' ' + state.access_token;
    },
    User: state => {
        return state.user;
    },

    Can: (state) => (name) => {

        let permission = state.user.permission;
        if (typeof permission != 'undefined') {
            return permission.indexOf(name) !== -1;
        }
    }

}
const actions = {
    afterLoginSuccess({ commit }, data) {
        commit('setToken', data.token);
        commit('setUser', data.user);
    },
    logout({ commit }) {
        commit('resetState');
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}