import SalesInvoice from '@/views/sales_invoice/invoice/Index.vue'
import CreateSalesInvoice from '@/views/sales_invoice/invoice/Create.vue'
import ViewSalesInvoice from '@/views/sales_invoice/invoice/View.vue'
import EditSalesInvoice from '@/views/sales_invoice/invoice/Edit.vue'

export default [
      //Sales Invoice
      {
            path: '/sales-invoice',
            name: "sales-invoice.index",
            meta: { title: "P-ERP | Sales Invoice" },
            component: SalesInvoice
      },
      {
            path: '/sales-invoice/create',
            name: "sales-invoice.create",
            meta: { title: "P-ERP | Create Sales Invoice" },
            component: CreateSalesInvoice
      },
      {
            path: '/sales-invoice/view/:id',
            name: "sales-invoice.view",
            meta: { title: "P-ERP | View Sales Invoice" },
            component: ViewSalesInvoice
      },
      {
            path: '/sales-invoice/edit',
            name: "sales-invoice.edit",
            meta: { title: "P-ERP | Edit Sales Invoice" },
            component: EditSalesInvoice
      },

]