<template>
      <main-layout>
            <base-header>
                  <template #icon>mdi-receipt-text</template>
                  <template #name> View Sales Invoice</template>
                  <template #breadcrumbs>
                        <v-breadcrumbs :items="breadcrumbs" class="pa-0">
                              <template #divider>
                                    <v-icon>mdi-chevron-right</v-icon>
                              </template>
                        </v-breadcrumbs>
                  </template>
                  <template #button>
                        <v-btn color="secondary" class="float-end mb-2" small to="/sales-invoice">Back
                              <v-icon right>mdi-arrow-left</v-icon>
                        </v-btn></template>
            </base-header>
            <v-card elevation="2" rounded class="mx-2 mb-2">
                  <v-row dense class="mx-2">
                        <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
                              <v-chip v-if="SalesInvoice.status == 'PARTIAL'" color="primary" small>PARTIAL</v-chip>
                              <v-chip v-if="SalesInvoice.status == 'PAID'" color="success" small>PAID</v-chip>
                              <v-chip v-if="SalesInvoice.status == 'UNPAID'" color="warning" small>UNPAID</v-chip>
                              <v-chip v-if="SalesInvoice.status == 'CANCEL'" color="error" small>CANCEL</v-chip>
                              <v-spacer></v-spacer>
                        </v-app-bar>
                  </v-row>

                  <v-divider class="my-1"></v-divider>
                  <v-row dense class="mx-5 mt-2">
                        <base-column :lg="2">
                              <h4 class="secondary--text">No SalesInvoice .</h4>
                              <h4>{{ SalesInvoice.inv_number ?? 'N/A' }}</h4>
                        </base-column>

                        <base-column :lg="2">
                              <h4 class="secondary--text">Sales Order No .</h4>
                              <h4> {{ SalesInvoice.so_number ?? "-" }}</h4>
                        </base-column>
                        <base-column :lg="2">
                              <h4 class="secondary--text">Document No.</h4>
                              <h4> {{ SalesInvoice.document_no ?? "-" }}</h4>
                        </base-column>
                        <base-column :lg="2">
                              <h4 class="secondary--text">Exchange Rate .</h4>
                              <h4> {{ SalesInvoice.rate | currency("", 2, { symbolOnLeft: false, }) }} </h4>
                        </base-column>
                  </v-row>

                  <v-row dense class="mx-5 mt-5">
                        <base-column :lg="4">
                              <h4 class="secondary--text">Customer</h4>
                              <h4>{{ SalesInvoice.customer_name ?? "N/A" }}</h4>
                              <h4>{{ SalesInvoice.customer_email ?? "N/A" }}</h4>
                              <h4>{{ SalesInvoice.customer_phone ?? "N/A" }}</h4>
                              <h4>{{ SalesInvoice.customer_address ?? "N/A" }}</h4>

                        </base-column>

                        <base-column :lg="2">
                              <h4 class="secondary--text">Order Date .</h4>
                              <h4> {{ SalesInvoice.invoice_date }}</h4>
                        </base-column>
                        <base-column :lg="2">
                              <h4 class="secondary--text">Request Delivey Date .</h4>
                              <h4> {{ SalesInvoice.elivery_date }}</h4>
                        </base-column>

                        <base-column :lg="2">
                              <h4 class="secondary--text">Created By</h4>
                              <h4> {{ SalesInvoice.created_by }} </h4>
                        </base-column>
                  </v-row>

                  <v-row dense class="mx-5 mt-5">
                        <base-column :lg="4">
                              <h4 class="secondary--text">Delivery To</h4>
                              <h4>{{ SalesInvoice.shipping_name ?? "N/A" }}</h4>
                              <h4>{{ SalesInvoice.shipping_email ?? "N/A" }}</h4>
                              <h4>{{ SalesInvoice.shipping_phone ?? "N/A" }}</h4>
                              <h4>{{ SalesInvoice.shipping_address ?? "N/A" }}</h4>

                        </base-column>
                  </v-row>
            </v-card>

            <iframe :src="`${shareableLink}`" width="100%" height="100%" />
      </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
import BaseColumn from "@/components/base/BaseColumn.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
      name: "SalesInvoiceView",
      data() {
            return {
                  shareableLink:
                        process.env.VUE_APP_API_URL +
                        "/sales-invoice/view/" +
                        this.$route.params.id,
            };
      },

      created() {
            this.init();
            this.breadcrumbs = [
                  { text: "Sales", disabled: true },
                  { text: "Sales Invoice", disabled: true },
                  { text: "View", disabled: true },
            ];
      },

      methods: {
            ...mapMutations("sales_invoice", ["CLEAR_STATE", "SET_SALES_INVOICE"]),
            async init() {
                  this.loading = true;
                  await this.$axios
                        .get("/sales-invoice/" + this.$route.params.id, {
                              headers: {
                                    Authorization: this.$store.getters["auth/Token"],
                              },
                        })
                        .then(({ data }) => {
                              this.SET_SALES_INVOICE(data.sales_invoice);
                              this.loading = false;
                        })
                        .catch((err) => {
                              alert(err);
                        });
            },
      },

      computed: {
            ...mapGetters("sales_invoice", {
                  SalesInvoice: "SalesInvoice",
            }),
      },
      destroyed() {
            this.CLEAR_STATE();
      },
      components: {
            MainLayout,
            BaseHeader,
            BaseColumn
      },
};
</script>