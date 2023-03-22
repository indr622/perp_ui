import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css';
import './style/main.css';
import './plugins/apexChart.js';
import api from './helpers/api';
import Permissions from './mixins/permission.js'
import Rule from './mixins/rule.js'
import VNumeric from "vuetify-numeric/vuetify-numeric.umd.min";
import Vue2Filters from 'vue2-filters'
import VCurrencyField from 'v-currency-field'


Vue.use(api);
Vue.use(VNumeric);
Vue.use(Vue2Filters);
Vue.mixin(Permissions);
Vue.mixin(Rule);
Vue.config.productionTip = false


Vue.filter('formatUang', function (value) {
  var num = new Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.');
  var pos = num.lastIndexOf('.');
  num = num.substring(0, pos) + ',' + num.substring(pos + 1)
  return num;
});
Vue.use(VCurrencyField, {
  min: null,
  max: null,
  defaultValue: 0.00,
  valueAsInteger: false,
  allowNegative: false
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
