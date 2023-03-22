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
                <h5 class="ml-2">{{ this.widget.total_purchase_order }} Purchase Order</h5>
                <h5 class='primary--text  ml-2'>{{
                  this.widget.total_purchase_order_amount | currency("", 2, {
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
                <h5 class="ml-2">{{ this.widget.total_purchase_order_process }} Purchase Order</h5>
                <h5 class='success--text  ml-2'>{{
                  this.widget.total_purchase_order_process_amount | currency("", 2, {
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
                  <v-icon color="primary">mdi-progress-clock</v-icon>
                </v-avatar>
              </v-col>
              <v-col cols="9" xs="9" sm="9" md="9">
                <h5 class="primary--text ml-2">DELIVERY</h5>
                <h5 class="ml-2">{{ this.widget.total_purchase_order_delivery }} Purchase Order</h5>
                <h5 class='primary--text  ml-2'>{{
                  this.widget.total_purchase_order_delivery_amount | currency("", 2, {
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
                <h5 class="ml-2">{{ this.widget.total_purchase_order_finish }} Purchase Order</h5>
                <h5 class='success--text  ml-2'>{{
                  this.widget.total_purchase_order_finish_amount | currency("", 2, {
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
                <h5 class="ml-2">{{ this.widget.total_purchase_order_cancel }} Purchase Order</h5>
                <h5 class='danger--text  ml-2'>{{
                  this.widget.total_purchase_order_cancel_amount | currency("", 2, {
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
        <v-col xs="12" sm="6" md="2" lg="2">
          <v-select :items="status" outlined dense attach chips label="Status" v-model="search.status"></v-select>
        </v-col>

        <v-col xs="12" sm="6" md="3" lg="3">
          <v-text-field type="text" label="Search" outlined dense v-model="search.search">
          </v-text-field>
        </v-col>
        <v-btn small color="darkblue" class="white--text float-end mx-1 mt-3" @click.stop="getPurchaseOrder">Submit
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
            ON PROCESS
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
          <v-tooltip color="dark" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mr-2" color="primary" v-bind="attrs" icon small @click.stop="viewPurchase(item.id)"
                v-on="on">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </template>
            <span>View Purchase Order</span>
          </v-tooltip>
          <v-tooltip color="dark" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mr-2" color="warning" v-bind="attrs" icon small @click.stop="editPurchase(item.id)"
                v-on="on">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit Purchase Order</span>
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
  name: "PurchaseOrderList",
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
      widget: [],
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
    ...mapMutations("purchase_order", ["CLEAR_FORM", "SET_PURCHASE_ORDERS", "SET_PURCHASE_ORDER"]),

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
        .get("/purchase-order", {
          params: params,
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.SET_PURCHASE_ORDERS(data.purchase_orders);
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
        .get("/purchase-order/widget", {
          params: params,
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.widget = data.data;
        });
    },

    async editPurchase(id) {
      this.loading = true;
      await this.$axios
        .get("/purchase-order/" + id, {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.SET_PURCHASE_ORDER(data.purchase_orders);
          this.loading = false;
          this.$router.push("/purchase-order/edit");
        })
        .catch(() => {
          this.loading = true;
        });
    },
    viewPurchase(id) {
      this.$router.push("/purchase-order/view/" + id);
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
        from_date: new Date().toJSON().slice(0, 10),
        end_date: new Date().toJSON().slice(0, 10),
      };
      this.getPurchaseOrder();
    },
  },

  created() {
    this.getPurchaseOrder();
    this.getSummary();
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
<style scoped>
::v-deep .v-data-table-header {
  background-color: #ebebeb59;
}

::v-deep th {
  color: #000 !important;
}
</style>