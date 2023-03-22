import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index";
import Login from '@/views/auth/Login.vue'
import Dashboard from '@/views/dashboard/Index.vue'
import NotFound from '@/components/error/NotFound.vue'
import masterRoute from './masterRoute'
import orderManagement from './orderManagement';
import productionManagement from './productionManagement';
import purchaseManagement from './purchaseManagement';
import salesInvoiceManagement from './salesInvoiceManagement';
import inventoryManagement from './inventoryManagement';

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: "login", meta: { title: "P-ERP | Login" }, component: Login },
  { path: '/dashboard', name: 'dashboard', meta: { title: "P-ERP | Dashboard" }, component: Dashboard },
  { path: "/404", name: "NotFound", meta: { title: "PAGE NOT FOUND", }, component: NotFound },
  { path: "*", redirect: "/404", },

  ...masterRoute,
  ...orderManagement,
  ...productionManagement,
  ...purchaseManagement,
  ...salesInvoiceManagement,
  ...inventoryManagement,
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters["auth/Authenticated"]) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router
