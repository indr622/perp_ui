<template>
    <main-layout>
        <base-header>
            <template #icon> mdi-file</template>
            <template #name> Work In Progress</template>
            <template #breadcrumbs>
                <v-breadcrumbs :items="breadcrumbs" class="pa-0">
                    <template #divider>
                        <v-icon>mdi-chevron-right</v-icon>
                    </template>
                </v-breadcrumbs>
            </template>
        </base-header>

        <v-card class="mx-1" v-if="CAN('Quotation-Create')">
            <!-- App Bar -->
            <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
                <v-toolbar-title> Reference No</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn small color="secondary" class="ma-2" to="/inventory-in">
                    <v-icon>mdi-arrow-left</v-icon> Back
                </v-btn>
                <v-btn small color="secondary" class="ma-2" @click.stop="clear()">
                    Clear
                    <v-icon>mdi-close-circle-multiple </v-icon>
                </v-btn>
                <v-btn small class="ma-2" color="primary" @click.stop="store" :loading="btnLoading"
                    :disabled="!form_valid || btnLoading">
                    Save
                    <v-icon right>mdi-content-save-all</v-icon>
                </v-btn>
            </v-app-bar>

            <v-form ref="Quotation" v-model="form_valid" lazy-validation>
                <form-inventory-in />
            </v-form>
        </v-card>
        <v-row dense class="mx-2 mt-6 mb-6">
            <base-column :lg="12" :md="9" :sm="12">
                <v-row>
                    <v-card-title>
                        <h5>Product To Process</h5>
                    </v-card-title>
                </v-row>
                <v-row>
                    <base-column :lg="3" :md="12" :sm="12">
                        <v-card>
                            <v-card-title>
                                <v-row>
                                    <v-col cols="6">
                                        <p>-</p>
                                    </v-col>
                                    <v-col cols="6">
                                        <p>-</p>
                                    </v-col>
                                </v-row>
                            </v-card-title>
                            <v-card-title>
                                <v-row>
                                    <v-col cols="6">
                                        <p>-</p>
                                    </v-col>
                                    <v-col cols="6">
                                        <p>-</p>
                                    </v-col>
                                </v-row>
                            </v-card-title>
                            <v-card-title>
                                <v-row>
                                    <v-col cols="12" class="text-center">
                                        <p><v-btn color="primary" @click="openSupplierDialog">Detail</v-btn></p>
                                    </v-col>
                                </v-row>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-title>
                                <v-btn color="primary" class="mx-auto"
                                    v-on:click="isHidden = !isHidden"><v-icon>mdi-plus</v-icon>Add
                                    Process</v-btn>
                            </v-card-title>
                            <v-card-text v-if="isHidden">
                                <v-select outlined dense label="Choose Product" :items="TERM_SHIPPING" item-text="name"
                                    item-value="id"></v-select>
                                <div>
                                    <v-btn color="primary" class="me-2">Save</v-btn>
                                    <v-btn color="danger" class="white--text">Cancel</v-btn>
                                </div>
                            </v-card-text>
                        </v-card>
                    </base-column>
                </v-row>
            </base-column>
        </v-row>
        <v-dialog v-if="dialogSupplier" v-model="dialogSupplier" max-width="1200px" persistent>
            <supplier-modal v-on:closeSupplierDialog="closeSupplierDialog" v-on:selectSupplier="selectSupplier" />
        </v-dialog>
    </main-layout>
</template>
  
<script>
import Form from "./Form.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
import BaseColumn from "@/components/base/BaseColumn.vue";
import SupplierModal from "@/components/modal/SupplierModal.vue";

import { mapGetters } from "vuex";
export default {
    name: "WorkInProgressCreate",

    data() {
        return {
            btnLoading: false,
            form_valid: true,
            shipping: [],
            isHidden: false,
            dialogSupplier: false,

        };
    },
    created() {
        this.breadcrumbs = [
            { text: "Production", disabled: true },
            { text: "Work In Progress", disabled: true },
            { text: "Create New", disabled: false },
        ];

        this.getTermShipping();
        this.getProduct();
    },

    methods: {
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

        async getProduct() {
            await this.$axios("/product?active=1", {
                headers: {
                    Authorization: this.$store.getters["auth/Token"],
                },
            }).then(({ data }) => {
                this.$store.commit("product/SET_PRODUCT", data.product);
            });
        },

        store: async function () {
            if (this.$refs.Quotation.validate()) {
                this.btnLoading = true;
                await this.$axios
                    .post("/quotation", this.Quotation,
                        {
                            headers: { Authorization: this.$store.getters["auth/Token"] },
                        })
                    .then(() => {
                        this.btnLoading = false;
                        this.$router.push({ name: "quotation.index" });
                    })
                    .catch(() => {
                        this.btnLoading = false;
                    });
            }
        },

        selectSupplier(val) {
            this.$store.commit("purchase_order/SET_SUPPLIER", val);
        },

        openSupplierDialog() {
            this.dialogSupplier = true;
        },

        closeSupplierDialog() {
            this.dialogSupplier = false;
        },


    },
    computed: {
        ...mapGetters("auth", {
            CAN: "Can",
        }),
        Quotation() {
            return this.$store.getters["quotation/Quotation"];
        },
        ...mapGetters("term_shipping", {
            TERM_SHIPPING: "TermShipping",
        }),
        ...mapGetters("product", {
            PRODUCT: "Product",
        }),
    },

    destroyed() {
        this.$store.commit("quotation/CLEAR_STATE");
        this.$store.commit("retailer/CLEAR_STATE");
    },

    components: {
        MainLayout,
        BaseHeader,
        BaseColumn,
        "form-inventory-in": Form,
        SupplierModal,
    },
};
</script>
  