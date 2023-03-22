const state = () => ({
      widget: [],
      sales_orders: {},
      sales_order: {
            id: null,
            quotation_id: null,

            quo_number: null,
            so_number: null,
            so_status: null,

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
            created_by: null,
            use_vat: false,
            currency_id: 1,
            rate: 0,
            discount_nominal: 0,
            discount_percent: 0,
            term_payment: null,
            term_shipping_id: 1,
            term_and_condition: "Lorem Ipsum is simply dummy text of the printing and typ",
            product_list: [],

            subtotal: 0,
            discount: 0,
            vat: 0,
            additional_cost: 0,
            total: 0,

      },
})
const mutations = {
      SET_WIDGET(state, payload) {
            state.widget = payload;
      },
      SET_SALES_ORDERS(state, payload) {
            state.sales_orders = payload;
      },

      SET_SALES_ORDER(state, payload) {
            state.sales_order.id = payload.id;
            state.sales_order.quotation_id = payload.quotation_id;

            //state.sales_order.quo_number = payload.quotation.quo_number;
            state.sales_order.so_number = payload.so_number;
            state.sales_order.so_status = payload.so_status;

            state.sales_order.customer_id = payload.customer_id;
            state.sales_order.customer_name = payload.customer.name;
            state.sales_order.customer_phone = payload.customer.phone;
            state.sales_order.customer_email = payload.customer.email;
            state.sales_order.customer_address = payload.customer.address;

            state.sales_order.retailer_id = payload.retailer_id;
            state.sales_order.retailer_name = payload.retailer.name;
            state.sales_order.retailer_phone = payload.retailer.phone;
            state.sales_order.retailer_email = payload.retailer.email;
            state.sales_order.retailer_address = payload.retailer.address;

            state.sales_order.shipping_name = payload.so_shipping_name;
            state.sales_order.shipping_email = payload.so_shipping_email;
            state.sales_order.shipping_phone = payload.so_shipping_phone;
            state.sales_order.shipping_address = payload.so_shipping_address;

            state.sales_order.customer_po = payload.customer_po;
            state.sales_order.type_order_id = payload.type_order_id;
            state.sales_order.order_date = payload.so_order_date;
            state.sales_order.request_date = payload.so_request_date;
            state.sales_order.use_vat = payload.so_use_vat;
            state.sales_order.currency_id = payload.currency_id;
            state.sales_order.rate = payload.so_rate;
            state.sales_order.created_by = payload.so_created_by;

            state.sales_order.discount_nominal = payload.so_discount_nominal;
            state.sales_order.discount_percent = payload.so_discount_percent;
            state.sales_order.term_payment = payload.so_term_payment;
            state.sales_order.term_shipping_id = payload.term_shipping_id;
            state.sales_order.product_list = payload.sales_order_details;
            state.sales_order.subtotal = payload.so_subtotal;
            state.sales_order.discount = payload.so_discount;
            state.sales_order.vat = payload.so_vat;
            state.sales_order.additional_cost = payload.so_additional_cost;
            state.sales_order.total = payload.so_total;
            state.sales_order.term_and_condition = payload.so_term_and_condition;
      },

      SET_CUSTOMER(state, payload) {
            state.sales_order.customer_id = payload.id;
            state.sales_order.customer_name = payload.name;
            state.sales_order.customer_phone = payload.phone;
            state.sales_order.customer_email = payload.email;
            state.sales_order.customer_address = payload.address;
            state.sales_order.term_payment = payload.term_payment.name;
      },

      SET_RETAILER(state, payload) {
            state.sales_order.retailer_id = payload.id;
            state.sales_order.retailer_name = payload.name;
            state.sales_order.retailer_phone = payload.phone;
            state.sales_order.retailer_email = payload.email;
            state.sales_order.retailer_address = payload.address;
      },

      SET_SHIPPING(state, payload) {
            state.sales_order.shipping_name = payload.name;
            state.sales_order.shipping_email = payload.email;
            state.sales_order.shipping_phone = payload.phone;
            state.sales_order.shipping_address = payload.address;
      },
      SET_PRODUCT_LIST(state, payload) {
            state.sales_order.product_list.push({
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
      SET_SUBTOTAL(state, payload) {
            state.sales_order.subtotal = payload;
      },
      SET_DISCOUNT(state, payload) {
            state.sales_order.discount = payload;
      },
      SET_VAT(state, payload) {
            state.sales_order.vat = payload;
      },
      SET_ADDITIONAL_COST(state, payload) {
            state.sales_order.additional_cost = payload;
      },
      SET_TOTAL(state, payload) {
            state.sales_order.total = payload;
      },
      SET_CURRENT_PAGE(state, payload) {
            state.sales_orders.current_page = payload;
      },

      CLEAR_PRODUCT_LIST(state) {
            state.sales_order.product_list = [];
      },
      CLEAR_STATE(state) {
            state.widget = [];
            state.sales_orders = {};
            state.sales_order = {
                  id: null,
                  quotation_id: null,

                  quo_number: null,
                  so_number: null,

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
                  created_by: null,

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

                  product_list: [],
                  subtotal: 0,
                  discount: 0,
                  vat: 0,
                  additional_cost: 0,
                  total: 0,

            };
      },
}

const getters = {
      Widget: state => state.widget,
      SalesOrders: state => state.sales_orders,
      SalesOrder: state => state.sales_order,
}

export default {
      namespaced: true,
      state,
      mutations,
      getters
}
