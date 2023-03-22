<template>
      <v-card>
            <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
                  <v-toolbar-title> Purchase Order List </v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn @click="closePurchaseDialog" color="error" outlined small>
                        <v-icon>mdi-close</v-icon></v-btn>
            </v-app-bar>
            <v-row class="mx-1 mt-2 mb-1">
                  <base-column :lg="2" :md="2" :sm="6" :xs="12">
                        <v-text-field type="date" label="From date" outlined dense v-model="search.from_date">
                        </v-text-field>
                  </base-column>
                  <base-column :lg="2" :md="2" :sm="6" :xs="12">
                        <v-text-field type="date" label="End date" outlined dense v-model="search.end_date">
                        </v-text-field>
                  </base-column>

                  <base-column :lg="2" :md="2" :sm="6" :xs="12">
                        <v-select :items="status" outlined dense attach chips label="Status"
                              v-model="search.status"></v-select>
                  </base-column>

                  <base-column :lg="2" :md="2" :sm="6" :xs="12">
                        <v-text-field type="text" label="Search" outlined dense v-model="search.search">
                        </v-text-field>
                  </base-column>
                  <v-btn small color="darkblue" class="white--text float-end mx-1 mt-3" @click.stop="getPurchaseOrder">SUBMIT
                        <v-icon right>mdi-magnify</v-icon></v-btn>
                  <v-btn small color="secondary" class="white--text float-end mx-1 mt-3" @click.stop="clear">Clear
                        <v-icon right>mdi-close-circle-multiple </v-icon>
                  </v-btn>
            </v-row>
            <v-data-table :loading="loading" :headers="headers" :items="PURCHASE_ORDERS.data" class="elevation-1"
                  hide-default-footer>
                  <template v-slot:[`item.po_status`]="{ item }">
                        <v-chip color="success" small v-if="item.po_status == 'FINISH'">
                              FINISH
                        </v-chip>
                        <v-chip color="primary" small v-else-if="item.po_status == 'PROCESS'">
                              PROCESS
                        </v-chip>

                        <v-chip color="error" small v-else-if="item.po_status == 'CANCEL'">
                              CANCEL
                        </v-chip>
                  </template>

                  <template v-slot:[`item.po_total`]="{ item }">
                        <strong>{{
                              item.po_total
                              | currency("", 2, {
                                    symbolOnLeft: false,
                                    spaceBetweenAmountAndSymbol: true,
                              })
                        }}</strong>
                  </template>

                  <template v-slot:[`item.actions`]="{ item }">
                        <v-btn color="primary" outlined small @click.stop="selectPurchase(item)">Select <v-icon right>
                                    mdi-check
                              </v-icon></v-btn>
                  </template>
            </v-data-table>
            <v-pagination v-model="currentPage" :length="lastPage" :total-visible="10" :disabled="disabled"></v-pagination>
      </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import BaseColumn from "@/components/base/BaseColumn.vue";
export default {
      name: "PurchaseModal",

      created() {
            this.getPurchaseOrder();
      },

      data() {
            return {
                  headers: [
                        { text: "Purchase Order No", value: "po_number" },
                        { text: "Supplier", value: "supplier.name" },
                        { text: "Order Date", value: "po_order_date" },
                        { text: "Request Delivery Date", value: "po_request_date" },
                        { text: "Status", value: "po_status" },
                        { text: "Item Qty", value: "item_count" },
                        { text: "Total Amount", value: "po_total" },
                        { text: "Created By", value: "created_by" },
                        { text: "Actions", value: "actions", sortable: false },
                  ],
                  page: 1,
                  disabled: false,
                  loading: false,
                  status: ["PROCESS", "FINISH", "CANCEL"],
                  search: {
                        from_date: new Date().toJSON().slice(0, 10),
                        end_date: new Date().toJSON().slice(0, 10),
                        keyword: null,
                  },
            };
      },

      methods: {
            async getPurchaseOrder() {
                  this.loading = true;
                  this.disabled = true;
                  let params = {
                        page: this.page,
                        status: this.search.status,
                        keyword: this.search.keyword,
                        from_date: this.search.from_date,
                        end_date: this.search.end_date,
                  };

                  await this.$axios
                        .get("/purchase-order/balance", {
                              params: params,
                              headers: {
                                    Authorization: this.$store.getters["auth/Token"],
                              },
                        })
                        .then(({ data }) => {
                              this.$store.commit(
                                    "purchase_order/SET_PURCHASE_ORDERS",
                                    data.purchase_orders
                              );
                              this.loading = false;
                              this.disabled = false;
                        });
            },

            closePurchaseDialog() {
                  this.$emit("closePurchaseDialog");
            },

            selectPurchase(item) {
                  this.$emit("selectPurchase", item);
                  this.closePurchaseDialog();
            },
            searching() {
                  this.page = 1;
                  this.getPurchaseOrder();
            },
            clear() {
                  this.page = 1;
                  this.search = {
                        status: "",
                        search: "",
                  };
                  this.getPurchaseOrder();
            },
      },

      watch: {
            currentPage(newValue) {
                  this.page = newValue;
                  this.getPurchaseOrder();
            },
      },
      computed: {
            ...mapGetters("purchase_order", {
                  PURCHASE_ORDERS: "PurchaseOrders",
            }),

            currentPage: {
                  get() {
                        return this.PURCHASE_ORDERS.current_page;
                  },
                  set(val) {
                        return this.$store.commit("purchase_order/SET_CURRENT_PAGE", val);
                  },
            },
            lastPage: {
                  get() {
                        return this.PURCHASE_ORDERS.last_page;
                  },
            },
      },

      components: {
            BaseColumn,
      },
};
</script>