const state = () => ({
    products: {},
    product: {},
    form: {
        item_id: null,
        item_name: null,
        retailer_id: null,
        retailer_name: null,
        unit_id: null,
        name: '',
        description: '',
        thick: '',
        width: '',
        length: '',
        flap: '',
        gusset: '',
        pillow_bag: '',
        pillow_fold: '',
        airhole: '',
        sealtape: '',
        sealtape_type: '',
        color: '',
        price: 0,
        price_buy: 0,
        perforation: true,
        printing: true,
        is_active: true,

    },
    page: 1,
})

const mutations = {
    SET_PRODUCTS(state, payload) {
        state.products = payload;
    },
    SET_PRODUCT(state, payload) {
        state.product = payload;
    },

    SET_FORM(state, payload) {
        state.form.unit_id = payload.unit_id;
        state.form.name = payload.name;
        state.form.retailer_id = payload.retailer_id;
        state.form.retailer_name = payload.retailer.name;
        state.form.item_id = payload.item_id;
        state.form.item_name = payload.item.name;
        state.form.description = payload.description;
        state.form.thick = payload.thick;
        state.form.width = payload.width;
        state.form.length = payload.length;
        state.form.flap = payload.flap;
        state.form.gusset = payload.gusset;
        state.form.pillow_bag = payload.pillow_bag;
        state.form.pillow_fold = payload.pillow_fold;
        state.form.airhole = payload.airhole;
        state.form.sealtape = payload.sealtape;
        state.form.sealtape_type = payload.sealtape_type;
        state.form.color = payload.color;
        state.form.price = payload.price;
        state.form.price_buy = payload.price_buy;
        state.form.perforation = payload.perforation;
        state.form.printing = payload.printing;
        state.form.is_active = payload.is_active;
    },

    SET_RETAILER(state, payload) {
        state.form.retailer_id = payload.id;
        state.form.retailer_name = payload.name;
    },

    SET_ITEM(state, payload) {
        state.form.item_id = payload.id;
        state.form.item_name = payload.name;
    },
    CLEAR_PRODUCTS(state) {
        state.products = {};
    },
    CLEAR_PRODUCT(state) {
        state.product = {};
    },
    CLEAR_FORM(state) {
        state.form.item_id = null;
        state.form.item_name = null;
        state.form.retailer_id = null;
        state.form.retailer_name = null;
        state.form.unit_id = null;
        state.form.name = '';
        state.form.description = '';
        state.form.thick = '';
        state.form.width = '';
        state.form.length = '';
        state.form.flap = '';
        state.form.gusset = '';
        state.form.pillow_bag = '';
        state.form.pillow_fold = '';
        state.form.airhole = '';
        state.form.sealtape = '';
        state.form.sealtape_type = '';
        state.form.color = '';
        state.form.price = 0;
        state.form.price_buy = 0;
        state.form.perforation = true;
        state.form.printing = true;
        state.form.is_active = true;
    },

    CLEAR_STATE(state) {
        state.products = {};
        state.product = {};
    },
    SET_CURRENT_PAGE(state, payload) {
        state.products.current_page = payload;
    },

}

const actions = {
    clearProducts({ commit }) {
        commit("CLEAR_PRODUCTS");
    },
    clearProduct({ commit }) {
        commit("CLEAR_PRODUCT");
    },
    clearForm({ commit }) {
        commit("CLEAR_FORM");
    },

    clearState({ commit }) {
        commit("CLEAR_STATE");
    },
    setPage({ commit }, payload) {
        commit("SET_PAGE", payload);
    },
}

const getters = {
    Products: state => state.products,
    Product: state => state.product,
    Form: state => state.form,
    Page: state => state.page,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
