import WorkOrder from '@/views/productions/work_order/Index.vue'
import CreateWorkOrder from '@/views/productions/work_order/Create.vue'
import DetailWorkOrder from '@/views/productions/work_order/Detail.vue'

import IndexWorkProgress from '@/views/productions/work_progress/Index.vue'
import CreateWorkProgress from '@/views/productions/work_progress/Create.vue'

export default [
    {
        path: '/work-order',
        name: "work-order.index",
        meta: { title: "P-ERP | Work Order" },
        component: WorkOrder
    },
    {
        path: '/work-order/create',
        name: "work-order.create",
        meta: { title: "P-ERP | Create Work Order" },
        component: CreateWorkOrder
    },
    {
        path: '/work-order/:id',
        name: "work-order.detail",
        meta: { title: "P-ERP | Detail Work Order" },
        component: DetailWorkOrder
    },

    {
        path: '/work-progress/create',
        name: "work-progress.create",
        meta: { title: "P-ERP | Work Progress" },
        component: CreateWorkProgress
    },

    {
        path: '/work-progress',
        name: "work-progress.index",
        meta: { title: "P-ERP | Work Progress" },
        component: IndexWorkProgress
    },

]