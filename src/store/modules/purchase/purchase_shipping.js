const state = () => ({
    purchase_shippings: {},
    purchase_shipping: {
        id: null,
        type: null,
        purchase_order_id: null,
        po_number: null,
        shp_number: null,

        supplier_id: null,
        supplier_name: null,
        supplier_address: null,
        supplier_email: null,
        supplier_phone: null,
        term_payment: null,

        shipping_address: null,
        shipping_name: null,
        shipping_email: null,
        shipping_phone: null,
        shipping_mark: null,

        currency_id: null,
        term_shipping_id: null,
        pph_id: null,
        discount_percent: null,
        discount_nominal: null,
        request_date: new Date().toJSON().slice(0, 10),
        rate: null,
        use_vat: null,
        note: null,
        created_by: null,

        subtotal: 0,
        vat: 0,
        pph: 0,
        discount: 0,
        total: 0,
        product_list: [],
        item_list: [],
    }
})

const mutations = {
    SET_PURCHASE_SHIPPINGS(state, payload) {
        state.purchase_shippings = payload;
    },
    SET_SHP_FROM_PO(state, payload) {

        state.purchase_shipping.type = payload.po_type ? payload.po_type : null;
        state.purchase_shipping.purchase_order_id = payload.id ? payload.id : null;
        state.purchase_shipping.po_number = payload.po_number ? payload.po_number : null;

        state.purchase_shipping.supplier_id = payload.supplier_id ?? null;
        state.purchase_shipping.supplier_name = payload.supplier.name ?? null;
        state.purchase_shipping.supplier_email = payload.supplier.email ?? null;
        state.purchase_shipping.supplier_phone = payload.supplier.phone ?? null;
        state.purchase_shipping.supplier_address = payload.supplier.address ?? null;
        state.purchase_shipping.term_payment = payload.term_payment ?? null;

        state.purchase_shipping.shipping_name = payload.shipping_name ?? null;
        state.purchase_shipping.shipping_email = payload.shipping_phone ?? null;
        state.purchase_shipping.shipping_address = payload.shipping_address ?? null;
        state.purchase_shipping.shipping_phone = payload.shipping_phone ?? null;
        state.purchase_shipping.shipping_mark = payload.shipping_mark ?? null;

        state.purchase_shipping.currency_id = payload.currency_id ?? null;
        state.purchase_shipping.term_shipping_id = payload.term_shipping_id ?? null;
        state.purchase_shipping.pph_id = payload.pph_id ?? null;
        state.purchase_shipping.use_vat = payload.po_use_vat ?? null;
        state.purchase_shipping.rate = payload.po_rate ?? null;
        state.purchase_shipping.discount_percent = payload.po_discount_percent ?? null;
        state.purchase_shipping.discount_nominal = payload.po_discount_nominal ?? null;

        state.purchase_shipping.request_date = payload.po_request_date ?? null;

        state.purchase_shipping.subtotal = payload.po_subtotal ?? null;
        state.purchase_shipping.vat = payload.po_vat ?? null;
        state.purchase_shipping.pph = payload.po_pph ?? null;
        state.purchase_shipping.discount = payload.po_discount ?? null;
        state.purchase_shipping.total = payload.po_total ?? null;

        for (let i = 0; i < payload.purchase_order_details.length; i++) {
            state.purchase_shipping.product_list.push({
                purchase_order_detail_id: payload.purchase_order_details[i].id,
                product_id: payload.purchase_order_details[i].product_id,
                product: payload.purchase_order_details[i].product.name,
                description: payload.purchase_order_details[i].product.description,
                price: payload.purchase_order_details[i].sales_order_detail.price_sell ?? 0,
                qty: payload.purchase_order_details[i].qty ?? 0,
                qty_available: payload.purchase_order_details[i].balance ?? 0,
                qty_delivery: 1,
                remark: payload.purchase_order_details[i].remark ?? null,
            });
        } state.purchase_shipping.item_list = payload.purchase_order_details ?? [];

    },

    SET_PURCHASE_SHIPPING(state, payload) {
        state.purchase_shipping.id = payload.id ?? null;
        state.purchase_shipping.shp_number = payload.shp_number ?? null;
        state.purchase_shipping.type = payload.purchase_order.po_type ?? null;
        state.purchase_shipping.purchase_order_id = payload.purchase_order_id ?? null;
        state.purchase_shipping.po_number = payload.purchase_order.po_number ?? null;

        state.purchase_shipping.supplier_id = payload.purchase_order.supplier_id ?? null;
        state.purchase_shipping.supplier_name = payload.purchase_order.supplier.name ?? null;
        state.purchase_shipping.supplier_email = payload.purchase_order.supplier.email ?? null;
        state.purchase_shipping.supplier_phone = payload.purchase_order.supplier.phone ?? null;
        state.purchase_shipping.supplier_address = payload.purchase_order.supplier.address ?? null;
        state.purchase_shipping.term_payment = payload.purchase_order.term_payment ?? null;

        state.purchase_shipping.shipping_name = payload.purchase_order.shipping_name ?? null;
        state.purchase_shipping.shipping_email = payload.purchase_order.shipping_phone ?? null;
        state.purchase_shipping.shipping_address = payload.purchase_order.shipping_address ?? null;
        state.purchase_shipping.shipping_phone = payload.purchase_order.shipping_phone ?? null;
        state.purchase_shipping.shipping_mark = payload.purchase_order.shipping_mark ?? null;

        state.purchase_shipping.currency_id = payload.purchase_order.currency_id ?? null;
        state.purchase_shipping.term_shipping_id = payload.purchase_order.term_shipping_id ?? null;
        state.purchase_shipping.pph_id = payload.purchase_order.pph_id ?? null;
        state.purchase_shipping.use_vat = payload.purchase_order.po_use_vat ?? null;
        state.purchase_shipping.rate = payload.purchase_order.po_rate ?? null;
        state.purchase_shipping.request_date = payload.shp_request_date ?? null;
        state.purchase_shipping.note = payload.note ?? null;
        state.purchase_shipping.created_by = payload.created_by ?? null;

        state.purchase_shipping.subtotal = payload.shp_subtotal ?? null;
        state.purchase_shipping.vat = payload.shp_vat ?? null;
        state.purchase_shipping.pph = payload.shp_pph ?? null;
        state.purchase_shipping.discount = payload.shp_discount ?? null;
        state.purchase_shipping.total = payload.shp_total ?? null;


        // state.purchase_shipping.item_list = payload.purchase_shipping_details ?? [];
    },
    SET_SUBTOTAL(state, payload) {
        state.purchase_shipping.shp_subtotal = payload;
    },
    SET_TOTAL(state, payload) {
        state.purchase_shipping.shp_total = payload;
    },
    SET_VAT(state, payload) {
        state.purchase_shipping.shp_vat = payload;
    },
    SET_PPH(state, payload) {
        state.purchase_shipping.shp_pph = payload;
    },
    SET_DISCOUNT(state, payload) {
        state.purchase_shipping.shp_discount = payload;
    },
    SET_CURRENT_PAGE(state, payload) {
        state.shipping_intruction.current_page = payload;
    },

    CLEAR_PURCHASE_SHIPPINGS(state) {
        state.purchase_shippings = {};
    },
    CLEAR_STATE(state) {
        state.purchase_shippings = {};
        state.purchase_shipping.id = null;
        state.purchase_shipping.purchase_order_id = null;
        state.purchase_shipping.po_number = null;
        state.purchase_shipping.shp_number = null;

        state.purchase_shipping.supplier_id = null;
        state.purchase_shipping.supplier_name = null;
        state.purchase_shipping.supplier_address = null;
        state.purchase_shipping.supplier_email = null;
        state.purchase_shipping.supplier_phone = null;
        state.purchase_shipping.term_payment = null;

        state.purchase_shipping.shipping_address = null;
        state.purchase_shipping.shipping_name = null;
        state.purchase_shipping.shipping_email = null;
        state.purchase_shipping.shipping_phone = null;
        state.purchase_shipping.shipping_mark = null;

        state.purchase_shipping.currency_id = null;
        state.purchase_shipping.term_shipping_id = null;
        state.purchase_shipping.pph_id = null;
        state.purchase_shipping.discount_percentage = null;

        state.purchase_shipping.rate = null;
        state.purchase_shipping.use_vat = null;
        state.purchase_shipping.request_date = null;
        state.purchase_shipping.note = null;

        state.purchase_shipping.subtotal = null;
        state.purchase_shipping.vat = null;
        state.purchase_shipping.pph = null;
        state.purchase_shipping.discount = null;
        state.purchase_shipping.total = null;

        state.purchase_shipping.product_list = [];
        state.purchase_shipping.item_list = [];
    },
}

const getters = {
    PurchaseShippings: state => state.purchase_shippings,
    PurchaseShipping: state => state.purchase_shipping,
}
export default {
    namespaced: true,
    state,
    mutations,
    getters
}
