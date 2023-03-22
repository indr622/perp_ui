const state = () => ({
    pphs: [],
    pph: {},
})

const mutations = {
    SET_PPHS(state, payload) {
        state.pphs = payload;
    },
    SET_PPH(state, payload) {
        state.pph = payload;
    },
    CLEAR_PPHS(state) {
        state.pphs = [];
    },
    CLEAR_PPH(state) {
        state.pph = {};
    },
    CLEAR_STATE(state) {
        state.pphs = [];
        state.pph = {};
    }
}

const actions = {
    setPph({ commit }, payload) {
        commit("SET_PPH", payload);
    },
    clearPph({ commit }) {
        commit("CLEAR_PPH");
    },
    clearState({ commit }) {
        commit("CLEAR_STATE");
    },
}
const getters = {
    Pphs: state => state.pphs,
    Pph: state => state.pph,
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
