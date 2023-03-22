const state = () => ({
    items: {},
    item: {},
    form: {
        group_id: null,
        subgroup_id: null,
        unit_id: null,
        name: null,
        price_sell: 0,
        price_buy: 0,
        price_formula: 0,
        specification: "",
        description: "",
        is_active: true,
    },
})

const mutations = {
    SET_ITEMS(state, payload) {
        state.items = payload;
    },
    SET_ITEM(state, payload) {
        state.item = payload;
    },
    SET_FORM(state, payload) {
        state.form.group_id = payload.group_id;
        state.form.subgroup_id = payload.subgroup_id;
        state.form.unit_id = payload.unit_id;
        state.form.name = payload.name;
        state.form.price_sell = payload.price_sell;
        state.form.price_buy = payload.price_buy;
        state.form.price_formula = payload.price_formula;
        state.form.specification = payload.specification;
        state.form.description = payload.description;
        state.form.is_active = payload.is_active;
    },
    CLEAR_ITEMS(state) {
        state.items = {};
    },
    CLEAR_ITEM(state) {
        state.item = {};
    },
    CLEAR_FORM(state) {
        state.form.group_id = null;
        state.form.subgroup_id = null;
        state.form.unit_id = null;
        state.form.name = null;
        state.form.price_sell = 0;
        state.form.price_buy = 0;
        state.form.price_formula = 0;
        state.form.specification = "";
        state.form.description = "";
        state.form.is_active = true;
    },
    CLEAR_STATE(state) {
        state.item = {};
        state.items = {};
        state.form.group_id = null;
        state.form.subgroup_id = null;
        state.form.unit_id = null;
        state.form.name = null;
        state.form.price_sell = 0;
        state.form.price_buy = 0;
        state.form.price_formula = 0;
        state.form.specification = "";
        state.form.description = "";
        state.form.is_active = true;
    },
    SET_CURRENT_PAGE(state, payload) {
        state.items.current_page = payload;
    },
    SET_PAGE(state, payload) {
        state.page = payload;
    },
    ClEAR_PAGE(state) {
        state.page = 1;
    },
}

const actions = {
    clearItems({ commit }) {
        commit("CLEAR_ITEMS");
    },
    clearItem({ commit }) {
        commit("CLEAR_ITEM");
    },
    clearState({ commit }) {
        commit("CLEAR_STATE");
    },

    setPage({ commit }, payload) {
        commit("SET_PAGE", payload);
    },
}

const getters = {
    Items: state => state.items,
    Item: state => state.item,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
