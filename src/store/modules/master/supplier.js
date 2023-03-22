const state = () => ({
    suppliers: {},
    supplier: {},
})

const mutations = {
    SET_SUPPLIERS(state, payload) {
        state.suppliers = payload;
    },
    SET_SUPPLIER(state, payload) {
        state.supplier = payload;
    },
    CLEAR_SUPPLIERS(state) {
        state.suppliers = {};
    },
    CLEAR_SUPPLIER(state) {
        state.supplier = {};
    },
    CLEAR_STATE(state) {
        state.suppliers = {};
        state.supplier = {};
    },
    SET_CURRENT_PAGE(state, payload) {
        state.suppliers.current_page = payload;
    },

}

const actions = {
    clearSuppliers({ commit }) {
        commit("CLEAR_SUPPLIERS");
    },
    clearSupplier({ commit }) {
        commit("CLEAR_SUPPLIER");
    },
    clearState({ commit }) {
        commit("CLEAR_STATE");
    },

}

const getters = {
    Suppliers: state => state.suppliers,
    Supplier: state => state.supplier,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

