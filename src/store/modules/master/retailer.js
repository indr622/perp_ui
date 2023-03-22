const state = () => ({
    retailers: {},
    retailer: {
        id: null,
        name: null,
        phone: null,
        email: null,
        address: null,
    },
})

const mutations = {
    SET_RETAILERS(state, payload) {
        state.retailers = payload;
    },
    CLEAR_RETAILERS(state) {
        state.retailers = {};
    },
    SET_RETAILER(state, payload) {
        state.retailer = {
            id: payload.id,
            name: payload.name ?? null,
            phone: payload.address ?? null,
            email: payload.email ?? null,
            address: payload.address ?? null,
        };
    },
    CLEAR_RETAILER(state) {
        state.retailer = {
            id: null,
            name: null,
            phone: null,
            email: null,
            address: null,
        };
    },

    SET_CURRENT_PAGE(state, payload) {
        state.retailers.current_page = payload;
    },

    CLEAR_STATE(state) {
        state.retailers = {};
        state.retailer = {
            id: null,
            name: null,
            phone: null,
            email: null,
            address: null,
        };
    },
}

const actions = {
    clearRetailers({ commit }) {
        commit("CLEAR_RETAILERS");
    },
    clearRetailer({ commit }) {
        commit("CLEAR_RETAILER");
    },
    clearState({ commit }) {
        commit("CLEAR_STATE");
    },

    setPage({ commit }, payload) {
        commit("SET_PAGE", payload);
    },
}

const getters = {
    Retailers: state => state.retailers,
    Retailer: state => state.retailer,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};