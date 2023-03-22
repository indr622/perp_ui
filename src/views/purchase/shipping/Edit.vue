<template>
      <main-layout>
            <base-header>
                  <template #icon>mdi-dolly</template>
                  <template #name> Edit Shipping Intruction</template>
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
                        <v-toolbar-title> Reference No</v-toolbar-title>

                        <v-chip color="primary" class="ml-4" small outlined>Purchase Type : {{
                              PurchaseShipping.type ? PurchaseShipping.type : "-"
                        }}</v-chip>
                        <v-spacer></v-spacer>
                        <v-btn small color="secondary" class="ma-1" @click="backForm()">
                              <v-icon left>mdi-arrow-left</v-icon> Back
                        </v-btn>

                        <v-btn small class="ma-1" color="primary" @click.stop="update" :loading="btnLoading"
                              :disabled="!form_valid || btnLoading">
                              Update
                              <v-icon right>mdi-content-save-all</v-icon>
                        </v-btn>
                  </v-app-bar>
                  <v-form ref="PurchaseShipping" v-model="form_valid" lazy-validation>
                        <form-shipping />

                        <form-item />
                  </v-form>
            </v-card>
      </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
import FormShipping from "@/views/purchase/shipping/Form.vue";
import FormItem from "@/views/purchase/shipping/FormItem.vue";
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
      created() {
            this.breadcrumbs = [
                  { text: "Purchase", disabled: true },
                  { text: "Shipping Intruction", disabled: true },
                  { text: "Create", disabled: false },
            ];
      },
      methods: {
            ...mapMutations("purchase_shipping", ["CLEAR_STATE"]),
            update: async function () {
                  if (this.$refs.PurchaseShipping.validate()) {
                        this.btnLoading = true;
                        await this.$axios
                              .put("/purchase-shipping/" + this.PurchaseShipping.id, this.PurchaseShipping, {
                                    headers: {
                                          Authorization: this.$store.getters["auth/Token"],
                                    },
                              })
                              .then(() => {
                                    this.btnLoading = false;
                                    this.CLEAR_STATE();
                                    this.$router.push({ name: "purchase-shipping.index" });
                              })
                              .catch(() => {
                                    this.btnLoading = false;
                              });
                  }
            },
            backForm() {
                  this.CLEAR_STATE();
                  this.$router.push({ name: "purchase-shipping.index" });
            },
      },
      computed: {
            ...mapGetters("purchase_shipping", ["PurchaseShipping"]),
      },
      components: {
            MainLayout,
            BaseHeader,
            "form-shipping": FormShipping,
            "form-item": FormItem,
      },
};
</script>