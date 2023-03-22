import PurchaseOrder from '@/views/purchase/order/Index.vue'
import CreatePurchaseOrder from '@/views/purchase/order/Create.vue'
import ViewPurchaseOrder from '@/views/purchase/order/View.vue'
import EditPurchaseOrder from '@/views/purchase/order/Edit.vue'


import PurchaseShipping from '@/views/purchase/shipping/Index.vue'
import CreatePurchaseShipping from '@/views/purchase/shipping/Create.vue'
import EditPurchaseShipping from '@/views/purchase/shipping/Edit.vue'
import ViewPurchaseShipping from '@/views/purchase/shipping/View.vue'

import PurchaseInvoice from '@/views/purchase/invoice/Index.vue'
import PurchaseInvoiceAdjustment from '@/views/purchase/adjustment/Index.vue'

export default [
    //purchase order
    {
        path: '/purchase-order',
        name: "purchase-order.index",
        meta: { title: "P-ERP | Purchase order" },
        component: PurchaseOrder
    },
    {
        path: '/purchase-order/create',
        name: "purchase-order.create",
        meta: { title: "P-ERP | Create Purchase order" },
        component: CreatePurchaseOrder
    },
    {
        path: '/purchase-order/view/:id',
        name: "purchase-order.view",
        meta: { title: "P-ERP | View Purchase order" },
        component: ViewPurchaseOrder
    },
    {
        path: '/purchase-order/edit',
        name: "purchase-order.edit",
        meta: { title: "P-ERP | Edit Purchase order" },
        component: EditPurchaseOrder
    },

    //Shipping Intruction
    {
        path: '/purchase-shipping',
        name: "purchase-shipping.index",
        meta: { title: "P-ERP | Shipping Intruction" },
        component: PurchaseShipping
    },
    {
        path: '/purchase-shipping/create',
        name: "purchase-shipping.create",
        meta: { title: "P-ERP | Create Shipping Intruction" },
        component: CreatePurchaseShipping
    },
    {
        path: '/purchase-shipping/edit',
        name: "purchase-shipping.edit",
        meta: { title: "P-ERP | Edit Shipping Intruction" },
        component: EditPurchaseShipping
    },
    {
        path: '/purchase-shipping/view/:id',
        name: "purchase-shipping.view",
        meta: { title: "P-ERP | View Shipping Intruction" },
        component: ViewPurchaseShipping
    },

    {
        path: '/purchase-invoice',
        name: "purchase-invoice",
        meta: { title: "P-ERP | Purchase Invoice" },
        component: PurchaseInvoice
    },
    {
        path: '/purchase-invoice-adjustment',
        name: "purchase-invoice-adjustment",
        meta: { title: "P-ERP | Purchase Invoice Adjustment" },
        component: PurchaseInvoiceAdjustment
    },

]