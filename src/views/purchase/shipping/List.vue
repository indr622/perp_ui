<template>
  <v-col xs="12" sm="12" md="12" lg="12">
    <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
    <v-card elevation="5" rounded>
      <v-spacer></v-spacer>
      <v-row class="mx-1 mb-2">
        <base-column :xs="12" :sm="6" :md="3" :lg="2">
          <v-banner class="mt-2 summary" outlined rounded single-line>
            <v-row no-gutters>
              <v-col cols="3" xs="3" sm="3" md="3" class="my-auto mx-auto">
                <v-avatar color="#DAE3F3" size="40">
                  <v-icon color="primary">mdi-receipt-text</v-icon>
                </v-avatar>
              </v-col>
              <v-col cols="9" xs="9" sm="9" md="9">
                <h5 class="primary--text ml-2">TOTAL</h5>
                <h5 class="ml-2">{{ this.widget.total_purchase_shipping }} Shipping Intruction</h5>
                <h5 class='primary--text  ml-2'>{{
                  this.widget.total_purchase_shipping_amount | currency("", 2, {
                    symbolOnLeft: false
                  })
                }}</h5>
              </v-col>
            </v-row>
          </v-banner>
        </base-column>

        <base-column :xs="12" :sm="6" :md="3" :lg="2">
          <v-banner class="mt-2 summary" outlined rounded single-line>
            <v-row no-gutters>
              <v-col cols="3" xs="3" sm="3" md="3" class="my-auto mx-auto">
                <v-avatar color="#03C988" size="40">
                  <v-icon color="success">mdi-progress-clock</v-icon>
                </v-avatar>
              </v-col>
              <v-col cols="9" xs="9" sm="9" md="9">
                <h5 class="success--text ml-2">PROCCESS</h5>
                <h5 class="ml-2">{{ this.widget.total_purchase_shipping_process }} Shipping Intruction</h5>
                <h5 class='success--text  ml-2'>{{
                  this.widget.total_purchase_shipping_process_amount | currency("", 2, {
                    symbolOnLeft: false
                  })
                }}</h5>
              </v-col>
            </v-row>
          </v-banner>
        </base-column>
        <base-column :xs="12" :sm="6" :md="3" :lg="2">
          <v-banner class="mt-2 summary" outlined rounded single-line>
            <v-row no-gutters>
              <v-col cols="3" xs="3" sm="3" md="3" class="my-auto mx-auto">
                <v-avatar color="#93BFCF" size="40">
                  <v-icon color="primary">mdi-truck-delivery</v-icon>
                </v-avatar>
              </v-col>
              <v-col cols="9" xs="9" sm="9" md="9">
                <h5 class="primary--text ml-2">DELIVERY</h5>
                <h5 class="ml-2">{{ this.widget.total_purchase_shipping_delivery }} Shipping Intruction</h5>
                <h5 class='primary--text  ml-2'>{{
                  this.widget.total_purchase_shipping_delivery_amount | currency("", 2, {
                    symbolOnLeft: false
                  })
                }}</h5>
              </v-col>
            </v-row>
          </v-banner>
        </base-column>
        <base-column :xs="12" :sm="6" :md="3" :lg="2">
          <v-banner class="mt-2 summary" outlined rounded single-line>
            <v-row no-gutters>
              <v-col cols="3" xs="3" sm="3" md="3" class="my-auto mx-auto">
                <v-avatar color="#03C988" size="40">
                  <v-icon color="success">mdi-check-all</v-icon>
                </v-avatar>
              </v-col>
              <v-col cols="9" xs="9" sm="9" md="9">
                <h5 class="success--text ml-2">FINISH</h5>
                <h5 class="ml-2">{{ this.widget.total_purchase_shipping_finish }} Shipping Intruction</h5>
                <h5 class='success--text  ml-2'>{{
                  this.widget.total_purchase_shipping_finish_amount | currency("", 2, {
                    symbolOnLeft: false
                  })
                }}</h5>
              </v-col>
            </v-row>
          </v-banner>
        </base-column>

        <base-column :xs="12" :sm="6" :md="3" :lg="2">
          <v-banner class="mt-2 summary" outlined rounded single-line>
            <v-row no-gutters>
              <v-col cols="3" xs="3" sm="3" md="3" class="my-auto mx-auto">
                <v-avatar color="#F48484" size="40">
                  <v-icon color="danger">mdi-close-circle-outline</v-icon>
                </v-avatar>
              </v-col>
              <v-col cols="9" xs="9" sm="9" md="9">
                <h5 class="danger--text ml-2">CANCEL</h5>
                <h5 class="ml-2">{{ this.widget.total_purchase_shipping_cancel }} Shipping Intruction</h5>
                <h5 class='danger--text  ml-2'>{{
                  this.widget.total_purchase_shipping_cancel_amount | currency("", 2, {
                    symbolOnLeft: false
                  })
                }}</h5>
              </v-col>
            </v-row>
          </v-banner>
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

        <v-col xs="12" sm="6" md="3" lg="3">
          <v-text-field type="text" label="Search" outlined dense v-model="search.search">
          </v-text-field>
        </v-col>
        <v-btn small color="darkblue" class="white--text float-end mx-1 mt-3" @click.stop="init">SUbmit <v-icon
            right>mdi-magnify</v-icon></v-btn>
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
          <v-tooltip color="dark" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mr-2" color="primary" v-bind="attrs" icon small @click.stop="view(item.id)" v-on="on">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </template>
            <span>View Purchase Shipping</span>
          </v-tooltip>
          <v-tooltip color="dark" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mr-2" color="warning" v-bind="attrs" icon small @click.stop="edit(item.id)" v-on="on">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit Purchase Shipping</span>
          </v-tooltip>
        </template>
      </v-data-table>
      <v-pagination v-model="currentPage" :length="lastPage" :total-visible="10" :disabled="disabled"></v-pagination>
    </v-card>
  </v-col>
</template>

<script>
import BaseColumn from "@/components/base/BaseColumn.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "PurchaseShippingList",
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
      widget: [],
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
    this.getSummary();
  },

  methods: {
    ...mapMutations("purchase_shipping", ["SET_PURCHASE_SHIPPINGS", "SET_PURCHASE_SHIPPING"]),
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

    async getSummary() {
      let params = {
        from_date: this.search.from_date,
        end_date: this.search.end_date,
      };

      await this.$axios
        .get("/purchase-shipping/widget", {
          params: params,
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.widget = data.data;
        });
    },


    view(id) {
      this.$router.push("/purchase-shipping/view/" + id);
    },
    async edit(id) {
      this.loading = true;
      await this.$axios
        .get("/purchase-shipping/" + id, {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.SET_PURCHASE_SHIPPING(data.purchase_shipping);
          this.loading = false;
          this.$router.push("/purchase-shipping/edit");
        })
        .catch(() => {
          this.loading = true;
        });
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

  components: {
    BaseColumn,
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