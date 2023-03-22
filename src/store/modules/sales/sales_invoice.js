const state = () => ({
      widget: [],
      from_so: false,
      from_shp: false,
      sales_invoices: {},
      sales_invoice: {
            id: null,
            document_no: null,
            status: "UNPAID",
            sales_order_id: null,
            purchase_shipping_id: null,

            so_number: null,
            po_number: null,
            shp_number: null,
            inv_number: null,

            order_date: null,
            delivery_date: new Date().toJSON().slice(0, 10),
            invoice_date: new Date().toJSON().slice(0, 10),

            customer_id: null,
            customer_name: null,
            customer_phone: null,
            customer_email: null,
            customer_address: null,
            term_payment: null,

            shipping_name: null,
            shipping_email: null,
            shipping_phone: null,
            shipping_address: null,
            term_shipping_id: null,
            currency_id: null,
            created_by: null,

            discount_percent: 0,
            discount_nominal: 0,

            use_vat: false,
            rate: 0,
            product_list: [],

            subtotal: 0,
            discount: 0,
            vat: 0,
            prepaid: 0,
            additional_cost: 0,
            total: 0,

      },
      invoice_status: ["UNPAID", "PAID", "PARTIAL", "CANCEL"],
})

const mutations = {
      SET_WIDGET(state, payload) {
            state.widget = payload;
      },
      SET_SALES_INVOICES(state, payload) {
            state.sales_invoices = payload;
      },

      SET_SALES_INVOICE(state, payload) {
            state.sales_invoice.id = payload.id;
            state.sales_invoice.document_no = payload.document_no;
            state.sales_invoice.status = payload.inv_status;
            state.sales_invoice.sales_order_id = payload.sales_order_id;
            state.sales_invoice.purchase_shipping_id = payload.purchase_shipping_id;

            state.sales_invoice.so_number = payload.sales_order.so_number;
            state.sales_invoice.inv_number = payload.inv_number;

            state.sales_invoice.order_date = payload.sales_order.so_order_date;
            state.sales_invoice.delivery_date = payload.inv_delivery_date;
            state.sales_invoice.invoice_date = payload.inv_date;

            state.sales_invoice.customer_id = payload.customer.id;
            state.sales_invoice.customer_name = payload.customer.name;
            state.sales_invoice.customer_phone = payload.customer.phone;
            state.sales_invoice.customer_email = payload.customer.email;
            state.sales_invoice.customer_address = payload.customer.address;

            state.sales_invoice.shipping_name = payload.shipping_name;
            state.sales_invoice.shipping_email = payload.shipping_email;
            state.sales_invoice.shipping_phone = payload.shipping_phone;
            state.sales_invoice.shipping_address = payload.shipping_address;
            state.sales_invoice.term_shipping_id = payload.inv_term_shipping_id;
            state.sales_invoice.currency_id = payload.currency_id;
            state.sales_invoice.created_by = payload.created_by;

            state.sales_invoice.discount_percent = payload.inv_discount_percent;
            state.sales_invoice.discount_nominal = payload.inv_discount_nominal;

            state.sales_invoice.use_vat = payload.sales_order.so_use_vat;
            state.sales_invoice.rate = payload.rate;
            state.sales_invoice.additional_cost = payload.sales_order.so_additional_cost;

            state.sales_invoice.product_list = payload.product_list;
      },

      SET_FROM_SHP(state, payload) {
            state.sales_invoice.sales_order_id = payload.purchase_order.sales_order_id;
            state.sales_invoice.purchase_order_id = payload.purchase_order_id;
            state.sales_invoice.purchase_shipping_id = payload.id;
            state.sales_invoice.shp_number = payload.shp_number;
            state.sales_invoice.po_number = payload.purchase_order.po_number;
            state.sales_invoice.so_number = payload.purchase_order.sales_order.so_number;

            state.sales_invoice.request_date = payload.purchase_order.po_request_date;

            state.sales_invoice.customer_id = payload.purchase_order.sales_order.customer.id;
            state.sales_invoice.customer_name = payload.purchase_order.sales_order.customer.name;
            state.sales_invoice.customer_phone = payload.purchase_order.sales_order.customer.phone;
            state.sales_invoice.customer_email = payload.purchase_order.sales_order.customer.email;
            state.sales_invoice.customer_address = payload.purchase_order.sales_order.customer.address;


            state.sales_invoice.shipping_name = payload.purchase_order.shipping_name;
            state.sales_invoice.shipping_email = payload.purchase_order.shipping_email;
            state.sales_invoice.shipping_phone = payload.purchase_order.shipping_phone;
            state.sales_invoice.shipping_address = payload.purchase_order.shipping_address;

            state.sales_invoice.currency_id = payload.purchase_order.currency_id;
            state.sales_invoice.use_vat = payload.purchase_order.so_use_vat;
            state.sales_invoice.rate = payload.rate;


      },

      SET_FROM_SO(state, payload) {
            state.from_so = true;
            state.sales_invoice.sales_order_id = payload.id;
            state.sales_invoice.purchase_order_id = null;
            state.sales_invoice.purchase_shipping_id = null;
            state.sales_invoice.shp_number = null;
            state.sales_invoice.po_number = null;
            state.sales_invoice.so_number = payload.so_number;

            state.sales_invoice.order_date = payload.so_order_date;

            state.sales_invoice.customer_id = payload.customer.id;
            state.sales_invoice.customer_name = payload.customer.name;
            state.sales_invoice.customer_phone = payload.customer.phone;
            state.sales_invoice.customer_email = payload.customer.email;
            state.sales_invoice.customer_address = payload.customer.address;
            state.sales_invoice.term_payment = payload.so_term_payment;


            state.sales_invoice.shipping_name = payload.so_shipping_name;
            state.sales_invoice.shipping_email = payload.so_shipping_email;
            state.sales_invoice.shipping_phone = payload.so_shipping_phone;
            state.sales_invoice.shipping_address = payload.so_shipping_address;
            state.sales_invoice.term_shipping_id = payload.term_shipping_id;

            state.sales_invoice.discount_percent = payload.so_discount_percent;
            state.sales_invoice.discount_nominal = payload.so_discount_nominal;

            state.sales_invoice.currency_id = payload.currency_id;
            state.sales_invoice.use_vat = payload.so_use_vat == 1 ? true : false;
            state.sales_invoice.rate = payload.rate;

            state.sales_invoice.product_list = payload.sales_order_details;


      },
      SET_SUBTOTAL(state, payload) {
            state.sales_invoice.subtotal = payload;
      },
      SET_DISCOUNT(state, payload) {
            state.sales_invoice.discount = payload;
      },
      SET_VAT(state, payload) {
            state.sales_invoice.vat = payload;
      },
      SET_ADDITIONAL_COST(state, payload) {
            state.sales_invoice.additional_cost = payload;
      },
      SET_TOTAL(state, payload) {
            state.sales_invoice.total = payload;
      },

      SET_CURRENT_PAGE(state, payload) {
            state.sales_invoices.current_page = payload;
      },
      CLEAR_SALES_INVOICES(state) {
            state.sales_invoices = {};
      },
      CLEAR_STATE(state) {
            state.from_so = false;
            state.from_shp = false;
            state.widget = [];
            state.sales_invoices = {};

            state.sales_invoice.id = null;
            state.sales_invoice.document_no = null;
            state.sales_invoice.sales_order_id = null;
            state.sales_invoice.purchase_order_id = null;
            state.sales_invoice.purchase_shipping_id = null;

            state.sales_invoice.so_number = null;
            state.sales_invoice.po_number = null;
            state.sales_invoice.shp_number = null;
            state.sales_invoice.inv_number = null;

            state.sales_invoice.request_date = null;
            state.sales_invoice.invoice_date = new Date().toJSON().slice(0, 10);

            state.sales_invoice.customer_id = null;
            state.sales_invoice.customer_name = null;
            state.sales_invoice.customer_phone = null;
            state.sales_invoice.customer_email = null;
            state.sales_invoice.customer_address = null;

            state.sales_invoice.shipping_name = null;
            state.sales_invoice.shipping_email = null;
            state.sales_invoice.shipping_phone = null;
            state.sales_invoice.shipping_address = null;

            state.sales_invoice.currency_id = null;
            state.sales_invoice.use_vat = false;
            state.sales_invoice.rate = 0;

            state.sales_invoice.discount_percent = 0;
            state.sales_invoice.discount_nominal = 0;

            state.sales_invoice.subtotal = 0;
            state.sales_invoice.discount = 0;
            state.sales_invoice.vat = 0;
            state.sales_invoice.additional_cost = 0;
            state.sales_invoice.total = 0;

      },
}

const getters = {
      InvoiceStatus: state => state.invoice_status,
      SalesInvoices: state => state.sales_invoices,
      SalesInvoice: state => state.sales_invoice,
}

export default {
      namespaced: true,
      state,
      mutations,
      getters
}
