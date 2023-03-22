<template>
      <main-layout>
            <base-header>
                  <template #icon>mdi-receipt-text</template>
                  <template #name> Create Sales Invoice</template>
                  <template #breadcrumbs>
                        <v-breadcrumbs :items="breadcrumbs" class="pa-0">
                              <template #divider>
                                    <v-icon>mdi-chevron-right</v-icon>
                              </template>
                        </v-breadcrumbs>
                  </template>
            </base-header>

            <v-card class="mx-1">
                  <!-- App Bar -->
                  <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
                        <v-toolbar-title> Reference No</v-toolbar-title>

                        <v-spacer></v-spacer>
                        <v-btn small color="secondary" class="ma-2" @click="backForm()">
                              <v-icon>mdi-arrow-left</v-icon> Back
                        </v-btn>
                        <v-btn small color="secondary" class="ma-2" @click="clearForm()">
                              Clear
                              <v-icon>mdi-close-circle-multiple </v-icon>
                        </v-btn>
                        <v-btn small class="ma-2" color="primary" @click.stop="store" :loading="btnLoading"
                              :disabled="!form_valid || btnLoading">
                              Save
                              <v-icon right>mdi-content-save-all</v-icon>
                        </v-btn>
                  </v-app-bar>

                  <v-form ref="SalesInvoice" v-model="form_valid" lazy-validation>
                        <form-sales-invoice />

                        <form-item-invoice />
                  </v-form>
            </v-card>
      </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
import Form from "./Form.vue";
import FormItemInvoice from "./FormItem.vue";
import { mapMutations } from 'vuex';
export default {
      name: "SalesInvoiceCreate",

      data() {
            return {
                  btnLoading: false,
                  form_valid: true,
            };
      },
      created() {
            this.breadcrumbs = [
                  { text: "Invoice", disabled: false },
                  { text: "Sales Invoice", disabled: true },
                  { text: "Create", disabled: true },
            ];
      },
      methods: {
            ...mapMutations("sales_invoice", ["CLEAR_STATE"]),
            store: async function () {
                  if (this.$refs.SalesInvoice.validate()) {
                        this.btnLoading = true;
                        await this.$axios
                              .post("/sales-invoice", this.SalesInvoice, {
                                    headers: {
                                          Authorization: this.$store.getters["auth/Token"],
                                    },
                              })
                              .then(() => {
                                    this.btnLoading = false;
                                    this.$router.push({ name: "sales-invoice.index" });
                              })
                              .catch(() => {
                                    this.btnLoading = false;
                              });
                  }
            },
            backForm() {
                  this.$router.push({ name: "sales-invoice.index" });
            },
            clearForm() {
                  this.CLEAR_STATE();
            },

      },

      computed: {
            SalesInvoice() {
                  return this.$store.getters["sales_invoice/SalesInvoice"];
            },
      },

      destroyed() {
            this.CLEAR_STATE();
      },
      components: {
            MainLayout,
            BaseHeader,
            "form-sales-invoice": Form,
            "form-item-invoice": FormItemInvoice
      },


};
</script>
