
const state = () => ({
    term_shipping: [],

})
const mutations = {
    SET_TERM_SHIPPING(state, payload) {
        state.term_shipping = payload;
    },
    CLEAR_TERM_SHIPPING(state) {
        state.term_shipping = [];
    },

    CLEAR_STATE(state) {
        state.term_shipping = [];
    }
}

const actions = {
    clearTermShipping({ commit }) {
        commit("CLEAR_TERM_SHIPPING");
    },
    clearState({ commit }) {
        commit("CLEAR_STATE");
    },
}
const getters = {
    TermShipping: state => state.term_shipping,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
