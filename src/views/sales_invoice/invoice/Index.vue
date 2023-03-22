<template>
      <main-layout>
            <base-header>
                  <template #icon> mdi-file</template>
                  <template #name> Sales Invoice </template>
                  <template #breadcrumbs>
                        <v-breadcrumbs :items="breadcrumbs" class="pa-0">
                              <template #divider>
                                    <v-icon>mdi-chevron-right</v-icon>
                              </template>
                        </v-breadcrumbs>
                  </template>
                  <template #button>
                        <v-btn color="primary" class="float-end mb-2" small to="/sales-invoice/create">Create
                              New
                              <v-icon right>mdi-plus</v-icon>
                        </v-btn></template>
            </base-header>

            <v-row dense class="mx-1">
                  <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
                  <sales-invoice-list />
            </v-row>
      </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";

import BaseHeader from "@/components/base/BaseHeader.vue";
import SalesInvoiceList from "@/views/sales_invoice/invoice/List.vue";
export default {
      name: "SalesOrderIndex",
      created() {
            this.breadcrumbs = [
                  { text: "Sales Invoices", disabled: false, to: "/dashboard" },
                  { text: "Invoice", disabled: true },
            ];
      },
      components: {
            MainLayout,
            BaseHeader,
            "sales-invoice-list": SalesInvoiceList
      },


};
</script>
<style scoped>
::v-deep .v-data-table-header {
      background-color: #ebebeb59;
}

::v-deep th {
      color: #000 !important;
}
</style>