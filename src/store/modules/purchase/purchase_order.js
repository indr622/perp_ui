const state = () => ({
    widget: [],
    purchase_orders: {},
    purchase_type: ["PRODUCT", "MATERIAL"],
    disabled_po_type: false,
    purchase_status: ["PROCESS", "FINISH", "CANCEL", "DELIVERY"],
    purchase_order: {
        id: null,
        sales_order_id: null,

        po_number: null,
        so_number: null,
        type: null,
        status: "PROCESS",
        supplier_id: null,
        supplier_name: null,
        supplier_phone: null,
        supplier_email: null,
        supplier_address: null,

        shipping_name: null,
        shipping_email: null,
        shipping_phone: null,
        shipping_address: null,
        shipping_mark: null,

        currency_id: null,
        use_vat: false,
        discount_percent: 0,
        discount_nominal: 0,
        rate: 0,
        pph_id: 1,
        term_shipping_id: 1,
        term_payment: null,

        order_date: new Date().toJSON().slice(0, 10),
        request_date: new Date().toJSON().slice(0, 10),

        product_list: [],
        item_list: [],

        subtotal: 0,
        discount: 0,
        pph: 0,
        vat: 0,
        additional_cost: 0,
        total: 0,

    }
})

const mutations = {
    SET_WIDGET(state, payload) {
        state.widget = payload;
    },
    SET_PURCHASE_ORDERS(state, payload) {
        state.purchase_orders = payload;
    },
    SET_PURCHASE_ORDER(state, payload) {
        state.purchase_order.id = payload.id;
        state.purchase_order.currency_id = payload.currency_id;

        state.purchase_order.supplier_id = payload.supplier_id;
        state.purchase_order.supplier_name = payload.supplier_name ? payload.supplier_name : payload.supplier.name;
        state.purchase_order.supplier_phone = payload.supplier_phone ? payload.supplier_phone : payload.supplier.phone;
        state.purchase_order.supplier_email = payload.supplier_email ? payload.supplier_email : payload.supplier.email;
        state.purchase_order.supplier_address = payload.address;
        state.purchase_order.term_payment = payload.supplier.term_payment.name;

        state.purchase_order.pph_id = payload.pph_id;
        state.purchase_order.term_shipping_id = payload.term_shipping_id;

        state.purchase_order.po_number = payload.po_number;
        state.purchase_order.so_number = payload.so_number;
        state.purchase_order.type = payload.po_type;
        state.purchase_order.use_vat = payload.po_use_vat;
        state.purchase_order.discount_percent = payload.po_discount_percent;
        state.purchase_order.discount_nominal = payload.po_discount_nominal;
        state.purchase_order.rate = payload.po_rate;
        state.purchase_order.order_date = payload.po_order_date;
        state.purchase_order.request_date = payload.po_request_date;
        state.purchase_order.status = payload.po_status;

        state.purchase_order.shipping_name = payload.shipping_name;
        state.purchase_order.shipping_email = payload.shipping_email;
        state.purchase_order.shipping_phone = payload.shipping_phone;
        state.purchase_order.shipping_address = payload.shipping_address;
        state.purchase_order.shipping_mark = payload.shipping_mark;

        state.purchase_order.created_by = payload.created_by;
        state.purchase_order.subtotal = payload.po_subtotal;
        state.purchase_order.vat = payload.po_vat;
        state.purchase_order.pph = payload.po_pph;
        state.purchase_order.discount = payload.po_discount;
        state.purchase_order.total = payload.po_total;
        state.purchase_order.product_list = payload.purchase_order_details;
        state.purchase_order.item_list = payload.purchase_order_details
    },

    SET_SUPPLIER(state, payload) {
        state.purchase_order.supplier_id = payload.id;
        state.purchase_order.supplier_name = payload.name;
        state.purchase_order.supplier_phone = payload.phone;
        state.purchase_order.supplier_email = payload.email;
        state.purchase_order.supplier_address = payload.address;
        state.purchase_order.term_payment = payload.term_payment.name;
    },

    SET_SHIPPING(state, payload) {
        state.purchase_order.shipping_name = payload.name;
        state.purchase_order.shipping_email = payload.email;
        state.purchase_order.shipping_phone = payload.phone;
        state.purchase_order.shipping_address = payload.address;
    },

    SET_SUBTOTAL(state, payload) {
        state.purchase_order.subtotal = payload;
    },

    SET_TOTAL(state, payload) {
        state.purchase_order.total = payload;
    },

    SET_VAT(state, payload) {
        state.purchase_order.vat = payload;
    },

    SET_PPH(state, payload) {
        state.purchase_order.pph = payload;
    },

    SET_DISCOUNT(state, payload) {
        state.purchase_order.discount_nominal = payload;
        state.purchase_order.discount = payload;
    },

    SET_PO_FORM_SO(state, payload) {
        state.purchase_order.sales_order_id = payload.id;
        state.purchase_order.currency_id = payload.currency_id;

        state.purchase_order.po_number = null;
        state.purchase_order.so_number = payload.so_number;
        state.purchase_order.type = "PRODUCT";
        state.purchase_order.status = "PROCESS";
        state.purchase_order.supplier_id = null;
        state.purchase_order.supplier_name = null;
        state.purchase_order.supplier_phone = null;
        state.purchase_order.supplier_email = null;
        state.purchase_order.supplier_address = null;

        state.purchase_order.shipping_name = payload.so_shipping_name;
        state.purchase_order.shipping_email = payload.so_shipping_email;
        state.purchase_order.shipping_phone = payload.so_shipping_phone;
        state.purchase_order.shipping_address = payload.so_shipping_address;
        state.purchase_order.shipping_mark = payload.so_shipping_mark;

        state.purchase_order.order_date = payload.so_order_date;
        state.purchase_order.request_date = payload.so_request_date;
        state.purchase_order.use_vat = payload.so_use_vat;
        state.purchase_order.rate = payload.so_rate;
        for (let i = 0; i < payload.sales_order_details.length; i++) {
            state.purchase_order.product_list.push({
                product_id: payload.sales_order_details[i].product_id,
                sales_order_detail_id: payload.sales_order_details[i].id,
                product_name: payload.sales_order_details[i].product.name,
                description: payload.sales_order_details[i].product.description,
                qty: payload.sales_order_details[i].qty,
                price_buy: payload.sales_order_details[i].product.price_buy,
                remark: payload.sales_order_details[i].remark,
                product_unit: payload.sales_order_details[i].product.unit.name,
            });
        }
    },

    CLEAR_FORM(state) {
        state.disabled_po_type = false;
        state.purchase_order.id = null;
        state.purchase_order.sales_order_id = null;

        state.purchase_order.po_number = null;
        state.purchase_order.so_number = null;
        state.purchase_order.type = null;
        state.purchase_order.status = "PROCESS";
        state.purchase_order.supplier_id = null;
        state.purchase_order.supplier_name = null;
        state.purchase_order.supplier_phone = null;
        state.purchase_order.supplier_email = null;
        state.purchase_order.supplier_address = null;

        state.purchase_order.shipping_name = null;
        state.purchase_order.shipping_email = null;
        state.purchase_order.shipping_phone = null;
        state.purchase_order.shipping_address = null;
        state.purchase_order.shipping_mark = null;

        state.purchase_order.currency_id = null;
        state.purchase_order.use_vat = false;
        state.purchase_order.discount_percent = 0;
        state.purchase_order.discount_nominal = 0;
        state.purchase_order.rate = 0;
        state.purchase_order.pph_id = 1;
        state.purchase_order.term_shipping_id = 1;
        state.purchase_order.term_payment = null;

        state.purchase_order.order_date = new Date().toJSON().slice(0, 10);
        state.purchase_order.request_date = new Date().toJSON().slice(0, 10);

        state.purchase_order.product_list = [];
        state.purchase_order.item_list = [];

        state.purchase_order.subtotal = 0;
        state.purchase_order.discount = 0;
        state.purchase_order.vat = 0;
        state.purchase_order.additional_cost = 0;
        state.purchase_order.total = 0;
    },

    SET_PRODUCT_LIST(state, payload) {
        state.purchase_order.product_list.push({
            product_id: payload.id,
            product_name: payload.name,
            description: payload.description,
            qty: 1,
            price_buy: payload.price_buy,
            remark: "",
            product_unit: payload.unit.name ? payload.unit.name : payload.product_unit,
        });
    },

    CLEAR_PRODUCT_LIST(state) {
        state.purchase_order.product_list = [];
        state.purchase_order.subtotal = 0;
        state.purchase_order.vat = 0;
        state.purchase_order.pph = 0;
        state.purchase_order.discount = 0;
        state.purchase_order.total = 0;

    },
    SET_CURRENT_PAGE(state, payload) {
        state.purchase_ordes.current_page = payload;
    },

    SET_ITEM_LIST(state, payload) {
        state.purchase_order.item_list.push({
            id: payload.id,
            item_name: payload.name,
            item_unit: payload.unit.name ? payload.unit.name : payload.item_unit,
            price_buy: payload.price_buy,
            qty: 1,
            remark: "",
        });
    },

    CLEAR_ITEM_LIST(state) {
        state.purchase_order.item_list = [];
        state.purchase_order.subtotal = 0;
        state.purchase_order.vat = 0;
        state.purchase_order.pph = 0;
        state.purchase_order.discount = 0;
        state.purchase_order.total = 0;

    },

    SET_DISABLED_PO_TYPE(state) {
        state.disabled_po_type = true;
    }
}

const getters = {
    PurchaseOrders: state => state.purchase_orders,
    PurchaseOrder: state => state.purchase_order,
    PurchaseType: state => state.purchase_type,
    PurchaseStatus: state => state.purchase_status,
    SubTotal: state => state.purchase_orders.subtotal,
    DisabledPoType: state => state.disabled_po_type,
}

export default {
    namespaced: true,
    state,
    mutations,
    getters
}
