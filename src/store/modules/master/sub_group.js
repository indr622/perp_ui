const state = () => ({
    sub_groups: [],
})

const mutations = {
    SET_SUBGROUP(state, payload) {
        state.sub_groups = payload;
    },
    CLEAR_STATE(state) {
        state.sub_groups = [];
    },
}
const actions = {
    clearState({ commit }) {
        commit("CLEAR_STATE");
    },
}
const getters = {
    SubGroup: state => state.sub_groups,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
