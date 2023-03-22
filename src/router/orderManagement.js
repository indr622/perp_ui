
import QuotationIndex from '@/views/orders/quotation/Index.vue'
import QuotationCreate from '@/views/orders/quotation/Create.vue'
import QuotationView from '@/views/orders/quotation/View.vue'
import QuotationEdit from '@/views/orders/quotation/Edit.vue'


import SalesOrderIndex from '@/views/orders/sales_order/Index.vue'
import SalesOrderCreate from '@/views/orders/sales_order/Create.vue'
import SalesOrderView from '@/views/orders/sales_order/View.vue'
import SalesOrderEdit from '@/views/orders/sales_order/Edit.vue'

import OrderSummaryIndex from '@/views/orders/summary/Index.vue'


export default [
    //Quotation
    {
        path: '/quotation',
        name: 'quotation.index',
        meta: { title: "P-ERP | Quotation List" },
        component: QuotationIndex,
    },
    {
        path: '/quotation/view/:id',
        name: 'quotation.view',
        meta: { title: "P-ERP | Quotation View" },
        component: QuotationView
    },
    {
        path: '/quotation/create',
        name: 'quotation.create',
        meta: { title: "P-ERP | Create Quotation" },
        component: QuotationCreate
    },
    {
        path: '/quotation/edit',
        name: 'quotation.edit',
        meta: { title: "P-ERP | Edit Quotation" },
        component: QuotationEdit
    },

    //Sales Order
    {
        path: '/sales-order',
        name: 'sales-order.index',
        meta: { title: "P-ERP | Sales Order List" },
        component: SalesOrderIndex
    },
    {
        path: '/sales-order/create',
        name: 'sales-order.create',
        meta: { title: "P-ERP | Create Sales Order" },
        component: SalesOrderCreate
    },
    {
        path: '/sales-order/view/:id',
        name: 'sales-order.view',
        meta: { title: "P-ERP | Details Sales Order" },
        component: SalesOrderView
    },
    {
        path: '/sales-order/edit',
        name: 'sales-order.edit',
        meta: { title: "P-ERP | Edit Sales Order" },
        component: SalesOrderEdit
    },

    {
        path: '/order-summary',
        name: 'order-summary.index',
        meta: { title: "P-ERP | Order Summary" },
        component: OrderSummaryIndex
    },
]