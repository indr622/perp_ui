<template>
    <div>
        <v-row dense class="mx-1 mb-4">
            <base-column :lg="3" :md="6" :sm="12">
                <v-text-field readonly placeholder="Work Progress" outlined dense :append-icon="'mdi-magnify'"
                    hide-details></v-text-field>
            </base-column>
            <base-column :lg="3" :md="6" :sm="12">
                <v-text-field readonly placeholder="Packing No." outlined dense :append-icon="'mdi-magnify'"
                    hide-details></v-text-field>
            </base-column>
            <base-column :lg="3" :md="6" :sm="12">
                <v-text-field readonly placeholder="Work Order No" outlined dense :rules="rule_work_order"
                    :append-icon="'mdi-magnify'" hide-details></v-text-field>
            </base-column>
        </v-row>
        <v-divider></v-divider>
        <v-row dense>
            <base-column :lg="3" :md="6" :sm="12">
                <v-card-title>
                    Work In Progress Information
                </v-card-title>
            </base-column>
        </v-row>
        <v-row dense class="mx-2 mt-6">
            <v-row>
                <base-column :lg="3" :md="12" :sm="12">
                    <v-text-field label="Due Date" outlined type="date" dense :rules="rule_due_date"></v-text-field>
                </base-column>
                <base-column :lg="3" :md="12" :sm="12">
                    <v-text-field label="Estimate Finish" outlined type="date" dense
                        :rules="rule_estimation_finish"></v-text-field>
                </base-column>
                <base-column :lg="3" :md="12" :sm="12">
                    <v-select label="Work Place" :items="TERM_SHIPPING" item-text="name" item-value="id" outlined
                        dense></v-select>
                </base-column>
                <base-column :lg="3" :md="12" :sm="12">
                    <v-select :items="type_name" label="Short By (Type Name)" outlined dense></v-select>
                </base-column>
            </v-row>
        </v-row>
    </div>
</template>
  
<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import BaseColumn from "@/components/base/BaseColumn.vue";
export default {
    name: "FormWorkProgress",

    data() {
        return {
            dialogPurchase: false,
            type_name: ["Type Name", "Applied To", "Status"],


        };
    },

    created() {
        this.getTermShipping();
    },
    methods: {
        ...mapMutations("purchase_order", ["CLEAR_FORM", "SET_PO_FROM_SO"]),

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
        changePurchaseType(val) {
            if (val === "material") {
                this.$store.commit("purchase_order/CLEAR_PRODUCT_LIST");
            } else {
                this.$store.commit("purchase_order/CLEAR_ITEM_LIST");
            }
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
    },
};
</script>