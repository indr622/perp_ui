const state = () => ({
    groups: [],

})

const mutations = {
    SET_GROUP(state, payload) {
        state.groups = payload;
    },

    CLEAR_STATE(state) {
        state.groups = [];
    },
}

const actions = {
    clearState({ commit }) {
        commit("CLEAR_STATE");
    },
}

const getters = {
    Group: state => state.groups,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
