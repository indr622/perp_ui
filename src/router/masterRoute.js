import AccountSetting from '@/views/master/account/Index.vue'
import CompanyProfile from '@/views/master/company_profile/Index.vue'
import User from '@/views/master/user/Index.vue'
import Role from '@/views/master/rbac/Role.vue'
import Permission from '@/views/master/rbac/Permission.vue'
import Custom from '@/views/master/custom/Index.vue'
import ProductionStep from '@/views/master/production_step/Index.vue'
import Warehouse from '@/views/master/warehouse/Index.vue'
import CreateWarehouse from '@/views/master/warehouse/Create.vue'
import EditWarehouse from '@/views/master/warehouse/Edit.vue'
import Currency from '@/views/master/currency/Index.vue'
import PaymentMethod from '@/views/master/payment_method/Index.vue'
import Pph from '@/views/master/pph/Index.vue'
import Unit from '@/views/master/unit/Index.vue'
import Product from '@/views/master/product/Index.vue'
import ProductCreate from '@/views/master/product/Create.vue'
import ProductEdit from '@/views/master/product/Edit.vue'
import Item from '@/views/master/item/Index.vue'
import CreateItem from '@/views/master/item/Create.vue'
import EditItem from '@/views/master/item/Edit.vue'
import Supplier from '@/views/master/supplier/Index.vue'
import CreateSupplier from '@/views/master/supplier/Create.vue'
import EditSupplier from '@/views/master/supplier/Edit.vue'
import Customer from '@/views/master/customer/Index.vue'
import CreateCustomer from '@/views/master/customer/Create.vue'
import EditCustomer from '@/views/master/customer/Edit.vue'
import Retailer from '@/views/master/retailer/Index.vue'
import CreateRetailer from '@/views/master/retailer/Create.vue'
import EditRetailer from '@/views/master/retailer/Edit.vue'
import Configuration from '@/views/master/configuration/Index.vue'

export default [
    {
        path: '/master',
        name: 'master',
        component: () => import('@/views/master/Index.vue'),
        children: [
            //Product Index
            {
                path: 'product',
                name: "product.index",
                meta: { title: "P-ERP | Product" },
                component: Product
            },
            //Product Create
            {
                path: 'product/create',
                name: "product.create",
                meta: { title: "P-ERP | Product" },
                component: ProductCreate
            },
            //Product Edit
            {
                path: 'product/edit/:id',
                name: "product.edit",
                meta: { title: "P-ERP | Product" },
                component: ProductEdit
            },
            //Supplier Index
            {
                path: 'suppliers',
                name: "supplier.index",
                meta: { title: "P-ERP | Supppliers" },
                component: Supplier
            },
            //Supplier Create
            {
                path: 'suppliers/create',
                name: "supplier.create",
                meta: { title: "P-ERP | Create Suppplier" },
                component: CreateSupplier
            },
            //Supplier Edit
            {
                path: 'suppliers/edit/:id',
                name: "supplier.edit",
                meta: { title: "P-ERP | Edit Suppplier" },
                component: EditSupplier
            },
            //Customer Index
            {
                path: 'customers',
                name: "customer.index",
                meta: { title: "P-ERP | Customer" },
                component: Customer
            },
            //Customer Create
            {
                path: 'customers/create',
                name: "customer.create",
                meta: { title: "P-ERP | Create Customer" },
                component: CreateCustomer
            },
            //Customer Edit
            {
                path: 'customers/edit/:id',
                name: "customer.edit",
                meta: { title: "P-ERP | Edit Customer" },
                component: EditCustomer
            },
            //Retailer Index
            {
                path: 'retailers',
                name: "retailer.index",
                meta: { title: "P-ERP | Retailer" },
                component: Retailer
            },
            //Retailer Create
            {
                path: 'retailers/create',
                name: "retailer.create",
                meta: { title: "P-ERP | Create Retailer" },
                component: CreateRetailer
            },
            //Retailer Edit
            {
                path: 'retailers/edit/:id',
                name: "retailer.edit",
                meta: { title: "P-ERP | Edit Retailer" },
                component: EditRetailer
            },
            //Unit Index
            {
                path: 'item',
                name: "item.index",
                meta: { title: "P-ERP | Item" },
                component: Item
            },
            //Unit Create
            {
                path: 'item/create',
                name: "item.create",
                meta: { title: "P-ERP | Create Item" },
                component: CreateItem
            },
            {
                path: 'item/edit/:id',
                name: "item.edit",
                meta: { title: "P-ERP | Edit Item" },
                component: EditItem
            },
            //Account Settings
            {
                path: 'account-settings',
                name: "account",
                meta: { title: "P-ERP | Account Settings" },
                component: AccountSetting
            },
            //Company Profile
            {
                path: 'company-profile',
                name: "company-profile",
                meta: { title: "P-ERP | Company Profile" },
                component: CompanyProfile
            },
            //Users
            {
                path: 'users',
                name: "users.index",
                meta: { title: "P-ERP | Users" },
                component: User
            },
            //Role
            {
                path: 'role',
                name: "role.index",
                meta: { title: "P-ERP | Role Permissions" },
                component: Role
            },
            // Permission Set
            {
                path: 'permission/:id',
                name: 'permission.set',
                meta: { title: "P-ERP | Assign Permissions" },
                component: Permission
            },
            // Custom
            {
                path: 'custom',
                name: "custom.index",
                meta: { title: "P-ERP | Custom" },
                component: Custom
            },
            // Production Step
            {
                path: 'production-step',
                name: "production-step.index",
                meta: { title: "P-ERP | Production Step" },
                component: ProductionStep
            },
            // WareHouse
            {
                path: 'warehouse',
                name: "warehouse.index",
                meta: { title: "P-ERP | Warehouse" },
                component: Warehouse
            },
            {
                path: 'warehouse/create',
                name: "warehouse.create",
                meta: { title: "P-ERP | Create Warehouse" },
                component: CreateWarehouse
            },
            {
                path: 'warehouse/edit/:id',
                name: "warehouse.edit",
                meta: { title: "P-ERP | Create Warehouse" },
                component: EditWarehouse
            },
            //Currency
            {
                path: 'currency',
                name: "currency.index",
                meta: { title: "P-ERP | Currency" },
                component: Currency
            },
            //Payment Method
            {
                path: 'payment-method',
                name: "payment-method.index",
                meta: { title: "P-ERP | Payment Method" },
                component: PaymentMethod
            },
            //PPH
            {
                path: 'pph',
                name: "pph.index",
                meta: { title: "P-ERP | PPH" },
                component: Pph
            },
            //Unit
            {
                path: 'unit',
                name: "unit.index",
                meta: { title: "P-ERP | Unit" },
                component: Unit
            },

            {
                path: 'configuration-system',
                name: "configuration.index",
                meta: { title: "P-ERP | Configuration" },
                component: Configuration
            },

        ]
    }
]