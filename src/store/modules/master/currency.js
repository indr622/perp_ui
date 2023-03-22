
const state = () => ({
    currencies: [],
    currency: {},
})

const mutations = {
    SET_CURRENCIES(state, payload) {
        state.currencies = payload;
    },
    SET_CURRENCY(state, payload) {
        state.currency = payload;
    },
    CLEAR_CURRENCIES(state) {
        state.currencies = [];
    },
    CLEAR_CURRENCY(state) {
        state.currency = {};
    },
    CLEAR_STATE(state) {
        state.currencies = [];
        state.currency = {};
    }
}

const actions = {
    clearCurrencies({ commit }) {
        commit("CLEAR_CURRENCIES");
    },
    clearCurrency({ commit }) {
        commit("CLEAR_CURRENCY");
    },
    clearState({ commit }) {
        commit("CLEAR_STATE");
    },
}
const getters = {
    Currencies: state => state.currencies,
    Currency: state => state.currency,
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
