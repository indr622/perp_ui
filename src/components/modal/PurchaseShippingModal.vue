<template>
      <v-card>
            <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
                  <v-toolbar-title> Shipping Intruction List </v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn @click="closePurchaseShipping" color="error" outlined small>
                        <v-icon>mdi-close</v-icon></v-btn>
            </v-app-bar>
            <v-row class="mx-1 mb-1">
                  <v-col xs="12" sm="6" md="2" lg="2">
                        <v-text-field type="date" label="From date" outlined dense v-model="search.from_date">
                        </v-text-field>
                  </v-col>
                  <v-col xs="12" sm="6" md="2" lg="2">
                        <v-text-field type="date" label="End date" outlined dense v-model="search.end_date">
                        </v-text-field>
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
            <v-data-table :loading="loading" :headers="headers" :items="PURCHASE_SHIPPINGS.data" class="elevation-1"
                  hide-default-footer>
                  <template v-slot:[`item.shp_total`]="{ item }">
                        <strong>{{
                              item.shp_total | currency("", 2, { symbolOnLeft: false })
                        }}</strong>
                  </template>
                  <template v-slot:[`item.actions`]="{ item }">
                        <v-btn color="primary" outlined small @click.stop="selectPurchaseShipping(item)">Select <v-icon
                                    right>
                                    mdi-check
                              </v-icon></v-btn>
                  </template>
            </v-data-table>
            <v-pagination v-model="currentPage" :length="lastPage" :total-visible="10"
                  :disabled="disabled"></v-pagination>
      </v-card>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
      name: "PurchaseShippingModal",
      data() {
            return {
                  headers: [
                        { text: "Delivery No", value: "shp_number" },
                        { text: "Purchase Order No", value: "purchase_order.po_number" },
                        { text: "Request Delivery Date", value: "shp_request_date" },
                        { text: "Item Qty", value: "item_count" },
                        { text: "Total Amount", value: "shp_total" },
                        { text: "Created By", value: "created_by" },
                        { text: "Actions", value: "actions", sortable: false },
                  ],
                  page: 1,
                  disabled: false,
                  loading: false,
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
            ...mapMutations("purchase_shipping", ["SET_PURCHASE_SHIPPINGS"]),

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
                        .get("/purchase-shipping", {
                              params: params,
                              headers: {
                                    Authorization: this.$store.getters["auth/Token"],
                              },
                        })
                        .then(({ data }) => {
                              this.SET_PURCHASE_SHIPPINGS(data.purchase_shipping);
                              this.loading = false;
                              this.disabled = false;
                        });
            },
            closePurchaseShipping() {
                  this.$emit("closePurchaseShipping");
            },

            selectPurchaseShipping(purchase_shipping) {
                  this.$emit("selectPurchaseShipping", purchase_shipping);
                  this.closePurchaseShipping();
            },
            searching() {
                  this.page = 1;
                  this.init();
            },
            clear() {
                  this.page = 1;
                  this.search = {
                        search: "",
                        from_date: new Date().toJSON().slice(0, 10),
                        end_date: new Date().toJSON().slice(0, 10),
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
            ...mapGetters("purchase_shipping", {
                  PURCHASE_SHIPPINGS: "PurchaseShippings",
            }),
            ...mapMutations("purchase_shipping", ["SET_CURRENT_PAGE"]),

            currentPage: {
                  get() {
                        return this.PURCHASE_SHIPPINGS.current_page;
                  },
                  set(val) {
                        return this.SET_CURRENT_PAGE(val);
                  },
            },
            lastPage: {
                  get() {
                        return this.PURCHASE_SHIPPINGS.last_page;
                  },
            },
      },

};
</script>