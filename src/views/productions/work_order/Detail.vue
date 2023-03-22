<template>
    <main-layout>
        <base-header>
            <template #name> Work Order</template>
            <template #breadcrumbs>
                <v-breadcrumbs :items="breadcrumbs" class="pa-0">
                    <template #divider>
                        <v-icon>mdi-chevron-right</v-icon>
                    </template>
                </v-breadcrumbs>
            </template>
        </base-header>
        <v-card class="mx-2">
            <!-- App Bar -->
            <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
                <v-toolbar-title><v-chip>Pending</v-chip></v-toolbar-title>
                <v-toolbar-title><v-icon class="float-end ma-4" color="primary">mdi-cloud-print</v-icon></v-toolbar-title>
                <v-toolbar-title><v-icon class="float-end ma-4" color="success">mdi-download</v-icon></v-toolbar-title>
                <v-toolbar-title><v-icon class="float-end ma-4">mdi-pencil</v-icon></v-toolbar-title>
                <v-toolbar-title><v-icon class="float-end ma-4" color="primary">mdi-motion-play</v-icon></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn small color="secondary" class="ma-1" @click="backForm()">
                    <v-icon left>mdi-arrow-left</v-icon> Back
                </v-btn>
            </v-app-bar>
            <v-divider></v-divider>
            <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
                <v-toolbar-title>
                    <h6>No. Work Order</h6>
                    <h6></h6>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title>
                    <h6> Workplace</h6>
                    <h6></h6>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title>
                    <h6>Order Date</h6>
                    <h6></h6>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title>
                    <h6>Due Date</h6>
                    <h6></h6>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title>
                    <h6>Estimate Date</h6>
                    <h6></h6>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title>
                    <h6>Created By</h6>
                    <h6></h6>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title>
                    <h6>Created At</h6>
                    <h6></h6>
                </v-toolbar-title>
                <v-spacer></v-spacer>
            </v-app-bar>
            <v-row>
                <v-col>
                    <v-card-title>
                        <h5>Product To Manufacture</h5>
                    </v-card-title>
                </v-col>
            </v-row>
            <v-simple-table class="mx-2 mb-3" fixed-header>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left" width="1%">#</th>
                            <th class="text-left" width="12%">No Sales Order</th>
                            <th class="text-left" width="12%">Customer</th>
                            <th class="text-left" width="15%">Product Name</th>
                            <th class="text-left" width="9%">Item Name</th>
                            <th class="text-left" width="7%">Unit</th>
                            <th class="text-left" width="7%">Qty</th>
                            <th class="text-left" width="10%">Remark</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in WorkOrderDetail" :key="index">
                            <td class="text-left">{{ index + 1 }}</td>
                            <td class="text-left">{{ item.sales_order_no }}</td>
                            <td class="text-left">{{ item.customer_name }}</td>
                            <td class="text-left">{{ item.product_name }}</td>
                            <td class="text-left">{{ item.item_name }}</td>
                            <td class="text-left">{{ item.unit }}</td>
                            <td class="text-left">{{ item.qty }}</td>
                            <td class="text-left">{{ item.remark }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card>
    </main-layout>
</template>
  
<script>
import MainLayout from "@/layouts/MainLayout.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
    name: "CreatePurchaseOrder",
    data() {
        return {
            supplierDialog: false,
            salesOrderDialog: false,
            purchaseOrderDialog: false,
            btnLoading: false,
            form_valid: true,
        };
    },
    methods: {
        ...mapMutations("purchase_order", ["CLEAR_FORM"]),

        store: async function () {
            if (this.$refs.PurchaseOrder.validate()) {
                this.btnLoading = true;
                await this.$axios
                    .post("/purchase-order", this.PurchaseOrder, {
                        headers: {
                            Authorization: this.$store.getters["auth/Token"],
                        },
                    })
                    .then(() => {
                        this.btnLoading = false;
                        this.CLEAR_FORM();
                        this.$router.push({ name: "purchase-order.index" });
                    })
                    .catch(() => {
                        this.btnLoading = false;
                    });
            }
        },

        storeNew: async function () {
            if (this.$refs.PurchaseOrder.validate()) {
                this.btnLoading = true;
                await this.$axios
                    .post("/purchase-order", this.PurchaseOrder, {
                        headers: {
                            Authorization: this.$store.getters["auth/Token"],
                        },
                    })
                    .then(() => {
                        this.btnLoading = false;
                        this.CLEAR_FORM();
                    })
                    .catch(() => {
                        this.btnLoading = false;
                    });
            }
        },

        clear() {
            this.CLEAR_FORM();
        },

        backForm() {
            this.CLEAR_FORM();
            this.$router.push({ name: "work-order.index" });
        },
    },
    created() {
        this.form_valid = false;
        this.breadcrumbs = [
            { text: "Production", disabled: true },
            { text: "Work Order", disabled: true },
            { text: "Detail" },
        ];
    },

    computed: {
        ...mapGetters("purchase_order", {
            PurchaseOrder: "PurchaseOrder",
        }),
    },
    components: {
        MainLayout,
        BaseHeader,
    },
};
</script>