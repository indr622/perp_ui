import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
//import Cookies from 'js-cookie';
import SecureLS from "secure-ls";
import Auth from "./modules/auth";
import Notification from "./modules/notification";
import Global from "./modules/global";
import Dashboard from "./modules/dashboard";
import Retailer from "./modules/master/retailer";
import Unit from './modules/master/unit';
import Currency from './modules/master/currency';
import Pph from './modules/master/pph';
import TermPayment from './modules/master/term_payment';
import TermShipping from './modules/master/term_shipping';
import Warehouse from './modules/master/warehouse';
import Group from './modules/master/group';
import SubGroup from './modules/master/sub_group';
import Customer from './modules/master/customer';
import Supplier from './modules/master/supplier';
import Product from './modules/master/product';
import Item from './modules/master/item';
import Quotation from './modules/order/quotation';
import SalesOrder from './modules/order/sales_order';
import PurchaseOrder from './modules/purchase/purchase_order';
import PurchaseShipping from './modules/purchase/purchase_shipping';
import SalesInvoice from './modules/sales/sales_invoice';

Vue.use(Vuex)

const secureLS = new SecureLS({
  encodingType: 'aes',
  encryptionSecret: 'vue-cart-persist'
});
const authstate = createPersistedState({
  key: 'gmk-application',
  storage: {
    getItem: (key) => secureLS.get(key),
    setItem: (key, value) => secureLS.set(key, value),
    removeItem: (key) => secureLS.remove(key),
  },
});

const store = new Vuex.Store({
  modules: {
    auth: Auth,
    global: Global,
    nofication: Notification,
    dashboard: Dashboard,
    unit: Unit,
    currency: Currency,
    pph: Pph,
    group: Group,
    sub_group: SubGroup,
    term_payment: TermPayment,
    term_shipping: TermShipping,
    customer: Customer,
    supplier: Supplier,
    warehouse: Warehouse,
    retailer: Retailer,
    product: Product,
    item: Item,
    quotation: Quotation,
    sales_order: SalesOrder,
    purchase_order: PurchaseOrder,
    purchase_shipping: PurchaseShipping,
    sales_invoice: SalesInvoice
  },
  plugins: [authstate],
});


export default store;
