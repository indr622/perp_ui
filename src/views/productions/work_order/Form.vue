<template>
    <div>
        <v-row dense class="mx-1 mb-4">
            <base-column :lg="3" :md="6" :sm="12">
                <v-text-field v-model="PurchaseOrder.so_number" readonly placeholder="Work Order" outlined dense
                    :append-icon="'mdi-magnify'" hide-details></v-text-field>
            </base-column>
        </v-row>
        <v-divider></v-divider>
        <v-row dense>
            <base-column :lg="3" :md="6" :sm="12">
                <v-card-title>
                    Work Order Information
                </v-card-title>
            </base-column>
        </v-row>
        <v-row dense class="mx-2 mt-6 mb-6">
            <base-column :lg="9" :md="9" :sm="12">
                <v-row>
                    <base-column :lg="3" :md="12" :sm="12">
                        <v-text-field label="Due Date" outlined type="date" dense></v-text-field>
                    </base-column>
                    <base-column :lg="3" :md="12" :sm="12">
                        <v-text-field label="Estimate Finish" outlined type="date" dense></v-text-field>
                    </base-column>
                    <base-column :lg="3" :md="12" :sm="12">
                        <v-select label="Work Place" outlined dense></v-select>
                    </base-column>
                    <base-column :lg="3" :md="12" :sm="12">
                        <v-text-field label="Line" outlined dense></v-text-field>
                    </base-column>
                </v-row>
            </base-column>
        </v-row>
        <v-divider></v-divider>
        <v-row dense class="mx-2 mt-6 mb-6">
        </v-row>

        <v-dialog v-if="dialogPurchase" v-model="dialogPurchase" max-width="1200px" persistent>
            <purchase-modal v-on:closePurchaseDialog="closePurchaseDialog" v-on:selectPurchase="selectPurchase" />
        </v-dialog>
    </div>
</template>
  
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import BaseColumn from "@/components/base/BaseColumn.vue";
import PurchaseOrderModal from "@/components/modal/PurchaseOrderModal.vue";
export default {
    name: "FormPurchaseOrder",

    data() {
        return {
            dialogPurchase: false,
        };
    },

    created() {
        this.getPph();
        this.getCurrency();
        this.getTermShipping();
    },
    methods: {
        ...mapActions("pph", ["setPph"]),
        ...mapMutations("purchase_order", ["CLEAR_FORM", "SET_PO_FROM_SO"]),
        async getPph() {
            await this.$axios("/pph?active=1", {
                headers: {
                    Authorization: this.$store.getters["auth/Token"],
                },
            }).then(({ data }) => {
                this.$store.commit("pph/SET_PPHS", data.pph);
            });
        },
        async getCurrency() {
            await this.$axios("/currency?active=1", {
                headers: {
                    Authorization: this.$store.getters["auth/Token"],
                },
            }).then(({ data }) => {
                this.$store.commit("currency/SET_CURRENCIES", data.currency);
            });
        },

        async getTermShipping() {
            await this.$axios("/term-shipping?active=1", {
                headers: {
                    Authorization: this.$store.getters["auth/Token"],
                },
            }).then(({ data }) => {
                this.$store.commit(
                    "term_shipping/SET_TERM_SHIPPING",
                    data.term_shipping
                );
            });
        },

        changePPH(val) {
            this.$axios
                .get("/pph/" + val, {
                    headers: {
                        Authorization: this.$store.getters["auth/Token"],
                    },
                })
                .then(({ data }) => {
                    this.setPph(data.pph);
                });
        },

        selectSupplier(val) {
            this.$store.commit("purchase_order/SET_SUPPLIER", val);
        },
        selectCustomer(val) {
            this.$store.commit("purchase_order/SET_SHIPPING", val);
        },
        selectWarehouse(val) {
            this.$store.commit("purchase_order/SET_SHIPPING", val);
        },

        selectPurchase(val) {
            this.$axios
                .get("/purchase-order/" + val.id, {
                    headers: {
                        Authorization: this.$store.getters["auth/Token"],
                    },
                })
                .then(({ data }) => {
                    this.$store.commit("purchase_order/SET_PURCHASE_ORDER", data.purchase_orders);
                    this.$router.push("/purchase-order/edit");
                })
                .catch((e) => {
                    alert(e);
                });
        },
        openPurchaseOrderDialog() {
            this.dialogPurchase = true;
        },
        closePurchaseDialog() {
            this.dialogPurchase = false;
        },
        openSupplierDialog() {
            this.dialogSupplier = true;
        },
        closeSupplierDialog() {
            this.dialogSupplier = false;
        },
        openShippingDialog() {
            this.dialogShipping = true;
        },
        closeShippingDialog() {
            this.dialogShipping = false;
        },
        changePurchaseType(val) {
            if (val === "material") {
                this.$store.commit("purchase_order/CLEAR_PRODUCT_LIST");
            } else {
                this.$store.commit("purchase_order/CLEAR_ITEM_LIST");
            }
        },

        openSalesOrderDialog() {
            this.dialogSalesOrder = true;
        },
        closeSalesOrderDialog() {
            this.dialogSalesOrder = false;
        },

        selectSalesOrder(sales_order) {
            this.$axios
                .get("/sales-order/" + sales_order.id, {
                    headers: {
                        Authorization: this.$store.getters["auth/Token"],
                    },
                })
                .then(({ data }) => {
                    this.$store.commit("purchase_order/CLEAR_FORM");
                    this.$store.commit("purchase_order/SET_PO_FORM_SO", data.sales_order);
                    this.$store.commit("purchase_order/SET_DISABLED_PO_TYPE");

                })
                .catch(() => {
                    this.loading = true;
                });
        },
    },
    computed: {
        ...mapState("purchase_order", {
            PurchaseOrder: (state) => state.purchase_order,
        }),
        ...mapGetters("purchase_order", {
            PURCHASE_TYPE: "PurchaseType",
            PURCHASE_STATUS: "PurchaseStatus",
            DISABLED_PO_TYPE: "DisabledPoType",
        }),
        ...mapGetters("pph", {
            PPHS: "Pphs",
        }),
        ...mapGetters("currency", {
            CURRENCIES: "Currencies",
        }),
        ...mapGetters("term_payment", {
            TERM_PAYMENT: "TermPayment",
        }),
        ...mapGetters("term_shipping", {
            TERM_SHIPPING: "TermShipping",
        }),
    },


    components: {
        BaseColumn,
        "purchase-modal": PurchaseOrderModal,
    },
};
</script>