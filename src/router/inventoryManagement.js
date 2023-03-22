import Index from '@/views/inventory/inventory_in/Index.vue'
import Create from '@/views/inventory/inventory_in/Create.vue'

export default [
    {
        path: '/inventory-in',
        name: "inventory-in.index",
        meta: { title: "P-ERP | Inventory In" },
        component: Index
    },
    {
        path: '/inventory-in/create',
        name: "inventory-in.create",
        meta: { title: "P-ERP | Inventory In" },
        component: Create
    },

]