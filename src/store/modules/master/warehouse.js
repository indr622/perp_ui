const state = () => ({
    warehouse: {},
    page: 1,

})

const mutations = {
    SET_WAREHOUSES(state, payload) {
        state.warehouse = payload;
    },
    SET_PAGE(state, payload) {
        state.page = payload;
    },
    CLEAR_WAREHOUSES(state) {
        state.warehouse = {};
    },
    CLEAR_PAGE(state) {
        state.page = 1;
    },
    CLEAR_STATE(state) {
        state.warehouse = {};
    },
    SET_CURRENT_PAGE(state, payload) {
        state.warehouse.current_page = payload;
    },
}

const actions = {
    clearWarehouse({ commit }) {
        commit("CLEAR_WAREHOUSE");
    },
    clearState({ commit }) {
        commit("CLEAR_STATE");
    },

    setPage({ commit }, payload) {
        commit("SET_PAGE", payload);
    },
}

const getters = {
    Warehouse: state => state.warehouse,
    Page: state => state.page,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
