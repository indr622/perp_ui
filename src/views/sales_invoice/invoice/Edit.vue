<template>
      <main-layout>
            <base-header>
                  <template #icon> mdi-receipt-text</template>
                  <template #name> Edit Sales Invoice</template>
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
                        <v-btn small color="secondary" class="ma-2">
                              <v-icon>mdi-arrow-left</v-icon> Back
                        </v-btn>
                        <v-btn small color="secondary" class="ma-2">
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

                  </v-form>
            </v-card>
      </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
export default {
      name: "SalesOrderCreate",

      data() {
            return {
                  btnLoading: false,
                  form_valid: true,
            };
      },
      created() {
            this.breadcrumbs = [
                  { text: "Order", disabled: false },
                  { text: "Sales Order", disabled: true },
                  { text: "Create", disabled: true },
            ];
      },

      methods: {

      },


      components: {
            MainLayout,
            BaseHeader,

      },
};
</script>
