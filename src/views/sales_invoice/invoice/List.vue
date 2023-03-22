<template>

      <v-col xs="12" sm="12" md="12" lg="12">
            <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
            <v-card elevation="5" rounded>
                  <v-spacer></v-spacer>
                  <v-row class="mx-1 mb-2">
                        <base-column :xs="12" :sm="6" :md="3" :lg="2">
                              <card-summary :icon="'mdi-receipt-text'" :colorPrimary="'primary'"
                                    :colorSecondary="'#DAE3F3'" status="Total" />
                        </base-column>
                        <base-column :xs="12" :sm="6" :md="3" :lg="2">
                              <card-summary :icon="'mdi-animation'" :colorPrimary="'secondary'"
                                    :colorSecondary="'#21272D3F'" status="Pending" />
                        </base-column>
                        <base-column :xs="12" :sm="6" :md="3" :lg="2">
                              <card-summary :icon="'mdi-check-circle'" :colorPrimary="'success'"
                                    :colorSecondary="'#CFF3D5'" status="Finish" />
                        </base-column>
                        <base-column :xs="12" :sm="6" :md="3" :lg="2">
                              <card-summary :icon="'mdi-clock-time-eight'" :colorPrimary="'warning'"
                                    :colorSecondary="'#DAE3F3'" status="process" />
                        </base-column>
                        <base-column :xs="12" :sm="6" :md="3" :lg="2">
                              <card-summary :icon="'mdi-close-circle'" :colorPrimary="'error'"
                                    :colorSecondary="'#FFD4DC'" status="Cancel" />
                        </base-column>
                  </v-row>

                  <v-row class="mx-1 mb-1">
                        <v-col xs="12" sm="6" md="2" lg="2">
                              <v-text-field type="date" label="From date" outlined dense v-model="search.from_date">
                              </v-text-field>
                        </v-col>
                        <v-col xs="12" sm="6" md="2" lg="2">
                              <v-text-field type="date" label="End date" outlined dense v-model="search.end_date">
                              </v-text-field>
                        </v-col>
                        <v-col xs="12" sm="6" md="2" lg="2">
                              <v-select :items="status" outlined dense attach chips label="Status"
                                    v-model="search.status"></v-select>
                        </v-col>

                        <v-col xs="12" sm="6" md="3" lg="3">
                              <v-text-field type="text" label="Search" outlined dense v-model="search.search">
                              </v-text-field>
                        </v-col>
                        <v-btn small color="darkblue" class="white--text float-end mx-1 mt-3" @click.stop="init">SUbmit
                              <v-icon right>mdi-magnify</v-icon></v-btn>
                        <v-btn small color="secondary" class="white--text float-end mx-1 mt-3" @click.stop="clear">Clear
                              <v-icon right>mdi-close-circle-multiple </v-icon>
                        </v-btn>
                  </v-row>

                  <v-data-table :items="SalesInvoices.data" :loading="loading" :headers="headers" class="elevation-1"
                        hide-default-footer>
                        <template v-slot:[`item.inv_status`]="{ item }">
                              <v-chip color="success" small v-if="item.inv_status == 'PAID'">
                                    PAID
                              </v-chip>
                              <v-chip color="primary" small v-else-if="item.inv_status == 'PARTIAL'">
                                    PARTIAL
                              </v-chip>
                              <v-chip color="warning" small v-else-if="item.inv_status == 'UNPAID'">
                                    UNPAID
                              </v-chip>
                              <v-chip color="error" small v-else-if="item.inv_status == 'CANCEL'">
                                    CANCEL
                              </v-chip>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                              <v-tooltip color="dark" bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                          <v-btn class="mr-2" color="primary" v-bind="attrs" icon small
                                                @click.stop="view(item.id)" v-on="on">
                                                <v-icon>mdi-eye</v-icon>
                                          </v-btn>
                                    </template>
                                    <span>View Sales Invoice</span>
                              </v-tooltip>

                        </template>
                  </v-data-table>
                  <v-pagination v-model="currentPage" :length="lastPage" :total-visible="10"
                        :disabled="disabled"></v-pagination>
            </v-card>
      </v-col>

</template>


<script>
import CardSummary from "@/components/summary/CardSummary.vue";
import BaseColumn from "@/components/base/BaseColumn.vue";
import { mapMutations, mapGetters } from "vuex";
export default {
      name: 'SalesInvoiceList',

      data() {
            return {
                  headers: [
                        { text: "Invoice No.", value: "inv_number" },
                        { text: "Refernce No.", value: "sales_order.so_number" },
                        { text: "Customer", value: "customer.name" },
                        { text: "Retailer", value: "sales_order.retailer.name" },
                        { text: "Order Date", value: "sales_order.so_order_date" },
                        { text: "Invoice Date", value: "inv_date" },
                        { text: "Currency", value: "sales_order.currency.name" },
                        { text: "Exchange Rate", value: 'sales_order.so_rate' },
                        { text: "Status", value: 'inv_status' },
                        { text: "Total Amount", value: 'inv_total' },
                        { text: "Created By", value: 'created_by' },
                        { text: "Actions", value: "actions", sortable: false },
                  ],
                  disabled: false,
                  loading: false,
                  widget: [],
                  status: ["PAID", "PARCIAL", "UNPAID", "CANCEL"],
                  search: {
                        from_date: new Date().toJSON().slice(0, 10),
                        end_date: new Date().toJSON().slice(0, 10),
                        keyword: null,
                  },
            };
      },

      created() {
            this.init();
      },
      methods: {
            ...mapMutations("sales_invoice", ["SET_SALES_INVOICES", "SET_SALES_INVOICE", "CLEAR_SALES_INVOICES"]),
            async init() {
                  this.loading = true;
                  this.disabled = true;
                  let params = {
                        page: this.page,
                        keyword: this.search.keyword,
                        from_date: this.search.from_date,
                        end_date: this.search.end_date,
                  };

                  await this.$axios
                        .get("/sales-invoice", {
                              params: params,
                              headers: {
                                    Authorization: this.$store.getters["auth/Token"],
                              },
                        })
                        .then(({ data }) => {
                              this.SET_SALES_INVOICES(data.sales_invoice);
                              this.loading = false;
                              this.disabled = false;
                        });
            },
            async edit(id) {
                  this.$router.push("/sales-invoice/edit/" + id);
            },
            view(id) {
                  this.$router.push("/sales-invoice/view/" + id);
            },
            clear() {
                  this.search = {
                        from_date: new Date().toJSON().slice(0, 10),
                        end_date: new Date().toJSON().slice(0, 10),
                        keyword: null,
                  };
                  this.init();
            },
      },

      watch: {
            currentPage(newValue) {
                  this.page = newValue;
                  this.init();
            },
      },

      computed: {
            ...mapGetters("sales_invoice", {
                  SalesInvoices: "SalesInvoices",
            }),
            ...mapMutations("sales_invoice", ["SET_CURRENT_PAGE"]),

            currentPage: {
                  get() {
                        return this.SalesInvoices.current_page;
                  },
                  set(val) {
                        return this.SET_CURRENT_PAGE(val);
                  },
            },
            lastPage: {
                  get() {
                        return this.SalesInvoices.last_page;
                  },
            },
      },

      components: {
            CardSummary,
            BaseColumn
      },
}
</script>