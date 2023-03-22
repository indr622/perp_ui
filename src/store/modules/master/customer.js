const state = () => ({
    customers: {},
    customer: {
        id: null,
        name: null,
        email: null,
        phone: null,
        address: null,
        term_payment: null,
    },

    shipping: {
        id: null,
        name: null,
        email: null,
        phone: null,
        address: null,
    },
})

const mutations = {
    SET_CUSTOMERS(state, payload) {
        state.customers = payload;
    },
    SET_CUSTOMER(state, payload) {
        state.customer = {
            id: payload.id,
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            address: payload.address,
            term_payment: payload.term_payment,
        };
    },

    SET_SHIPPING(state, payload) {
        state.shipping = {
            id: payload.id,
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            address: payload.address,
        };
    },

    CLEAR_SHIPPING(state) {
        state.shipping = {
            id: null,
            name: null,
            email: null,
            phone: null,
            address: null,
        };
    },
    CLEAR_CUSTOMERS(state) {
        state.customers = {};
    },
    CLEAR_CUSTOMER(state) {
        state.customer = {
            id: null,
            name: null,
            email: null,
            phone: null,
            address: null,
            term_payment: null,
        };
    },
    CLEAR_STATE(state) {
        state.customers = {};
        state.customer = {
            id: null,
            name: null,
            email: null,
            phone: null,
            address: null,
            term_payment: null,
        };
    },
    SET_CURRENT_PAGE(state, payload) {
        state.customers.current_page = payload;
    },
}
const getters = {
    Customers: state => state.customers,
    Customer: state => state.customer,
    Shipping: state => state.shipping,
    Page: state => state.page,
}

export default {
    namespaced: true,
    state,
    mutations,
    getters
}
