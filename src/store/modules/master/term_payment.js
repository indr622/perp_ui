
const state = () => ({
    term_payment: [],

})
const mutations = {
    SET_TERM_PAYMENT(state, payload) {
        state.term_payment = payload;
    },
    CLEAR_TERM_PAYMENT(state) {
        state.term_payment = [];
    },

    CLEAR_STATE(state) {
        state.term_payment = [];
    }
}

const actions = {
    clearTermPayment({ commit }) {
        commit("CLEAR_TERM_PAYMENT");
    },
    clearState({ commit }) {
        commit("CLEAR_STATE");
    },
}
const getters = {
    TermPayment: state => state.term_payment,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
