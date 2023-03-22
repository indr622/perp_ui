const state = () => ({
    widget: [],
    quotations: {},
    quotation: {
        id: null,
        quo_number: null,

        customer_id: null,
        customer_name: null,
        customer_phone: null,
        customer_email: null,
        customer_address: null,

        retailer_id: null,
        retailer_name: null,
        retailer_phone: null,
        retailer_email: null,
        retailer_address: null,

        shipping_name: null,
        shipping_email: null,
        shipping_phone: null,
        shipping_address: null,

        customer_po: null,
        type_order_id: 1,
        order_date: new Date().toJSON().slice(0, 10),
        request_date: new Date().toJSON().slice(0, 10),
        use_vat: false,
        currency_id: 1,
        rate: 0,
        discount_nominal: 0,
        discount_percent: 0,
        term_payment: null,
        term_shipping_id: 1,
        created_by: null,
        product_list: [],

        subtotal: 0,
        discount: 0,
        vat: 0,
        additional_cost: 0,
        total: 0,
    },
    page: 1,

})

const mutations = {
    SET_WIDGET(state, payload) {
        state.widget = payload;
    },
    SET_QUOTATIONS(state, payload) {
        state.quotations = payload;
    },
    SET_CUSTOMER(state, payload) {
        state.quotation.customer_id = payload.id;
        state.quotation.customer_name = payload.name;
        state.quotation.customer_phone = payload.phone;
        state.quotation.customer_email = payload.email;
        state.quotation.customer_address = payload.address;
        state.quotation.term_payment = payload.term_payment.name;
    },

    SET_RETAILER(state, payload) {
        state.quotation.retailer_id = payload.id;
        state.quotation.retailer_name = payload.name;
        state.quotation.retailer_phone = payload.phone;
        state.quotation.retailer_email = payload.email;
        state.quotation.retailer_address = payload.address;
    },

    SET_SHIPPING(state, payload) {
        state.quotation.shipping_name = payload.name;
        state.quotation.shipping_email = payload.email;
        state.quotation.shipping_phone = payload.phone;
        state.quotation.shipping_address = payload.address;
    },

    SET_PRODUCT_LIST(state, payload) {
        state.quotation.product_list.push({
            product_name: payload.name,
            product_id: payload.id,
            item_name: payload.item.name,
            thick: payload.thick,
            width: payload.width,
            length: payload.length,
            sealtape: payload.sealtape,
            printing: payload.printing,
            qty: 1,
            price: payload.price,
            price_sell: 0,
            amount: 0,
            remark: "",
            unit_id: payload.unit.id,
            unit_name: payload.unit.name,
        });
    },

    SET_QUOTATION(state, payload) {

        state.quotation.id = payload.id;
        state.quotation.quo_number = payload.quo_number;
        state.quotation.customer_id = payload.customer_id;
        state.quotation.customer_name = payload.customer.name;
        state.quotation.customer_phone = payload.customer.phone;
        state.quotation.customer_email = payload.customer.email;
        state.quotation.customer_address = payload.customer.address;

        state.quotation.retailer_id = payload.retailer_id;
        state.quotation.retailer_name = payload.retailer.name ?? null;
        state.quotation.retailer_phone = payload.retailer.phone ?? null;
        state.quotation.retailer_email = payload.retailer.email ?? null;
        state.quotation.retailer_address = payload.retailer.address ?? null;

        state.quotation.shipping_name = payload.quo_shipping_name ?? null;
        state.quotation.shipping_phone = payload.quo_shipping_phone ?? null;
        state.quotation.shipping_email = payload.quo_shipping_email ?? null;
        state.quotation.shipping_address = payload.quo_shipping_address ?? null;

        state.quotation.customer_po = payload.customer_po;
        state.quotation.type_order_id = payload.type_order_id;
        state.quotation.order_date = payload.quo_order_date;
        state.quotation.request_date = payload.quo_request_date;
        state.quotation.use_vat = payload.quo_use_vat;
        state.quotation.currency_id = payload.currency_id;
        state.quotation.rate = payload.quo_rate;
        state.quotation.discount_nominal = payload.quo_discount_nominal;
        state.quotation.discount_percent = payload.quo_discount_percent;
        state.quotation.term_payment = payload.quo_term_payment;
        state.quotation.term_shipping_id = payload.term_shipping_id;
        state.quotation.created_by = payload.quo_created_by;


        state.quotation.subtotal = payload.quo_subtotal;
        state.quotation.discount = payload.quo_discount;
        state.quotation.vat = payload.quo_vat;
        state.quotation.additional_cost = payload.quo_additional_cost;
        state.quotation.total = payload.quo_total;
        state.quotation.product_list = payload.quotation_details;
    },
    SET_SUBTOTAL(state, payload) {
        state.quotation.subtotal = payload;
    },
    SET_DISCOUNT(state, payload) {
        state.quotation.discount = payload;
    },
    SET_VAT(state, payload) {
        state.quotation.vat = payload;
    },
    SET_ADDITIONAL_COST(state, payload) {
        state.quotation.additional_cost = payload;
    },
    SET_TOTAL(state, payload) {
        state.quotation.total = payload;
    },
    SET_CURRENT_PAGE(state, payload) {
        state.quotations.current_page = payload;
    },
    SET_PAGE(state, payload) {
        state.page = payload;
    },
    CLEAR_WIDGET(state) {
        state.widget = [];
    },
    CLEAR_QUOTATION(state) {
        state.quotation = {};
    },
    CLEAR_QUOTATIONS(state) {
        state.quotations = {};
    },
    ClEAR_PAGE(state) {
        state.page = 1;
    },

    CLEAR_STATE(state) {
        state.widget = [];
        state.quotations = {};
        state.quotation.id = null;
        state.quotation.quo_number = null;
        state.quotation.customer_id = null;
        state.quotation.customer_name = null;
        state.quotation.customer_phone = null;
        state.quotation.customer_email = null;
        state.quotation.customer_address = null;

        state.quotation.retailer_id = null;
        state.quotation.retailer_name = null;
        state.quotation.retailer_phone = null;
        state.quotation.retailer_email = null;
        state.quotation.retailer_address = null;

        state.quotation.shipping_name = null;
        state.quotation.shipping_phone = null;
        state.quotation.shipping_email = null;
        state.quotation.shipping_address = null;

        state.quotation.customer_po = null;
        state.quotation.type_order_id = 1;
        state.quotation.order_date = new Date().toJSON().slice(0, 10);
        state.quotation.request_date = new Date().toJSON().slice(0, 10);
        state.quotation.use_vat = false;
        state.quotation.currency_id = 1;
        state.quotation.rate = 0;
        state.quotation.discount_nominal = 0;
        state.quotation.discount_percent = 0;
        state.quotation.term_payment = null;
        state.quotation.term_shipping_id = 1;

        state.quotation.subtotal = 0;
        state.quotation.discount = 0;
        state.quotation.vat = 0;
        state.quotation.additional_cost = 0;
        state.quotation.total = 0;
        state.quotation.product_list = [];
        // id: null,
        // customer_id: null,
        // customer_name: null,
        // customer_phone: null,
        // customer_email: null,
        // customer_address: null,

        // retailer_id: null,
        // retailer_name: null,
        // retailer_phone: null,
        // retailer_email: null,
        // retailer_address: null,

        // shipping_name: null,
        // shipping_email: null,
        // shipping_phone: null,
        // shipping_address: null,

        // customer_po: null,
        // type_order_id: 1,
        // order_date: new Date().toJSON().slice(0, 10),
        // request_date: new Date().toJSON().slice(0, 10),
        // use_vat: false,
        // currency_id: 1,
        // rate: 0,
        // discount_nominal: 0,
        // discount_percent: 0,
        // term_payment: null,
        // term_shipping_id: 1,

        // subtotal: 0,
        // discount: 0,
        // vat: 0,
        // additional_cost: 0,
        // total: 0,

        state.page = 1;
    }
}

const getters = {
    Widget: state => state.widget,
    Quotations: state => state.quotations,
    Quotation: state => state.quotation,
    Page: state => state.page,
}

export default {
    namespaced: true,
    state,
    mutations,
    getters
}
