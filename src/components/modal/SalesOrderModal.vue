<template>
  <v-card>
    <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
      <v-toolbar-title> Sales Order List </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="closeSalesOrderDialog" color="error" outlined small>
        <v-icon>mdi-close</v-icon></v-btn>
    </v-app-bar>
    <v-row class="mx-1 mb-1 mt-2">
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
        <v-text-field type="text" label="Search" outlined dense v-model="search.keyword">
        </v-text-field>
      </v-col>
      <v-btn small color="darkblue" class="white--text float-end mx-1 mt-3" @click.stop="init">Submit <v-icon
          right>mdi-magnify</v-icon></v-btn>
      <v-btn small color="secondary" class="white--text float-end mx-1 mt-3" @click.stop="clear">Clear
        <v-icon right>mdi-close-circle-multiple </v-icon>
      </v-btn>
    </v-row>
    <v-data-table :loading="loading" :headers="headers" :items="SalesOrders.data" class="elevation-1" hide-default-footer>
      <template v-slot:[`item.so_status`]="{ item }">
        <v-chip color="secondary" small v-if="item.so_status == 'PENDING'">
          PENDING
        </v-chip>
        <v-chip color="success" small v-else-if="item.so_status == 'FINISH'">
          FINISH
        </v-chip>
        <v-chip color="primary" small v-else-if="item.so_status == 'PROCESS'">
          ON PROCESS
        </v-chip>

        <v-chip color="error" small v-else-if="item.so_status == 'CANCEL'">
          CANCEL
        </v-chip>
        <v-chip color="warning" small v-else-if="item.so_status == 'HOLD'">
          HOLD
        </v-chip>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="primary" outlined small @click.stop="selectSalesOrder(item)">Select <v-icon right> mdi-check
          </v-icon></v-btn>
      </template>
    </v-data-table>
    <v-pagination v-model="currentPage" :length="lastPage" :total-visible="10" :disabled="disabled"></v-pagination>
  </v-card>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "SalesOrderModal",
  data() {
    return {
      headers: [
        { text: "Sales Order No.", value: "so_number" },
        { text: "Customer", value: "customer.name" },
        { text: "Retailer", value: "retailer.name" },
        { text: "Order Date", value: "so_order_date" },
        { text: "Request Delivery Date", value: "so_request_date" },
        { text: "Currency", value: "currency.name" },
        { text: "Exchange Rate", value: "so_rate" },
        { text: "Status", value: "so_status" },
        { text: "Item Qty", value: "sales_order_details_count" },
        { text: "Total Amount", value: "so_total" },
        { text: "Created By", value: "so_created_by" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      disabled: false,
      loading: false,
      status: ["PENDING", "PROCESS", "FINISH", "HOLD", "CANCEL"],
      search: {
        from_date: new Date().toJSON().slice(0, 10),
        end_date: new Date().toJSON().slice(0, 10),
        keyword: null,
      },
      page: 1,
    };
  },

  created() {
    this.init();
  },

  methods: {
    ...mapMutations("sales_order", ["CLEAR_STATE", "SET_SALES_ORDERS", "SET_SALES_ORDER"]),

    async init() {
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
        .get("/sales-order", {
          params: params,
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.SET_SALES_ORDERS(data.sales_order);
          this.loading = false;
          this.disabled = false;
        });
    },

    searching() {
      this.page = 1;
      this.init();
    },
    clear() {
      this.page = 1;
      this.search = {
        status: "",
        search: "",
        from_date: new Date().toJSON().slice(0, 10),
        end_date: new Date().toJSON().slice(0, 10),
      };
      this.init();
    },
    closeSalesOrderDialog() {
      this.$emit("closeSalesOrderDialog");
    },

    selectSalesOrder(sales_order) {
      this.$emit("selectSalesOrder", sales_order);
      this.closeSalesOrderDialog();
    }
  },

  watch: {
    currentPage(newValue) {
      this.page = newValue;
      this.init();
    },
  },

  computed: {
    ...mapGetters("sales_order", ["SalesOrders"]),
    currentPage: {
      get() {
        return this.SalesOrders.current_page;
      },
      set(val) {
        return this.$store.commit("sales_order/SET_CURRENT_PAGE", val);
      },
    },
    lastPage: {
      get() {
        return this.SalesOrders.last_page;
      },
    },
  },
  destroyed() {
    this.CLEAR_STATE();
  },
};
</script>
